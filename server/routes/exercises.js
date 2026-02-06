// ===================================
// 💪 Exercises Routes - API Endpoints
// ===================================
// Express routes - GET, POST requests handle pannatum

const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

// ============================================
// GET /api/exercises
// Purpose: Fetch exercises by muscles and equipment
// Query params: muscles (array), equipment (string)
// ============================================

router.get('/', async (req, res) => {
  try {
    // Query parameters extract pannatum
    const { muscles, equipment, limit = 50, skip = 0 } = req.query;

    // Build filter query object
    const query = {};

    // Muscles filter - User selected muscles la match pannatum
    if (muscles) {
      const muscleArray = Array.isArray(muscles) ? muscles : [muscles];
      
      // Clean and validate muscles
      const cleanMuscles = muscleArray
        .map(m => m.trim())
        .filter(m => m.length > 0);

      if (cleanMuscles.length > 0) {
        // $or operator - Any of primary or secondary muscles match pannatum
        query.$or = [
          { primaryMuscles: { $in: cleanMuscles } },
          { secondaryMuscles: { $in: cleanMuscles } }
        ];
      }
    }

    // Equipment filter - Specific equipment la match pannatum
    if (equipment && equipment.trim() !== '') {
      query.equipment = equipment.trim();
    }

    // MongoDB query execute pannatum
    const exercises = await Exercise.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .lean(); // Performance optimization - readonly documents

    // Total count for pagination
    const total = await Exercise.countDocuments(query);

    // Response send pannatum
    res.json({
      success: true,
      count: exercises.length,
      total: total,
      data: exercises.map(exercise => ({
        ...exercise,
        imageUrl: exercise.images && exercise.images[0] 
          ? `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.images[0]}`
          : null,
        allImages: exercise.images 
          ? exercise.images.map(img => `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${img}`)
          : []
      }))
    });

  } catch (error) {
    console.error('❌ GET /api/exercises error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error fetching exercises'
    });
  }
});

// ============================================
// GET /api/exercises/:id
// Purpose: Fetch single exercise by ID
// ============================================

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // MongoDB ObjectId validation pannatum
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid exercise ID format'
      });
    }

    // Exercise search pannatum
    const exercise = await Exercise.findById(id).lean();

    if (!exercise) {
      return res.status(404).json({
        success: false,
        error: 'Exercise not found'
      });
    }

    // Image URLs construct pannatum
    const response = {
      success: true,
      data: {
        ...exercise,
        imageUrl: exercise.images && exercise.images[0]
          ? `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.images[0]}`
          : null,
        allImages: exercise.images
          ? exercise.images.map(img => `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${img}`)
          : []
      }
    };

    res.json(response);

  } catch (error) {
    console.error('❌ GET /api/exercises/:id error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error fetching exercise'
    });
  }
});

// ============================================
// GET /api/exercises/muscles/all
// Purpose: Get all available muscles
// ============================================

router.get('/muscles/all', async (req, res) => {
  try {
    // All unique primary muscles fetch pannatum
    const muscles = await Exercise.distinct('primaryMuscles');

    res.json({
      success: true,
      count: muscles.length,
      data: muscles.sort()
    });

  } catch (error) {
    console.error('❌ GET /api/exercises/muscles/all error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error fetching muscles'
    });
  }
});

// ============================================
// GET /api/exercises/equipment/all
// Purpose: Get all available equipment types
// ============================================

router.get('/equipment/all', async (req, res) => {
  try {
    // All unique equipment types fetch pannatum
    const equipment = await Exercise.distinct('equipment');

    res.json({
      success: true,
      count: equipment.length,
      data: equipment.sort()
    });

  } catch (error) {
    console.error('❌ GET /api/exercises/equipment/all error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error fetching equipment'
    });
  }
});

// ============================================
// POST /api/exercises/search
// Purpose: Advanced search with multiple filters
// Body: { muscles: [], equipment: '', difficulty: '', limit: 50 }
// ============================================

router.post('/search', async (req, res) => {
  try {
    const { muscles = [], equipment = '', difficulty = '', limit = 50 } = req.body;

    const query = {};

    // Muscles filter
    if (muscles && muscles.length > 0) {
      const cleanMuscles = muscles
        .map(m => typeof m === 'string' ? m.trim() : m)
        .filter(m => m.length > 0);

      if (cleanMuscles.length > 0) {
        query.$or = [
          { primaryMuscles: { $in: cleanMuscles } },
          { secondaryMuscles: { $in: cleanMuscles } }
        ];
      }
    }

    // Equipment filter
    if (equipment && equipment.trim() !== '') {
      query.equipment = equipment.trim();
    }

    // Difficulty filter
    if (difficulty && ['beginner', 'intermediate', 'advanced'].includes(difficulty)) {
      query.difficulty = difficulty;
    }

    // Query execute pannatum
    const exercises = await Exercise.find(query)
      .limit(parseInt(limit))
      .lean();

    res.json({
      success: true,
      count: exercises.length,
      data: exercises.map(exercise => ({
        ...exercise,
        imageUrl: exercise.images && exercise.images[0]
          ? `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.images[0]}`
          : null
      }))
    });

  } catch (error) {
    console.error('❌ POST /api/exercises/search error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error searching exercises'
    });
  }
});

// ============================================
// GET /api/exercises/stats
// Purpose: Get database statistics
// ============================================

router.get('/stats', async (req, res) => {
  try {
    const totalExercises = await Exercise.countDocuments();
    const allMuscles = await Exercise.distinct('primaryMuscles');
    const allEquipment = await Exercise.distinct('equipment');

    res.json({
      success: true,
      stats: {
        totalExercises,
        uniqueMuscles: allMuscles.length,
        uniqueEquipment: allEquipment.length,
        muscles: allMuscles.sort(),
        equipment: allEquipment.sort()
      }
    });

  } catch (error) {
    console.error('❌ GET /api/exercises/stats error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error fetching stats'
    });
  }
});

// ============================================
// Error Handling - Invalid Routes
// ============================================

router.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.path} not found`
  });
});

module.exports = router;