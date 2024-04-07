const amqp = require("amqplib");

async function main() {
  conn = await amqp.connect("amqp://localhost");
  ch = await conn.createChannel();

  const exchange = "reviews";

  ch.assertExchange(exchange, "topic", { durable: false });

  ch.publish(exchange, "reviews.created", Buffer.from("review created"));

  console.log("Done!");

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
}

main().catch(console.error);
