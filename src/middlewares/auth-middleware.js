const { Unauthorized } = require("../helpers/errors");
const jwt = require("jsonwebtoken");

const ACCESS_SECRET = "mysupersecret";

const authMiddleware = (req, res, next) => {
  const pathsWithoutLogin = ["usuarios/login"];
  
  if (pathsWithoutLogin.some(path => path.includes(req.path))) {
    return next();
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return Unauthorized("Token not provided", res);
  }

  try {
    jwt.verify(token, ACCESS_SECRET);
    return next();
  } catch (error) {
    if (error.message.includes("jwt malformed")) {
      return Unauthorized("Invalid token", res);
    }
    if (error.message.includes("jwt expired")) {
      return Unauthorized("Token expired", res);
    }
    console.error(error);
    return Error(error.message);
  }
};

module.exports = authMiddleware;
