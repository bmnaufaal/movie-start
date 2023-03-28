const Redis = require("ioredis");

// Create a Redis instance.
// By default, it will connect to localhost:6379.
// We are going to cover how to specify connection options soon.

const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST_URL,
  password: process.env.REDIS_PASSWORD,
});

console.log(process.env.PORT_REDIS);
console.log(process.env.HOST_REDIS);
console.log(process.env.PASS_REDIS);

module.exports = redis;
