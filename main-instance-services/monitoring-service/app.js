require('dotenv').config();

const {
  apiLogDataSchema,
  inputOutputMetadataSchema
} = require('./schema');

(async () => {
  const esDriver = require('./esDriver');
  await esDriver.initialize();

  const rabbitMqDriver = require('./rabbitmqDriver');
  await rabbitMqDriver.initialize({
    'api': (data) => {
      if (!apiLogDataSchema.validate(data)) {
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
