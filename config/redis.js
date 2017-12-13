const env = process.env.NODE_ENV || "development";
const config = require('../config/config')[env];
const redis = require('redis');
const redisClient = redis.createClient()

redisClient.on('error', (error) => {
  console.log('Error' + error)
})

redisClient.on('connect', () => {
  console.log('Redis is connected')
})

module.exports.redisClient = redisClient;
