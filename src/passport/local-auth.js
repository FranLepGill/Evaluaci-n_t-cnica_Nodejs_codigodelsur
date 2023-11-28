const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const userClass = require("../models/user");

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
