const axios = require('axios');

class MLModelDriver {
  constructor() {}

  async initialize() {
    this.axiosInstance = axios.create({
      baseURL: process.env.ML_MODEL_APP_URL
    });
  }

  async sendRequestToMLModel(imageURL, requestUUID) {
    this.axiosInstance.post('/predict', {
      url: imageURL,
      requestUUID
    }, {
      timeout: 5000
    })
  }
}

const mlModelDriver = new MLModelDriver();

module.exports = mlModelDriver;
