const Joi = require('joi');

const requestLogDataSchema = Joi.object({
  type: Joi.string().required().equal('api-request'),
  data: Joi.object({
    'api-endpoint': Joi.string().required(),
    'ip-address': Joi.string().required(),
    'request-uuid': Joi.string().required(),
    'request': Joi.object().required({
      'timestamp': Joi.number().required(),
      'headers': Joi.object().required(),
      'body': Joi.object().required(),
      'method': Joi.string().required()
    })
  })
});

const responseLogDataSchema = Joi.object({
  type: Joi.string().required().equal('api-response'),
  data: Joi.object({
    'api-endpoint': Joi.string().required(),
    'ip-address': Joi.string().required(),
    'request-uuid': Joi.string().required(),
    'response': Joi.object().required({
      'timestamp': Joi.number().required(),
      'status': Joi.number.required(),
      'data': Joi.object()
    })
  })
});

const inputOutputMetadataSchema = Joi.object({
  type: Joi.string().required().equal('input-output-metadata'),
  data: Joi.object({
    'timestamp': Joi.number().required(),
    'computation-time': Joi.number().required(),
    'api-key': Joi.string().required(),
    'input-metadata': Joi.object({
      'height': Joi.number().required(),
      'width': Joi.number().required(),
      'contrast': Joi.number().required()
    }),
    'output-metadata': Joi.object({
      'confidence': Joi.number().required()
    })
  })
});

module.exports = {
  requestLogDataSchema,
  responseLogDataSchema,
  inputOutputMetadataSchema
}