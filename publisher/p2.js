const amqp = require("amqplib");

async function main() {
  conn = await amqp.connect("amqp://localhost");
  ch = await conn.createChannel();

  const exchange = "users";

  const msg = process.argv.slice(2).join(" ") || "Hello World!";

  ch.assertExchange(exchange, "fanout", { durable: false });

  ch.publish(exchange, "", Buffer.from("msg from users exchange"));

  console.log(" [x] Sent %s", msg);

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
}

main().catch(console.error);
