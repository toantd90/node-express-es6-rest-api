/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let userSchema = new Schema({
  name: {
    type: String,
    min: 6,
    max: 20
  },
  username: {
    type: String,
    min: 6,
    max: 20,
    unique: true,
    required: true,
    dropDups: true
  },
  password: {
    type: String,
    min: 6,
    max: 20
  },
  birth: {
    type: Date
  },
  address: {
    type: String
  },
  profession: {
    type: String
  },
  status: {
    type: Boolean,
    default: true
  }
});

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
