const jwt = require("jsonwebtoken");
const {
  readData,
  writeDataToken,
  readDataToken,
} = require("../controller/dataBaseManager.js");
//Genera un token en base a un texto secreto, tmb establece parametros que se pondran en el token
const generateToken = (email) => {
  const token = jwt.sign(
    {
      data: Math.random(),
      email: email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

//Verifica si el token es valido
const verifyToken = (token) => {
  if (token == undefined) {
    return false;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET, { complete: true });
  } catch (err) {
    return false;
  }
};

//Obtiene el payload del token
const payload = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  return payload.email;
};

//Deslogea al usuario
const deslogear = (token) => {
  writeDataToken(token);
};

//Verifica si el token esta en la lista negra
const estaEnListaNegra = (token) => {
  const data = readDataToken();
  const tokenList = data || [];
  const estaEnListaNegra = tokenList.some((t) => t.token == token);
  if (estaEnListaNegra) {
    return true;
  } else {
    console.log("No esta en lista negra");
    return false;
  }
};

module.exports = {
  generateToken,
  verifyToken,
  payload,
  estaEnListaNegra,
  deslogear,
};
