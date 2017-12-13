const env = process.env.NODE_ENV || "development";
const redisClient = require('../config/redis').redisClient;
const config = require('../config/config')[env];
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  // check if token is on list of blacklisted jwt
  if(token){
      //will throw error if not valid
      try {
        jwt.verify(token, config.secret)
      }
      catch (error){
        res.status(403).json({message:'Invalid Token'})
      }

      redisClient.get(token, (error, reply) => {
        if(reply){
          res.status(403).json({message: 'Authentication Error: Invalid Token'})
        } else if (error){
          console.error(error)
          res.status(400).json({message:'could not validate token'})
        } else {
          next();
        }
      })
  } else {
    res.status(403).json({message: 'Authentication Error: No Token Provided'})
  }
}

module.exports.auth = auth;
