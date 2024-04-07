const amqp = require("amqplib");

async function main() {
  conn = await amqp.connect("amqp://localhost");
  ch = await conn.createChannel();

  const exchange = "logs";

  const queue = "logs_queue";

  ch.assertExchange(exchange, "fanout", { durable: false });

  ch.assertQueue(queue, { exclusive: true });

  ch.bindQueue(queue, exchange, "");

  ch.consume(
    queue,
    (msg) => {
      console.log(" [x] %s", msg.content.toString());
    },
    { noAck: true }
  );
}

main().catch(console.error);
