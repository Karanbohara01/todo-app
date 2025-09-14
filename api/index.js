// api/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const taskRoutes = require('./routes/taskRoutes')


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
// IMPORTANT: You MUST have your MONGO_URI in Vercel's Environment Variables
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/tasks', taskRoutes);
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server is running locally on port ${PORT}`));
}

// Export the app
module.exports = app;