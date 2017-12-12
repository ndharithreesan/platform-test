module.exports = {
  development: {
    dialect: 'postgres',
    database: 'platformtest',
    username: 'platformtester',
    password: 'test',
    host: 'localhost',
    secret: 'superAwesomeSecret',
    // expiration is in seconds
    tokenExpiration: '1h'
  }
}
