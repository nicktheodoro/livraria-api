const jwt = require("jsonwebtoken");

const ACCESS_SECRET = "mysupersecret";
const ACCESS_EXPIRES = "1d";

const generateTokens = dataToEncrypt => {
  return {
    token: jwt.sign(dataToEncrypt, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES })
  };
};

const verifyToken = token => jwt.verify(token, ACCESS_SECRET);

const auth = {
  generateTokens,
  verifyToken
};

module.exports = auth;
