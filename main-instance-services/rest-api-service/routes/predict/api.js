const s3Driver = require('../../drivers/s3Driver');
const { createUUID } = require('../../utils/utils');

const uploadImageToS3 = (image) => {
  const requestUuid = `request_image_${createUUID()}`;

  s3Driver.uploadImageToS3({
    imageBase64: image,
    uuid: requestUuid
  });  

  return requestUuid;
}

const sendImageRequestLogToRabbitMQ = (requestUuid) => {

}

const sendInputToMLModel = async (image) => {

}

const sendOutputResponseLogToRabbitMQ = (requestUuid) => {

}

const predict = async ({body}, res) => {
  const {image} = body;

  // Upload the image to S3
  const requestUuid = await uploadImageToS3(image);

  // Send data to rabbitmq
  sendImageRequestLogToRabbitMQ(requestUuid);

  // Send image to flask and wait for output
  const prediction = await sendInputToMLModel(image);

  // Send output data to rabbitmq
  sendOutputResponseLogToRabbitMQ(requestUuid);

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