module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    hooks: {
      beforeCreate: (user, options) => {
          bcrypt.hash(user.password, 12, (err, hash) => {
            if(err){
              throw(err)
            }
            user.password = hash
          })
      }
    }
  });
}
