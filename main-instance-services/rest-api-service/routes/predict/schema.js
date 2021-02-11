const Joi = require('joi');

const predictSchema = Joi.object({
  image: Joi.string().required()
})

module.exports = {
  predictSchema
}