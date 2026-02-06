const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  primaryMuscles: [{
    type: String,
    required: true
  }],
  secondaryMuscles: [{
    type: String
  }],
  equipment: {
    type: String,
    required: true
  },
  instructions: [{
    type: String,
    required: true
  }],
  images: [{
    type: String
  }],
  category: {
    type: String,
    enum: ['strength', 'cardio', 'stretching', 'plyometrics', 'strongman', 'powerlifting', 'olympic_weightlifting'],
    default: 'strength'
  },
  force: {
    type: String,
    enum: ['pull', 'push', 'static', null]
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'expert']
  },
  mechanic: {
    type: String,
    enum: ['compound', 'isolation', null]
  },
  // Additional fields for workout generation
  difficulty: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4
  }
}, {
  timestamps: true
});

// Indexes for faster queries
exerciseSchema.index({ primaryMuscles: 1 });
exerciseSchema.index({ equipment: 1 });
exerciseSchema.index({ category: 1 });

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;