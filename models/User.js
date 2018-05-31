const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  fullname: String,
  email: String,
  phone: String,
});

module.exports = mongoose.model('User', userSchema);
