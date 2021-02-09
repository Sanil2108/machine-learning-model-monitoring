const Joi = require('joi');

const userRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const deleteUserSchema = Joi.object({});

module.exports = {
  userRegisterSchema,
  deleteUserSchema,
}