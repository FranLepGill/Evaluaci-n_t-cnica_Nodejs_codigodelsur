const express = require("express");
const router = express.Router();
const { registerUser } = require("../controller/userManager");
const { CreatDB } = require("../middlewares/CreatDB");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

router.post(
  "/",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.redirect("/login");
  },
  (req, res, next) => {}
);

router.post(
  "/login",
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.post("/register", (req, res) => {
  CreatDB();
  return res.send(registerUser(req));
});

module.exports = router;

//----------------------------------------------

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((id, done) => {
  userClass.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      // const { firstName, lastName } = req.body;
      // const newUser = new userClass({
      //   firstName,
      //   lastName,
      //   email,
      //   password,
      // });
      // newUser.password = newUser.encryptPassword(password);
      // if (newUser.findById()) {
      //   return done(null, false, req.flash("signupMessage", "Email ya registrado"));
      // }
      return done(null, {
        user: {
          email: "email",
          firstName: "firstName",
          lastName: "lastName",
          password: "password",
        },
      });
    }
  )
);
