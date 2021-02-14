const bcrypt = require("bcrypt");
const uuid = require("uuid");

/**
 * Validates whether the provided password is correct as per the hased password
 * @param  {String} password
 * @param  {String} passwordHash
 * 
 * @returns {Promise}
 */
const validatePassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

/**
 * Hashes a password and returns a promise that resolves with the hashed value
 * @param  {String} password
 * 
 * @returns {Promise}
 */
const hashPassword = async (password) => {
  return await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
};

/**
 * Returns a randomly created API key.
 * 
 * @returns {String} API key that is created
 */
const createAPIKey = () => {
  return `${createUUID()}`;
};

/**
 * Creates a random UUID and returns it
 * 
 * @returns {String} uuid
 */
const createUUID = () => {
  return uuid.v4();
}

/**
 * Checks whether the format of uuid provided is correct or not
 * @param  {String} uuidString
 * 
 * @returns {Boolean}
 */
const checkFormatOfUuid = (uuidString) => {
  return uuid.validate(uuidString);
};

module.exports = {
  validatePassword,
  hashPassword,
  checkFormatOfUuid,
  createAPIKey,
  // dataURLtoFile,
  createUUID
};
