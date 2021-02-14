require('dotenv').config();

const {
  inputOutputMetadataSchema,
  responseLogDataSchema,
  requestLogDataSchema
} = require('./schema');

(async () => {
  await new Promise(r => setTimeout(r, 5000));
  
  const esDriver = require('./esDriver');
  await esDriver.initialize();

  const rabbitMqDriver = require('./rabbitmqDriver');
  await rabbitMqDriver.initialize({
    'api-request': async (data) => {
      if (!requestLogDataSchema.validate(data)) {
        console.log('Something went wrong');
        return;
      }

      await esDriver.addLogData({type: 'api-request', data});
    },
    'api-response': async (data) => {
      if (!responseLogDataSchema.validate(data)) {
        console.log('Something went wrong');
        return;
      }

      await esDriver.addLogData({type: 'api-response', data});
    },
    'prediction-data': async (data) => {
      if (!inputOutputMetadataSchema.validate(data)) {
        console.log('Something went wrong');
        return;
      }

      await esDriver.addLogData({type: 'prediction-data', data});
    }
  });
})();
