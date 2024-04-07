const amqp = require("amqplib");

async function main() {
  conn = await amqp.connect("amqp://localhost");
  ch = await conn.createChannel();

  console.log("Notification Service Running");

  const userExchange = "users";
  const reviewExchange = "reviews";
  const queue = "notification_queue";

  ch.assertExchange(userExchange, "topic", { durable: false });
  ch.assertExchange(reviewExchange, "topic", { durable: false });

  ch.assertQueue(queue);

  ch.bindQueue(queue, userExchange, "users.created");
  ch.bindQueue(queue, reviewExchange, "reviews.created");

  ch.consume(queue, (msg) => {
    console.log(" [x] %s", msg.content.toString());
  });
}

main().catch(console.error);
