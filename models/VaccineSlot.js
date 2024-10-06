// Schema for booking a vaccine slot
const mongoose = require('mongoose');
const slotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  availableDoses: { type: Number, default: 10 },
});
module.exports = mongoose.model('VaccineSlot', slotSchema);
