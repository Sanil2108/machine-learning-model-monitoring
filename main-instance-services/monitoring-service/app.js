require('dotenv').config();

const {
  inputOutputMetadataSchema,
  responseLogDataSchema,
  requestLogDataSchema
} = require('./schema');

(async () => {
  const esDriver = require('./esDriver');
  await esDriver.initialize();

  const rabbitMqDriver = require('./rabbitmqDriver');
  await rabbitMqDriver.initialize({
    'api-request': (data) => {
      if (!requestLogDataSchema.validate(data)) {
        console.log('Something went wrong');
        return;
      }

      await esDriver.addLogData(data);
    },
    'api-response': (data) => {
      if (!responseLogDataSchema.validate(data)) {
        console.log('Something went wrong');
        return;
      }

      await esDriver.addLogData(data);
    },
    'input-output-metadata': (data) => {
      if (!inputOutputMetadataSchema.validate(data)) {
        console.log('Something went wrong');
        return;
      }

      await esDriver.addLogData(data);
    }
  });
})();
