const jwt = require("jsonwebtoken");

const generateToken = (text) => {
  const token = jwt.sign(
    {
      data: Math.random(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

const verifyToken = (token) => {
  if (token == undefined) {
    return false;
  }
  return Jwt.verify(token, process.env.JWT_SECRET, { complete: true });
};

module.exports = { generateToken, verifyToken };
