const amqp = require("amqplib");

async function publishToRabbitMQ(data) {
  conn = await amqp.connect("amqp://localhost");
  ch = await conn.createChannel();

  const exchange = "reviews";

  ch.assertExchange(exchange, "topic", { durable: false });

  ch.publish(exchange, data.type, Buffer.from(JSON.stringify(data)));

  setTimeout(() => {
    conn.close();
  }, 500);
}

module.exports = publishToRabbitMQ;
