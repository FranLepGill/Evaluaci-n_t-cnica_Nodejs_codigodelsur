const express = require("express");
const app = express();
const morgan = require("morgan");
const { CreatDB } = require("./middlewares/CreatDB");

// middlewares
require("dotenv").config();
app.use(morgan("dev"));
CreatDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", require("./routers/index"));

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Example app listening on port " + port + "!");
});
