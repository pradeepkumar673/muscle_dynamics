// ===================================
// 💪 Exercise List Component
// ===================================
// Step 3 - Display filtered exercises

import React, { useState } from 'react';
import { Shuffle, ArrowRight, ChevronLeft } from 'lucide-react';
import ExerciseCard from './ExerciseCard';
import ExerciseDetailModal from './ExerciseDetailModal';

const ExerciseList = ({
  exercises,
  selectedEquipment,
  selectedMuscles,
  onShuffle,
  onDelete,
  onGenerate,
  onBack
}) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ============================================
  // Handlers
  // ============================================

  const handleViewDetails = (exercise) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExercise(null);
  };

  // ============================================
  // Render
  // ============================================

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Your Exercise Plan
        </h2>
        <p className="text-gray-400 text-lg">
          {exercises.length} exercises found for your selected criteria
        </p>
      </div>

      {/* Selection summary */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {/* Equipment selected */}
          <div>
            <p className="text-gray-400 text-sm font-medium mb-2">Equipment:</p>
            <div className="flex flex-wrap gap-2">
              {selectedEquipment.map((eq) => (
                <span key={eq} className="badge bg-red-600 text-white">
                  {eq}
                </span>
              ))}
            </div>
          </div>

          {/* Muscles selected */}
          <div>
            <p className="text-gray-400 text-sm font-medium mb-2">Target Muscles:</p>
            <div className="flex flex-wrap gap-2">
              {selectedMuscles.slice(0, 3).map((muscle) => (
                <span key={muscle} className="badge bg-blue-600 text-white">
                  {muscle}
                </span>
              ))}
              {selectedMuscles.length > 3 && (
                <span className="badge bg-gray-700 text-gray-300">
                  +{selectedMuscles.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions bar */}
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={onShuffle}
          className="btn btn-secondary px-6 py-3 rounded-lg flex items-center gap-2 font-semibold hover-lift"
          title="Randomize exercise order"
        >
          <Shuffle size={20} />
          <span>Shuffle Order</span>
        </button>

        <button
          onClick={onGenerate}
          disabled={exercises.length === 0}
          className={`btn px-6 py-3 rounded-lg flex items-center gap-2 font-semibold hover-lift transition-all ${
            exercises.length === 0
              ? 'btn-disabled'
              : 'btn-primary'
          }`}
          title="Generate workout routine"
        >
          <span>Generate Workout</span>
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Exercise grid */}
      {exercises.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise._id}
              exercise={exercise}
              onDelete={onDelete}
              onShuffle={onShuffle}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤔</div>
          <p className="text-gray-400 text-lg">No exercises found for your selection</p>
          <p className="text-gray-500 text-sm mt-2">Try different muscles or equipment</p>
        </div>
      )}

      {/* Stats */}
      {exercises.length > 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
          <p className="text-gray-300 text-lg">
            <span className="font-bold text-red-600">{exercises.length}</span> exercises ready for your workout
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Click on any exercise to see detailed instructions and form tips
          </p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-4 justify-center pt-4">
        <button
          onClick={onBack}
          className="btn btn-secondary px-6 py-3 rounded-lg flex items-center gap-2 font-semibold"
          title="Go back to muscle selection"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ExerciseList;