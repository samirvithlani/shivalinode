const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (password, hash) => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
module.exports = {
  encryptPassword,
    comparePassword,
};
