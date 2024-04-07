const express = require("express");
const { v4 } = require("uuid");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

const publishToRabbitMQ = require("./publisher");

app.get("/health", (req, res) => {
  res.send("User service is up and running");
});

app.post("/api/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send("Name is required");
  }

  // publish user created event
  publishToRabbitMQ({ user: { id: v4(), name }, type: "users.created" });

  res.send("User created");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
