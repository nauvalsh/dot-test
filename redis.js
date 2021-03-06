const redis = require('redis');
const { promisify } = require('util');

// Initiate dotenv config
require('dotenv').config();

// Create redis client connection
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});
// Wrapper redis get and set in Promise
const GetAsync = promisify(client.get).bind(client);
const SetAsync = promisify(client.setex).bind(client);
const DelAsync = promisify(client.del).bind(client);
const FlushAsync = promisify(client.flushall).bind(client);

exports.redisGetAsync = GetAsync;
exports.redisSetAsync = SetAsync;
exports.redisDelAsync = DelAsync;
exports.redisFlushAsync = FlushAsync;
exports.closeInstance = (callback) => {
  client.quit(callback);
};
