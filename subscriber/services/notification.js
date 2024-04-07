const amqp = require("amqplib");

async function main() {
  conn = await amqp.connect("amqp://localhost");
  ch = await conn.createChannel();

  console.log("Notification Service Running");

  const exchange = "users";
  const queue = "notification_queue";

  ch.assertExchange(exchange, "topic", { durable: false });

  ch.assertQueue(queue, { exclusive: true });

  ch.bindQueue(queue, exchange, "users.created");

  ch.consume(
    queue,
    (msg) => {
      console.log(" [x] %s", msg.content.toString());
    },
    { noAck: true }
  );
}

main().catch(console.error);
