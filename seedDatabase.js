'use strict';

const mongoose = require('mongoose');

const { MONGODB_URI } = require('./config');
const Data = require('./data');

const seedData = require('./dataFile');

//schema, seedDatabase, and insert needed to make database locally;

mongoose.connect(MONGODB_URI)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
      Data.insertMany(seedData),
    ]);
  })
  .then(results => {
    console.info(`Inserted ${results.length} Data`);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(err);
  });