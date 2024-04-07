const express = require("express");
const { v4 } = require("uuid");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4001;

const publishToRabbitMQ = require("./publisher");

app.get("/health", (req, res) => {
  res.send("Review service is up and running");
});

app.post("/api/reviews", (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).send("Content is required");
  }

  // publish user created event
  publishToRabbitMQ({ review: { id: v4(), content }, type: "reviews.created" });

  res.send("Review created");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
