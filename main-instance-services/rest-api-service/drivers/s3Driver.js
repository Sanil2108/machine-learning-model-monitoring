const axios = require('axios');
import S3 from 'aws-sdk/clients/s3';

class S3Driver {
  constructor() {

  }

  async initialise () {
    // 169.254.169.254
    const response = await axios.get(process.env.S3_CREDENTIALS_URL);
    

  }

  async uploadImageToS3 () {

  }
}

const s3Driver = new S3Driver();
module.exports = s3Driver;