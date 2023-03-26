
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path : `./config/.env`})

const MONGODB_URI = process.env.MONGODB_URI ||  'mongodb://127.0.0.1:27017/ShivangDB';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

const db = mongoose.connection;

// console.log({db})

module.exports = { db };