const amqp = require("amqplib");

async function main() {
  conn = await amqp.connect("amqp://localhost");
  ch = await conn.createChannel();

  const exchange = "users";

  ch.assertExchange(exchange, "topic", { durable: false });

  ch.publish(exchange, "users.created", Buffer.from("user created"));
  ch.publish(exchange, "users.updated", Buffer.from("user updated"));

  console.log("Done!");

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
}

main().catch(console.error);
