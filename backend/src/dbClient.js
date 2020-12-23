var redis = require("redis");
const configure = require('./configure')

const config = configure()
var client = redis.createClient({
  host: process.env.REDIS_HOST || config.redis.host,
  port: config.redis.port,
  retry_strategy: () => {
    console.log(process.env.REDIS_HOST || config.redis.host)
    console.log(config.redis.port)
    return new Error("Retry time exhausted")
  }
})

process.on('SIGINT', function() {
  client.quit();
});

module.exports = client
