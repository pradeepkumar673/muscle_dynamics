// ===================================
// 💪 Muscle Dynamics - Backend Server
// ===================================
// MERN stack backend - Node.js + Express + MongoDB
// Tamizh+English Comments

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();

// ============================================
// Middleware Setup - Backend Request Handlers
// ============================================

// CORS - Cross-Origin Resource Sharing (React frontend aala request accept pannanum)
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-frontend-url.com' 
    : 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}));

// JSON body parser (Request body la JSON data extract pannanum)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// MongoDB Connection - Database Setup
// ============================================

const connectDB = async () => {
  try {
    // MongoDB Atlas la connect pannanum
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected Successfully');
    console.log(`📁 Database: ${mongoose.connection.db.getName()}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1); // Process stop pannanum failure case la
  }
};

// Database connection attempt pannanum
connectDB();

// ============================================
// Routes - API Endpoints
// ============================================

// Exercises routes import pannanum
const exercisesRouter = require('./routes/exercises');

// API routes mount pannanum
app.use('/api/exercises', exercisesRouter);

// Health check endpoint (Server running innukku verify pannanum)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Muscle Dynamics Server Running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Muscle Dynamics API',
    version: '1.0.0',
    endpoints: {
      exercises: '/api/exercises?muscles=Chest&equipment=Dumbbell',
      health: '/api/health'
    }
  });
});

// ============================================
// Error Handling Middleware
// ============================================

// 404 - Route not found
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Error handling middleware - All errors yaha handle pannanum
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    status: err.status || 500
  });
});

// ============================================
// Server Start - Listen pannanum
// ============================================

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   💪 MUSCLE DYNAMICS - Backend Server   ║
╠════════════════════════════════════════╣
║ Server: http://localhost:${PORT}         ║
║ Env: ${process.env.NODE_ENV || 'development'}        ║
║ DB: MongoDB Atlas Connected            ║
╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown - Server stop pannanum properly
process.on('SIGTERM', () => {
  console.log('\n🛑 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    mongoose.connection.close(false, () => {
      console.log('✅ MongoDB connection closed');
      process.exit(0);
    });
  });
});

module.exports = app;