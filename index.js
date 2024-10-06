const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const slotRoutes = require('./routes/slot');

const app = express();
app.use(express.json());
// establishing connection with database
mongoose.connect('mongodb+srv://omkaromkar721:Omkar%40187@projectdb.hrfa3.mongodb.net/Node-API?retryWrites=true&w=majority&appName=ProjectDB')
  .then(() => {
    app.listen(3000,()=>{
        console.log("Server running on port 3000")
    })
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error', err);
  });

// API's
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/slot', slotRoutes);

