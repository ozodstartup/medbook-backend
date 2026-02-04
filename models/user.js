const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  password: String,
  telegramId: String,
  role: {
    type: String,
    default: "patient"
  }
});

module.exports = mongoose.model('User', UserSchema);
