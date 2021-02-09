const bcrypt = require('bcrypt');
const uuid = require('uuid');

const validatePassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
}

const hashPassword = async (password) => {
  return await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
}

const checkFormatOfUuid = (apiKeyString) => {
  return uuid.validate(apiKeyString)
}

module.exports = {
  validatePassword,
  hashPassword,
  checkFormatOfUuid
}