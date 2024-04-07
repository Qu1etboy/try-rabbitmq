const amqp = require("amqplib");

async function main() {
  conn = await amqp.connect("amqp://localhost");
  ch = await conn.createChannel();

  console.log("Review Service Running");

  const exchange = "users";
  const queue = "review_queue";

  ch.assertExchange(exchange, "topic", { durable: false });

  ch.assertQueue(queue, { exclusive: true });

  ch.bindQueue(queue, exchange, "users.*");

  ch.consume(
    queue,
    (msg) => {
      console.log(" [x] %s", msg.content.toString());
    },
    { noAck: true }
  );
}

main().catch(console.error);
