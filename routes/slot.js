const express = require('express');
const VaccineSlot = require('../models/VaccineSlot');
const User = require('../models/User');
const router = express.Router();
// api to register the slot
router.post('/registerSlot', async (req, res) => {
  const { date, time, availableDoses } = req.body;

  try {
    // Check if the slot already exists for the given date and time
    const existingSlot = await VaccineSlot.findOne({ date, time });
    if (existingSlot) {
      return res.status(400).json({ message: 'Slot already exists for the given date and time' });
    }

    // Create a new slot
    const newSlot = new VaccineSlot({ date, time, availableDoses });
    await newSlot.save();

    res.status(201).json({ message: 'Vaccine slot registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// api to book the slot 
router.post('/bookSlot', async (req, res) => {
  const { userId, date, time, dose } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if the user is already fully vaccinated
    if (user.vaccinated === 'second') {
      return res.status(400).json({ message: 'Already vaccinated with second dose' });
    }

    // Ensure the user is registering for the second dose only if the first dose is completed
    if (dose === 'second' && user.vaccinated !== 'first') {
      return res.status(400).json({ message: 'First dose not completed' });
    }

    // Fetch the vaccine slot
    const slot = await VaccineSlot.findOne({ date, time });
    if (!slot || slot.availableDoses <= 0) {
      return res.status(400).json({ message: 'Slot not available' });
    }

    // If booking is made less than 24 hours before the slot, prevent update
    const currentTime = new Date();
    const slotTime = new Date(`${date}T${time}:00`);

    if (currentTime.getTime() >= slotTime.getTime()) {
      return res.status(400).json({ message: 'Cannot book a slot in the past or too close to the slot time' });
    }

    // Ensure users can change the slot until 24 hours before the registered slot time
    const twentyFourHoursInMillis = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    if (slotTime.getTime() - currentTime.getTime() < twentyFourHoursInMillis) {
      return res.status(400).json({ message: 'Cannot change slot within 24 hours of the appointment' });
    }

    // Reduce available doses for the slot
    slot.availableDoses -= 1;
    await slot.save();

    // Update user's vaccination status and save
    user.vaccinated = dose; // 'first' or 'second'
    await user.save();

    res.json({ message: `Slot booked for ${dose} dose at ${time} on ${date}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router; 