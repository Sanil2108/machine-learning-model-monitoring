const amqp = require("amqplib/callback_api");

class RabbitMQDriver {
  constructor() {}

  async initialize (typeCallbacks) {
    const connection = await new Promise((resolve, reject) => {
      amqp.connect(process.env.RABBITMQ_URL, function (error, connection) {
        if (error) {
          reject(error);
          return;
        }
        resolve(connection);
      });
    });

    const channel = await new Promise((resolve, reject) => {
      connection.createChannel(function (error, channel) {
        if (error) {
          reject(error);
          return;
        }
        resolve(channel);
      });
    });

    const queue = process.env.RABBITMQ_QUEUE_NAME;
  
    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(
      queue,
      function (msg) {
        const obj = JSON.parse(msg.content.toString());
        typeCallbacks[obj.type](JSON.stringify(obj.data));
      },
      {
        noAck: true,
      }
    );
    
  }
}

const rabbitMqDriver = new RabbitMQDriver();

module.exports = rabbitMqDriver;