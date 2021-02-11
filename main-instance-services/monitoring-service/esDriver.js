const elasticsearch = require('elasticsearch');

class ESDriver {
  constructor() {}

  async initialize() {
    this.client = new elasticsearch.Client({
      host: process.env.ELAST_SEARCH_HOST,
      log: 'trace',
      apiVersion: process.env.ELASTIC_SEARCH_VERSION,
    });
  }

  async addLogData({type, data}) {
    try {
      // console.log(data);
      await this.client.index({
        body: data,
        index: type
      });
    }
    catch (ex) {
      console.log('Something went wrong when inserting data into ES', ex);
    }
  }

}

const esDriver = new ESDriver();

module.exports = esDriver;