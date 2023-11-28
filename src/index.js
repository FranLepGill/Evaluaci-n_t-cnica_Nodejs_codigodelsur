const express = require("express");
const app = express();
const morgan = require("morgan");
const { CreatDB } = require("./middlewares/CreatDB");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// middlewares
app.use(morgan("dev"));
CreatDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("36f54jh6f4jk6yhugg4k7lglk476"));
app.use(
  session({
    secret: "36f54jh6f4jk6yhugg4k7lglk476",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/", require("./routers/index"));

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Example app listening on port " + port + "!");
});
