const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 8000

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const config = require('./config/config')[env];
const models = require('./models');
const userRoutes = require('./routes/user');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

models.sequelize.sync();

// app.use('/user', userRoutes);

app.listen(port);
console.log(`App is running on port ${port}`)
