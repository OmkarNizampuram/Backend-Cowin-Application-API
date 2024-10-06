const express = require('express');
const User = require('../models/User');
const VaccineSlot = require('../models/VaccineSlot');
const router = express.Router();

// Api to fetch all the users

router.get('/users', async (req, res) => {
  const { age, pincode, vaccinated } = req.query;
  const query = {};
  
  // Add filters to the query if parameters are provided
  if (age) query.age = age;
  if (pincode) query.pincode = pincode;
  if (vaccinated) query.vaccinated = vaccinated;

  try {
    // Find all users based on the filters
    const users = await User.find(query);
    
    // If no users found, return a 404
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Return the total number of users and the filtered users list
    res.json({
      total: users.length, // total users found
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// api to fetch all the slots 

router.get('/slots', async (req, res) => {
  const { date } = req.query; // Optional date filter

  try {
    // If date is provided, find slots for that date, otherwise fetch all slots
    let slots;
    if (date) {
      slots = await VaccineSlot.find({ date });
    } else {
      slots = await VaccineSlot.find({});
    }

    // If no slots found
    if (!slots || slots.length === 0) {
      return res.status(404).json({ message: 'No available slots found' });
    }

    // Return the found slots
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router; 