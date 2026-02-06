const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://pradeep:kumar@exercises.ynfifll.mongodb.net/fitness?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️  Starting server without database connection...');
  });

// Routes
const Exercise = mongoose.model('Exercise', require('./models/Exercise'));
const exerciseRoutes = require('./routes/exercises');
app.use('/api/exercises', exerciseRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' 
  });
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});