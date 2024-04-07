const amqp = require("amqplib");

async function main() {
  conn = await amqp.connect("amqp://localhost");
  ch = await conn.createChannel();

  const exchange = "logs";
  const exchange2 = "users";

  const queue = "logs_queue";

  ch.assertExchange(exchange, "fanout", { durable: false });
  ch.assertExchange(exchange2, "fanout", { durable: false });

  ch.assertQueue(queue, { exclusive: true });

  ch.bindQueue(queue, exchange, "");
  ch.bindQueue(queue, exchange2, "");

  ch.consume(
    queue,
    (msg) => {
      console.log(" [x] %s", msg.content.toString());
    },
    { noAck: true }
  );
}

main().catch(console.error);
