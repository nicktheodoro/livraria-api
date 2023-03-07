const bcrypt = require("bcryptjs");

const password = (password, length = 10) =>
  bcrypt.hash(password, length);

const encrypt = {
  password,
};

module.exports = encrypt;
