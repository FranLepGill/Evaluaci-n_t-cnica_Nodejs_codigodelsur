const e = require("express");
const { userClass } = require("../models/user");
const { readData } = require("./BDManager");
const { all } = require("axios");

// Registra el usuario
const registerUser = (req) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const user = new userClass(email, firstName, lastName, password);

  if (user.saveUser()) {
    return { res: "El usuario se a registrado con existo" };
  }

  return { res: "Este email ya esta registrado" };
};

// Busca el usuario por email
const findById = (email) => {
  const existingData = readData(true);
  let aux = existingData.user.find((user) => user.email == email);
  if (aux) {
    return aux;
  }
  return null;
};

// Retorna todos los usuarios
const allUsers = () => {
  const existingData = readData(true);
  const users = [];
  for (let index = 0; index < existingData.user.length; index++) {
    const element = existingData.user[index];
    const userAux = new userClass(
      element.email,
      element.firstName,
      element.lastName,
      element.password
    );
    users.push(userAux);
  }

  return users;
};

// Valida el usuario
const validateUser = (email, password) => {
  let aux = allUsers();
  for (let index = 0; index < aux.length; index++) {
    const element = aux[index];
    if (element.email == email) {
      if (element.validPassword(password)) {
        return true;
      }
    }
  }
  return false;
};

module.exports = { registerUser, findById, validateUser };
