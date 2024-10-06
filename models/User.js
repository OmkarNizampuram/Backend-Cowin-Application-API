// created schema for user in the data base
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  pincode: { type: String, required: true },
  aadharNo: { type: String, required: true },
  password: { type: String, required: true },
  vaccinated: { type: String, enum: ['none','first', 'second'], default: 'none' }
});
module.exports = mongoose.model('User', userSchema);
