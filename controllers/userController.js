const User = require('../models').user;
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



module.exports = {
  compileUser: (body) => {
    return {
      name: body.name || null,
      email: body.email || null,
      password: body.password || null
    };
  },

  createToken: (user) => {
    let payload = {
      name: user.name,
      email: user.email
    }
    return jwt.sign(payload, config.secret, {
      expiresIn: config.tokenExpiration
    })
  },

  signup: (req, res, next) => {
    let currentUser = module.exports.compileUser(req.body);
    User.find({where: {email: currentUser.email}})
    .then((user) => {
      if(user) {
        res.status(401).json({message: 'Email is already on file'})
      } else {
        return bcrypt.hash(currentUser.password, 12)
        .then((hash) => {
          return User.create({
            name:currentUser.name,
            email: currentUser.email,
            password: hash
          })
          .then((user)=> {
            let result = {
              token: module.exports.createToken(user),
              message: 'User Created'
            }
            res.json(result)
          })
          .catch((error) => {
            console.error(error)
            res.status(404).json({
              message: 'User could not be created',
            })
          })
        }
      )}
    })
  },

  login: (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let currentUser;
    User.findOne({ where: { email: email }})
    .then((user) => {
      if(!user){
        res.status(401).json({message:'User/Password is incorrect'})
      }
      currentUser = user;
      return bcrypt.compare(password, user.password)
    })
    .then((result) => {
      if(result) {
        let response = {
          token: module.exports.createToken(currentUser),
          message: 'Logged In'
        }
        res.json(response)
      }
    })
  },

  updateUser: (req, res, next) => {
    let modifiedUser = module.exports.compileUser(req.body)
    let userId = req.params.userId

    User.findById(userId)
      .then((user) => {
        user.email = modifiedUser.email || user.email;
        user.name = modifiedUser.name || user.name;

        //if the password is changing, have to encrypt
        if(modifiedUser.password){
          return bcrypt.hash(modifiedUser.password, 12)
          .then((hash) => {
            user.password = hash;
            return hash
          })
        }
        return user
      })
      .then((updatedUser)=>{
        return updatedUser.save()
      }).then((result)=>{
        let response = {
          token: module.exports.createToken(result),
          message: 'User Updated'
        }
        res.json(response)
      })
      .catch((error)=> {
        console.error(error)
        res.status(404).json({message:'Could not update User'})
      })
  },

  deleteUser: (req, res, next) => {
    let userId = req.params.userId
    User.findById(userId)
      .then((user) => {
        if(!user){
          res.status(404).json({message:'User not found'})
        }
        return user.destroy()
      })
      .then(() => {
        res.json({message:'User Deleted'})
      })
      .catch((error) => {
        console.error(error)      
      })
  }
}
