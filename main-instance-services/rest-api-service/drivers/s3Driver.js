const axios = require("axios");
const S3 = require('aws-sdk/clients/s3');
const { dataURLtoFile } = require("../utils/utils");

class S3Driver {
  constructor() {}

  async initialise() {
    // ssh -i main-instance.pem -L 4321:169.254.169.254:80 ubuntu@
    const response = await axios.get(process.env.S3_CREDENTIALS_URL);
    
    this.s3Client = new S3({
      apiVersion: "2006-03-01",
      params: {
        Bucket: process.env.BUCKET_NAME,
        accessKeyId: response.AccessKeyId,
        secretAccessKey: response.SecretAccessKey,
      }
    });
  }

  async uploadImageToS3({ imageBase64, uuid }) {
    const imageBinaryData = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""),'base64');

    await new Promise((resolve, reject) => {
      this.s3Client.putObject({
        Body: imageBinaryData, 
        Key: `input-${uuid}.png`,
        Bucket: process.env.BUCKET_NAME, 
      }, (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(data);
      })
    })
  }
}

const s3Driver = new S3Driver();
module.exports = s3Driver;
