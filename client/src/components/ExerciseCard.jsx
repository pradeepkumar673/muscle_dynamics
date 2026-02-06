// ===================================
// 💪 Exercise Card Component
// ===================================
// Single exercise card - List la show pannatum

import React, { useState } from 'react';
import { Trash2, Eye, Shuffle } from 'lucide-react';

const ExerciseCard = ({
  exercise,
  onDelete,
  onShuffle,
  onViewDetails
}) => {
  const [imageError, setImageError] = useState(false);

  // Muscle badge color mapping
  const getMuscleColor = (muscle) => {
    const colors = {
      'Chest': 'bg-red-600',
      'Back': 'bg-blue-600',
      'Shoulders': 'bg-amber-600',
      'Biceps': 'bg-purple-600',
      'Triceps': 'bg-pink-600',
      'Legs': 'bg-emerald-600',
      'Abs': 'bg-yellow-600',
      'Glutes': 'bg-orange-600',
    };
    return colors[muscle] || 'bg-gray-600';
  };

  // Get first letter badge - Muscle identify pannatum
  const getPrimaryMuscle = () => {
    if (exercise.primaryMuscles && exercise.primaryMuscles.length > 0) {
      return exercise.primaryMuscles[0];
    }
    return 'General';
  };

  const primaryMuscle = getPrimaryMuscle();
  const firstLetter = primaryMuscle.charAt(0).toUpperCase();

  // ============================================
  // Render
  // ============================================

  return (
    <div className="card overflow-hidden group hover:scale-105 transition-transform duration-300">
      {/* Image section */}
      <div className="relative h-48 bg-gray-700 rounded-lg overflow-hidden mb-4">
        {!imageError && exercise.imageUrl ? (
          <img
            src={exercise.imageUrl}
            alt={exercise.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
            <div className="text-center">
              <div className="text-4xl mb-2">💪</div>
              <p className="text-gray-400 text-sm">Image not available</p>
            </div>
          </div>
        )}

        {/* Overlay - Buttons show on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onViewDetails(exercise)}
            className="btn btn-primary rounded-full p-3 hover:scale-110 transition-transform"
            title="View exercise details"
          >
            <Eye size={20} />
          </button>
        </div>
      </div>

      {/* Content section */}
      <div className="space-y-3">
        {/* Title with muscle badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {/* Muscle initial badge */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${getMuscleColor(primaryMuscle)}`}>
                {firstLetter}
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {primaryMuscle}
              </span>
            </div>

            {/* Exercise name */}
            <h3 className="font-bold text-white text-lg group-hover:text-red-400 transition-colors line-clamp-2">
              {exercise.name}
            </h3>
          </div>
        </div>

        {/* Tags/Badges */}
        <div className="flex flex-wrap gap-2">
          {/* Category badge */}
          {exercise.category && (
            <span className="badge badge-secondary text-xs">
              {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
            </span>
          )}

          {/* Equipment badge */}
          {exercise.equipment && (
            <span className="badge badge-neutral text-xs">
              {exercise.equipment}
            </span>
          )}

          {/* Difficulty badge */}
          {exercise.difficulty && (
            <span className={`badge text-xs ${
              exercise.difficulty === 'beginner'
                ? 'bg-emerald-600'
                : exercise.difficulty === 'intermediate'
                ? 'bg-amber-600'
                : 'bg-red-700'
            } text-white`}>
              {exercise.difficulty}
            </span>
          )}
        </div>

        {/* Secondary muscles */}
        {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
          <div className="text-xs text-gray-400">
            <p>Also targets: <span className="text-gray-300">{exercise.secondaryMuscles.join(', ')}</span></p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 pt-2 border-t border-gray-700">
          <button
            onClick={() => onViewDetails(exercise)}
            className="flex-1 btn btn-primary rounded-lg py-2 text-sm font-semibold flex items-center justify-center gap-2"
            title="View exercise details and instructions"
          >
            <Eye size={16} />
            <span className="hidden sm:inline">Details</span>
          </button>

          <button
            onClick={() => onShuffle()}
            className="btn btn-secondary rounded-lg py-2 px-3"
            title="Shuffle exercise order"
          >
            <Shuffle size={16} />
          </button>

          <button
            onClick={() => onDelete(exercise._id)}
            className="btn bg-red-900/50 hover:bg-red-900 text-red-200 rounded-lg py-2 px-3 transition-all"
            title="Remove exercise from list"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;