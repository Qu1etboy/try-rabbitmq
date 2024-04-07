const amqp = require("amqplib");

/**
 *
 * @param { user, type } data
 */
async function publishToRabbitMQ(data) {
  conn = await amqp.connect("amqp://localhost");
  ch = await conn.createChannel();

  const exchange = "users";

  ch.assertExchange(exchange, "topic", { durable: false });

  ch.publish(exchange, data.type, Buffer.from(JSON.stringify(data)));

  setTimeout(() => {
    conn.close();
  }, 500);
}

module.exports = publishToRabbitMQ;
