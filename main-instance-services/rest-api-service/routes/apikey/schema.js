const Joi = require('joi');

const createApiKey = Joi.object({});

const invalidateApiKey = Joi.object({
  apiKey: Joi.string().required()
});

module.exports = {
  createApiKey,
  invalidateApiKey,
}
