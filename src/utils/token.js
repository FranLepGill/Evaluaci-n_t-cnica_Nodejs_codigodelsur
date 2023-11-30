const jwt = require("jsonwebtoken");
const { decodeToken } = require("react-jwt");

//Genera un token en base a un texto secreto, tmb establece parametros que se pondran en el token
const generateToken = (text) => {
  const token = jwt.sign(
    {
      data: Math.random(),
      email: text,
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

module.exports = { generateToken, verifyToken, payload };
