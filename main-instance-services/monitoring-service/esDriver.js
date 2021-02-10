const elasticsearch = require('elasticsearch');

class ESDriver {
  constructor()

  async initialize() {
    this.client = new elasticsearch.Client({
      host: process.env.ELAST_SEARCH_HOST,
      log: 'trace',
      apiVersion: process.env.ELAST_SEARCH_VERSION,
    });
  }

  async addLogData({type, data}) {
    try {
      await this.client.create({
        type,
        body: data
      });
    }
    catch (ex) {
      console.log('Something went wrong when inserting data into ES');
    }
  }

}

const esDriver = new ESDriver();

module.exports = esDriver;