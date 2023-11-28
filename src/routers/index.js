const express = require("express");
const router = express.Router();
const { CreatDB } = require("../middlewares/CreatDB");
const { generateToken } = require("../utils/token");
const { authenticate } = require("../middlewares/authenticate");
const { registerUser, validateUser } = require("../controller/userManager");

router.post("/register", (req, res) => {
  CreatDB();
  const respuesta = registerUser(req);
  return res.send(respuesta);
});

router.post("/private", (req, res, next) => {
  if (authenticate(req.headers.authorization)) {
    res.send({ res: "Acceso permitido" });
  } else {
    res.send({ res: "Acceso denegado" });
  }
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (validateUser(email, password)) {
    console.log("Usuario logeado");
    const token = generateToken(email);
    res.send({ token });
  } else {
    res.send({ res: "Email o Password Icorrectos" });
  }
});

module.exports = router;
