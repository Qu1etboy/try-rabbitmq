const amqp = require("amqplib");

async function main() {
  conn = await amqp.connect("amqp://localhost");
  ch = await conn.createChannel();

  const exchange = "logs";
  const msg = process.argv.slice(2).join(" ") || "Hello World!";

  ch.assertExchange(exchange, "fanout", { durable: false });
  ch.publish(exchange, "", Buffer.from(msg));
  console.log(" [x] Sent %s", msg);
}

main().catch(console.error);
