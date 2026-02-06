// ===================================
// 💪 Exercise Detail Modal Component
// ===================================
// Full exercise details with instructions

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';

const ExerciseDetailModal = ({ exercise, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!exercise) return null;

  // ============================================
  // Handlers
  // ============================================

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < (exercise.allImages?.length || 0) - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleSpeakInstructions = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  // Get color for muscle badge
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
      'Forearms': 'bg-teal-600',
      'Hamstrings': 'bg-violet-600',
      'Lats': 'bg-sky-600',
      'Calves': 'bg-indigo-600',
      'Traps': 'bg-purple-600',
    };
    return colors[muscle] || 'bg-gray-600';
  };

  // ============================================
  // Render
  // ============================================

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Modal container */}
      <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700">
        {/* Header with close button */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">{exercise.name}</h1>
          <button
            onClick={onClose}
            className="btn bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-all"
            title="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Image carousel */}
          {exercise.allImages && exercise.allImages.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-white">Exercise Form</h2>
              <div className="relative bg-gray-700 rounded-lg overflow-hidden group">
                <img
                  src={exercise.allImages[currentImageIndex]}
                  alt={`${exercise.name} - Step ${currentImageIndex + 1}`}
                  className="w-full h-96 object-cover"
                />

                {/* Navigation buttons */}
                {exercise.allImages.length > 1 && (
                  <>
                    {/* Previous button */}
                    <button
                      onClick={handlePrevImage}
                      disabled={currentImageIndex === 0}
                      className="absolute left-4 top-1/2 -translate-y-1/2 btn bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all disabled:opacity-30"
                    >
                      <ChevronLeft size={24} />
                    </button>

                    {/* Next button */}
                    <button
                      onClick={handleNextImage}
                      disabled={currentImageIndex === exercise.allImages.length - 1}
                      className="absolute right-4 top-1/2 -translate-y-1/2 btn bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all disabled:opacity-30"
                    >
                      <ChevronRight size={24} />
                    </button>

                    {/* Image counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {currentImageIndex + 1} / {exercise.allImages.length}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Info section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Equipment */}
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Equipment</p>
              <p className="font-semibold text-white">{exercise.equipment}</p>
            </div>

            {/* Category */}
            {exercise.category && (
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Category</p>
                <p className="font-semibold text-white capitalize">{exercise.category}</p>
              </div>
            )}

            {/* Difficulty */}
            {exercise.difficulty && (
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Difficulty</p>
                <p className={`font-semibold capitalize ${
                  exercise.difficulty === 'beginner'
                    ? 'text-emerald-400'
                    : exercise.difficulty === 'intermediate'
                    ? 'text-amber-400'
                    : 'text-red-400'
                }`}>
                  {exercise.difficulty}
                </p>
              </div>
            )}

            {/* Recommended Reps */}
            {exercise.reps && (
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Reps</p>
                <p className="font-semibold text-white">{exercise.reps}</p>
              </div>
            )}

            {/* Sets */}
            {exercise.sets && (
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Sets</p>
                <p className="font-semibold text-white">{exercise.sets}</p>
              </div>
            )}

            {/* Rest time */}
            {exercise.restSeconds && (
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Rest Time</p>
                <p className="font-semibold text-white">{exercise.restSeconds}s</p>
              </div>
            )}
          </div>

          {/* Muscles targeted */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Muscles Targeted</h2>
            <div className="space-y-2">
              {/* Primary muscles */}
              {exercise.primaryMuscles && exercise.primaryMuscles.length > 0 && (
                <div>
                  <p className="text-gray-400 text-sm mb-2 font-medium">Primary:</p>
                  <div className="flex flex-wrap gap-2">
                    {exercise.primaryMuscles.map((muscle) => (
                      <span
                        key={muscle}
                        className={`badge text-white ${getMuscleColor(muscle)}`}
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Secondary muscles */}
              {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
                <div>
                  <p className="text-gray-400 text-sm mb-2 font-medium">Secondary:</p>
                  <div className="flex flex-wrap gap-2">
                    {exercise.secondaryMuscles.map((muscle) => (
                      <span
                        key={muscle}
                        className="badge bg-gray-700 text-gray-300"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          {exercise.instructions && exercise.instructions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Step-by-Step Instructions</h2>
                <button
                  onClick={() => handleSpeakInstructions(exercise.instructions.join('. '))}
                  className="btn bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-2 flex items-center gap-2 text-sm"
                  title="Listen to instructions"
                >
                  <Volume2 size={16} />
                  <span className="hidden sm:inline">Listen</span>
                </button>
              </div>

              <ol className="space-y-3">
                {exercise.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-4 bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer group"
                    onClick={() => handleSpeakInstructions(instruction)}
                    title="Click to hear this step"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 text-sm flex-1">
                      {instruction}
                    </p>
                    <Volume2
                      size={16}
                      className="text-gray-500 group-hover:text-red-500 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
                    />
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Description */}
          {exercise.description && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-white">Description</h2>
              <p className="text-gray-300 leading-relaxed">
                {exercise.description}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 px-6 py-4 flex justify-center bg-gray-800">
          <button
            onClick={onClose}
            className="btn btn-primary px-8 py-2 rounded-lg font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailModal;