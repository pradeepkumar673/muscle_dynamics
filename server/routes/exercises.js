const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

// @route   GET /api/exercises
// @desc    Get exercises with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      muscles, 
      equipment, 
      category, 
      limit = 50, 
      page = 1,
      search 
    } = req.query;
    
    const query = {};
    
    // Filter by muscles (primary or secondary)
    if (muscles) {
      const muscleArray = Array.isArray(muscles) ? muscles : muscles.split(',');
      query.$or = [
        { primaryMuscles: { $in: muscleArray } },
        { secondaryMuscles: { $in: muscleArray } }
      ];
    }
    
    // Filter by equipment
    if (equipment) {
      const equipmentArray = Array.isArray(equipment) ? equipment : equipment.split(',');
      query.equipment = { $in: equipmentArray };
    }
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    // Pagination
    const skip = (page - 1) * parseInt(limit);
    
    const exercises = await Exercise.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ rating: -1, name: 1 });
    
    const total = await Exercise.countDocuments(query);
    
    res.json({
      success: true,
      count: exercises.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: exercises
    });
    
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error' 
    });
  }
});

// @route   GET /api/exercises/:id
// @desc    Get single exercise by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    
    if (!exercise) {
      return res.status(404).json({ 
        success: false, 
        error: 'Exercise not found' 
      });
    }
    
    res.json({
      success: true,
      data: exercise
    });
    
  } catch (error) {
    console.error('Error fetching exercise:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false, 
        error: 'Exercise not found' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Server error' 
    });
  }
});

// @route   GET /api/exercises/random/:count
// @desc    Get random exercises
// @access  Public
router.get('/random/:count', async (req, res) => {
  try {
    const count = parseInt(req.params.count) || 10;
    
    const exercises = await Exercise.aggregate([
      { $sample: { size: count } }
    ]);
    
    res.json({
      success: true,
      count: exercises.length,
      data: exercises
    });
    
  } catch (error) {
    console.error('Error fetching random exercises:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error' 
    });
  }
});

// @route   GET /api/exercises/filters/unique
// @desc    Get unique values for filters
// @access  Public
router.get('/filters/unique', async (req, res) => {
  try {
    const [equipment, muscles, categories] = await Promise.all([
      Exercise.distinct('equipment'),
      Exercise.distinct('primaryMuscles'),
      Exercise.distinct('category')
    ]);
    
    res.json({
      success: true,
      data: {
        equipment: equipment.filter(Boolean).sort(),
        muscles: muscles.filter(Boolean).sort(),
        categories: categories.filter(Boolean).sort()
      }
    });
    
  } catch (error) {
    console.error('Error fetching unique filters:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error' 
    });
  }
});

module.exports = router;