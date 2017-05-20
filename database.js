/*jshint esversion: 6 */
const mongoose = require('mongoose');
const config   = require('config');

const mongoDBConnStr = 'mongodb://';
const User = require('./models/user');

let publisher = null;
let dbConfig = config.get('dbConfig');
let host = dbConfig.host;
let port = dbConfig.port;
let name = dbConfig.dbName;
let options = dbConfig.options;
let connection = mongoDBConnStr + host + ':' + port + '/' + name;

let initSampleData = () => {
  let users = require('./sample/users.json');

  let i;
  let length = users.length;
  for(i = 0; i < length; i++) {
    let sampleUser = users[i];
    let password = sampleUser.password;

    let user = new User({
      name: sampleUser.name,
      username: sampleUser.username,
      password: sampleUser.password,
      birth: sampleUser.birth,
      address: sampleUser.address,
      profession: sampleUser.profession
    });

    user.password = user.generateHash(password);
    user.save();
  }
};

module.exports = {
  init : (pubSub) => {
    mongoose.connect(connection, options, (err) => {
      if (err) {
        console.log('Database connect error');
      } else {
        console.log('Database connect success');

        initSampleData();
      }
    });
  }
};
