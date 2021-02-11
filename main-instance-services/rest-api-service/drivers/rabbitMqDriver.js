const amqp = require("amqplib/callback_api");

class RabbitMQDriver {
  constructor() {}

  async initialise() {
    const connection = await new Promise((resolve, reject) => {
      amqp.connect(process.env.RABBITMQ_URL, function (error, connection) {
        if (error) {
          reject(error);
          return;
        }
        resolve(connection);
      });
    });

    this.channel = await new Promise((resolve, reject) => {
      connection.createChannel(function (error, channel) {
        if (error) {
          reject(error);
          return;
        }
        resolve(channel);
      });
    });

    const queue = process.env.RABBITMQ_QUEUE_NAME;
  
    this.channel.assertQueue(queue, {
      durable: false,
    });
  }

  sendMessageToLoggingService(message) {
    const queue = process.env.RABBITMQ_QUEUE_NAME;
    this.channel.sendToQueue(queue, Buffer.from(message));
  }

}

const rabbitMqDriver = new RabbitMQDriver();
module.exports = rabbitMqDriver;