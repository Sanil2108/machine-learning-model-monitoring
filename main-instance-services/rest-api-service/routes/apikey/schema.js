const Joi = require('joi');

const createApiKeySchema = Joi.object({});

const invalidateApiKeySchema = Joi.object({
  apiKey: Joi.string().required()
});

module.exports = {
  createApiKeySchema,
  invalidateApiKeySchema,
}
