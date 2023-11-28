const { verifyToken } = require("../utils/token");

const authenticate = (token) => {
  if ((token = undefined)) return false;
  if (verifyToken(token)) return true;
  else return false;
};

module.exports = { authenticate };
