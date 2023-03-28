const Redis = require("ioredis");

// Create a Redis instance.
// By default, it will connect to localhost:6379.
// We are going to cover how to specify connection options soon.
const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST_URL,
  username: "default",
  password: process.env.REDIS_PASSWORD,
});

module.exports = redis;
