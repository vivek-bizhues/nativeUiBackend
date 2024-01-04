const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: String,
  mobile: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;