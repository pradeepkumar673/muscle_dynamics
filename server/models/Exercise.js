// ===================================
// 💪 Exercise Model - MongoDB Schema
// ===================================
// Mongoose schema - Exercises collection structure define pannanum

const mongoose = require('mongoose');

// ============================================
// Exercise Schema Definition
// ============================================

const exerciseSchema = new mongoose.Schema(
  {
    // Exercise name/title
    name: {
      type: String,
      required: [true, 'Exercise name required'],
      trim: true,
      index: true // Search optimize pannanum
    },

    // Description - Exercise about detail
    description: {
      type: String,
      default: ''
    },

    // Primary muscles - Main target muscles
    primaryMuscles: {
      type: [String],
      required: [true, 'At least one primary muscle required'],
      index: true // Filter pannanum easily
    },

    // Secondary muscles - Supporting muscles (optional)
    secondaryMuscles: {
      type: [String],
      default: []
    },

    // Equipment required
    equipment: {
      type: String,
      required: [true, 'Equipment type required'],
      index: true,
      enum: [
        'Dumbbell',
        'Barbell',
        'Kettlebell',
        'Machine',
        'Cable',
        'Bench',
        'Bodyweight',
        'Medicine Ball',
        'EZ Bar',
        'Resistance Band',
        'Smith Machine',
        'Foam Roll',
        'Pull-up Bar',
        'Trap Bar'
      ]
    },

    // Category - Exercise type
    category: {
      type: String,
      default: 'strength',
      enum: ['strength', 'cardio', 'flexibility', 'balance'],
      index: true
    },

    // Difficulty level
    difficulty: {
      type: String,
      default: 'intermediate',
      enum: ['beginner', 'intermediate', 'advanced']
    },

    // Step-by-step instructions array
    instructions: {
      type: [String],
      required: [true, 'Instructions required'],
      default: []
    },

    // Image filenames array (GitHub free-exercise-db format)
    // Example: ['Incline_Dumbbell_Flyes/0.jpg', 'Incline_Dumbbell_Flyes/1.jpg']
    images: {
      type: [String],
      default: []
    },

    // Alternative names/aliases for search
    aliases: {
      type: [String],
      default: []
    },

    // Reps recommendation
    reps: {
      type: String,
      default: '8-12'
    },

    // Sets recommendation
    sets: {
      type: String,
      default: '3-4'
    },

    // Rest time between sets (seconds)
    restSeconds: {
      type: Number,
      default: 60
    },

    // Popularity/rating
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4
    },

    // Times exercise was used
    usageCount: {
      type: Number,
      default: 0,
      index: true
    }
  },
  {
    timestamps: true, // createdAt, updatedAt auto add pannatum
    toJSON: { virtuals: true } // Virtual fields JSON la include pannatum
  }
);

// ============================================
// Schema Indexes - Query Performance Optimize
// ============================================

// Compound index - Multiple field search optimized
exerciseSchema.index({ primaryMuscles: 1, equipment: 1 });
exerciseSchema.index({ name: 'text', description: 'text' }); // Full-text search

// ============================================
// Schema Methods
// ============================================

// Get image URL from raw GitHub repository
exerciseSchema.methods.getImageUrl = function() {
  if (!this.images || this.images.length === 0) {
    return null;
  }
  
  const baseUrl = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';
  return baseUrl + this.images[0];
};

// Get all image URLs
exerciseSchema.methods.getAllImageUrls = function() {
  if (!this.images || this.images.length === 0) {
    return [];
  }
  
  const baseUrl = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';
  return this.images.map(img => baseUrl + img);
};

// Get muscle badge data
exerciseSchema.methods.getMuscles = function() {
  return {
    primary: this.primaryMuscles || [],
    secondary: this.secondaryMuscles || []
  };
};

// ============================================
// Schema Statics - Model-level methods
// ============================================

// Find exercises by muscles and equipment (Filter logic)
exerciseSchema.statics.findByMusclesAndEquipment = async function(muscles = [], equipment = '') {
  try {
    const query = {};

    // Muscles filter - Any of selected muscles la match pannatum
    if (muscles && muscles.length > 0) {
      query.$or = [
        { primaryMuscles: { $in: muscles } },
        { secondaryMuscles: { $in: muscles } }
      ];
    }

    // Equipment filter
    if (equipment && equipment.trim() !== '') {
      query.equipment = equipment;
    }

    // Execute query
    const exercises = await this.find(query)
      .limit(50) // Maximum 50 results return pannatum
      .lean(); // Mongoose overhead remove pannatum (readonly)

    return exercises;
  } catch (error) {
    throw new Error(`Filter error: ${error.message}`);
  }
};

// Get all available muscles
exerciseSchema.statics.getAllMuscles = async function() {
  try {
    const muscles = await this.distinct('primaryMuscles');
    return muscles.sort();
  } catch (error) {
    throw new Error(`Get muscles error: ${error.message}`);
  }
};

// Get all available equipment
exerciseSchema.statics.getAllEquipment = async function() {
  try {
    const equipment = await this.distinct('equipment');
    return equipment.sort();
  } catch (error) {
    throw new Error(`Get equipment error: ${error.message}`);
  }
};

// ============================================
// Pre-save Middleware
// ============================================

// Before save pannatum - Validation and cleanup
exerciseSchema.pre('save', function(next) {
  // Trim whitespace
  this.name = this.name?.trim();
  
  // Remove duplicates from arrays
  this.primaryMuscles = [...new Set(this.primaryMuscles)];
  this.secondaryMuscles = [...new Set(this.secondaryMuscles)];
  
  next();
});

// ============================================
// Model Creation
// ============================================

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;