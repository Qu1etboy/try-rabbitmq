const amqp = require("amqplib");

const user = {
  id: 1,
  name: "John Doe",
};

async function main() {
  conn = await amqp.connect("amqp://localhost");
  ch = await conn.createChannel();

  const exchange = "users";

  ch.assertExchange(exchange, "topic", { durable: false });

  ch.publish(
    exchange,
    "users.created",
    Buffer.from(JSON.stringify({ user, type: "users.created" }))
  );
  ch.publish(
    exchange,
    "users.updated",
    Buffer.from(JSON.stringify({ user, type: "users.updated" }))
  );

  console.log("Done!");

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
}

main().catch(console.error);
