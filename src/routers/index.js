const express = require("express");
const router = express.Router();
const { creatDB } = require("../middlewares/creatDB");
const { generateToken, payload, deslogear } = require("../utils/token");
const { authenticate } = require("../middlewares/authenticate");
const {
  checkEmail,
  isNotEmpty,
  checkPassword,
} = require("../middlewares/CheckFormat");
const {
  registerUser,
  validateUser,
  findById,
} = require("../controller/userManager");
const {
  getAllMovies,
  setFavorite,
  getAllFavoriteMovies,
} = require("../controller/moviesManager");
const e = require("express");

// routes
router.post(
  "/register",
  (req, res, next) => {
    if (!checkEmail(req.body.email)) {
      res.send({ res: "Email invalido" });
    } else if (!isNotEmpty(req.body.password)) {
      res.send({ res: "Password vacia" });
    } else if (!isNotEmpty(req.body.firstName)) {
      res.send({ res: "firstName vacia" });
    } else if (!isNotEmpty(req.body.lastName)) {
      res.send({ res: "lastName vacia" });
    } else if (checkPassword(req.body.password)) {
      res.send({ res: "Password debe tener al menos 5 caracteres" });
    } else next();
  },
  (req, res) => {
    creatDB();
    const respuesta = registerUser(
      req.body.email,
      req.body.password,
      req.body.firstName,
      req.body.lastName
    );
    return res.send(respuesta);
  }
);

router.post("/private", (req, res, next) => {
  if (authenticate(req.headers.authorization)) {
    res.send({ res: "Acceso permitido" });
  } else {
    res.send({ res: "Acceso denegado" });
  }
});

router.post(
  "/login",
  (req, res, next) => {
    if (!checkEmail(req.body.email)) {
      res.send({ res: "Email invalido" });
    } else if (!isNotEmpty(req.body.password)) {
      res.send({ res: "Password vacia" });
    } else next();
  },
  (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (validateUser(email, password)) {
      // console.log("Usuario logeado");
      const token = generateToken(email);
      res.send({ token });
    } else {
      if (findById(email) == null)
        res.send({ res: "Este email no se encuentra registrado" });
      else res.send({ res: "Password icorrecto" });
    }
  }
);

router.post(
  "/logout",
  (req, res, next) => {
    if (!authenticate(req.headers.authorization)) {
      res.send({ res: "Nesesita estar logeado" });
    } else next();
  },
  (req, res) => {
    const token = req.headers.authorization;
    deslogear(token);
    res.send({ res: "Usuario deslogeado" });
  }
);

router.get(
  "/movies",
  (req, res, next) => {
    if (authenticate(req.headers.authorization)) next();
    else res.send({ res: "Nesesita estar logeado" });
  },
  async (req, res, next) => {
    let keyword = req.query.keyword;
    if (req.query.keyword == "") {
      keyword = undefined;
    }
    // console.log("RequestMovies");
    const response = await getAllMovies(keyword);
    res.send(response);
  }
);

router.post(
  "/setFavorite",
  (req, res, next) => {
    if (!authenticate(req.headers.authorization)) {
      res.send({ res: "Nesesita estar logeado" });
    } else if (!isNotEmpty(req.body.id)) {
      res.send({ res: "No se envio una pelicula" });
    } else next();
  },
  async (req, res, next) => {
    creatDB();
    const email = payload(req.headers.authorization);
    if (setFavorite(req.body, email)) {
      res.send({ res: "Agregada a favoritos" });
    } else {
      res.send({ res: "Ya esta en favoritos" });
    }
  }
);

router.get(
  "/getFavorite",
  (req, res, next) => {
    if (!authenticate(req.headers.authorization)) {
      res.send({ res: "Nesesita estar logeado" });
    } else next();
  },
  async (req, res, next) => {
    creatDB();
    const email = payload(req.headers.authorization);
    const response = await getAllFavoriteMovies(email);
    return res.send(response);
  }
);

module.exports = router;
