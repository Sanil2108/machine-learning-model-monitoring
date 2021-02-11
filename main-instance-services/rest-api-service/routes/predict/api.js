const s3Driver = require('../../drivers/s3Driver');
const mlModelDriver = require('../../drivers/mlModelDriver');
const rabbitmqDriver = require('../../drivers/rabbitMqDriver');

const uploadImageToS3 = (image, requestUUID) => {
  s3Driver.uploadImageToS3({
    imageBase64: image,
    uuid: requestUUID
  });  

  return requestUuid;
}

const sendInputToMLModel = async (image, requestUUID) => {
  return mlModelDriver.sendRequestToMLModel(image, requestUUID);
}

const sendOutputResponseLogToRabbitMQ = (prediction, requestUuid, imageURL, apiKey, computationTime) => {
  rabbitmqDriver.sendMessageToLoggingService(JSON.stringify(
    {
      type: 'prediction-data',
      data: {
        'timestamp': (new Date()).getTime(),
        'computation-time': computationTime,
        'api-key': apiKey,
        'request-uuid': requestUuid,
        'input': {
          'url': imageURL
        },
        'output-metadata': {
          'confidence': prediction.confidence,
          'faceLocationRectangles': prediction.faceLocationRectangles
        }
      }
    }
  ));
}

const predict = async ({body, requestUUID, apiKey}, res) => {
  const {image} = body;

  // Upload the image to S3
  await uploadImageToS3(image, requestUUID);

  // Send image to flask and wait for output
  const startTime = (new Date().getTime());
  const prediction = await sendInputToMLModel(image, requestUUID);
  const computationTime = (new Date().getTime()) - startTime;

  // Send output data to rabbitmq
  sendOutputResponseLogToRabbitMQ(prediction, requestUUID, image, apiKey, computationTime);

  // TODO:
  // Create an output image based on input image and data returned from Flask app
  // Upload this image to S3

  return {
    prediction
  }
}

module.exports = {
  predict
}