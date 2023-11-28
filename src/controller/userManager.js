const e = require("express");
const { userClass } = require("../models/user");

const registerUser = (req) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const user = new userClass(email, password, firstName, lastName);

  if (user.saveUser()) {
    return { res: "El usuario se a registrado con existo" };
  } else {
    return { res: "Este email ya esta registrado" };
  }
};

exports.registerUser = registerUser;
