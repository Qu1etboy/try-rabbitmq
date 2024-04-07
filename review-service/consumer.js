const amqp = require("amqplib");

async function main() {
  conn = await amqp.connect("amqp://localhost");
  ch = await conn.createChannel();

  console.log("Review Service Running");

  const exchange = "users";
  const queue = "review_queue";

  ch.assertExchange(exchange, "topic", { durable: false });

  ch.assertQueue(queue);

  ch.bindQueue(queue, exchange, "users.*");

  ch.consume(
    queue,
    (msg) => {
      let data = msg.content.toString();
      try {
        data = JSON.parse(msg.content.toString());

        switch (data.type) {
          case "users.created":
            console.log(
              " [x] user created with id = " +
                data.user.id +
                " and name = " +
                data.user.name
            );
            break;
          case "users.updated":
            console.log(
              " [x] user updated with id = " +
                data.user.id +
                " and name = " +
                data.user.name
            );
            break;
          default:
            console.log(" [x] %s", data);
        }
      } catch (error) {
        // handle any none JSON data
        console.log(" [x] %s", data);
      }
    },
    { noAck: true }
  );
}

main().catch(console.error);
