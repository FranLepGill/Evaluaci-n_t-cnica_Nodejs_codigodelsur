// Middleware para comprobar el formato de los campos de los formularios
const checkEmail = (email) => {
  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return patronCorreo.test(email);
};

// Middleware para comprobar que los campos no estén vacíos
const isNotEmpty = (text) => {
  if (text == "") {
    return false;
  }
  return true;
};

const checkPassword = (password) => {
  if (password.length < 5) {
    return true;
  } else {
    return false;
  }
};

module.exports = { checkEmail, isNotEmpty, checkPassword };
