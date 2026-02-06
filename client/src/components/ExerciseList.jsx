import React from 'react';
import ExerciseCard from './ExerciseCard';
import { Shuffle, Filter, Loader2, AlertCircle } from 'lucide-react';

const ExerciseList = ({ 
  exercises, 
  selectedExercises, 
  onSelect, 
  onShuffle, 
  onViewDetail,
  loading 
}) => {
  
  const muscleInitials = {
    'pectorals': 'C',
    'abdominals': 'A',
    'quadriceps': 'Q',
    'biceps': 'B',
    'shoulders': 'S',
    'lats': 'L',
    'traps': 'T',
    'glutes': 'G',
    'hamstrings': 'H',
    'triceps': 'T',
    'calves': 'C',
    'forearms': 'F',
    'lower back': 'LB'
  };

  const getMuscleInitial = (primaryMuscles) => {
    if (!primaryMuscles || primaryMuscles.length === 0) return '?';
    const firstMuscle = primaryMuscles[0].toLowerCase();
    return muscleInitials[firstMuscle] || firstMuscle.charAt(0).toUpperCase();
  };

  const getMuscleColor = (primaryMuscles) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500',
      'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    
    if (!primaryMuscles || primaryMuscles.length === 0) return 'bg-gray-500';
    
    const firstMuscle = primaryMuscles[0];
    const hash = firstMuscle.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  if (loading) {
    return (
      <div className="card flex flex-col items-center justify-center py-16">
        <Loader2 className="w-12 h-12 text-red-500 animate-spin mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Loading Exercises</h3>
        <p className="text-gray-400">Fetching the best exercises for your selection...</p>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="card text-center py-16">
        <AlertCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No Exercises Found</h3>
        <p className="text-gray-400 mb-6">
          Try selecting different equipment or muscle groups
        </p>
        <button
          onClick={onShuffle}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Shuffle className="w-5 h-5" />
          Try Random Exercises
        </button>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Select Exercises</h2>
          <p className="text-gray-400">
            Choose exercises for your workout. Select at least {Math.max(3, exercises.length / 5)} exercises.
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="text-sm text-gray-400">
            Showing {exercises.length} exercises
          </div>
          <button
            onClick={onShuffle}
            className="btn-secondary flex items-center gap-2"
          >
            <Shuffle className="w-5 h-5" />
            Shuffle
          </button>
        </div>
      </div>
      
      {/* Selected Count */}
      <div className="mb-6 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-400">Selected: </span>
            <span className="text-white font-bold text-xl">
              {selectedExercises.length}
            </span>
            <span className="text-gray-400"> / {Math.max(5, Math.min(15, exercises.length))} recommended</span>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-red-500" />
            <span className="text-sm text-gray-400">
              {selectedExercises.length >= 5 ? '✅ Ready to generate' : 'Select more exercises'}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
            style={{ width: `${Math.min(100, (selectedExercises.length / 10) * 100)}%` }}
          />
        </div>
      </div>
      
      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.slice(0, 12).map((exercise) => (
          <ExerciseCard
            key={exercise._id}
            exercise={exercise}
            isSelected={selectedExercises.some(e => e._id === exercise._id)}
            muscleInitial={getMuscleInitial(exercise.primaryMuscles)}
            muscleColor={getMuscleColor(exercise.primaryMuscles)}
            onSelect={() => onSelect(exercise)}
            onViewDetail={() => onViewDetail(exercise)}
          />
        ))}
      </div>
      
      {/* Load More Button (if more exercises available) */}
      {exercises.length > 12 && (
        <div className="mt-8 text-center">
          <button className="btn-secondary">
            Load More ({exercises.length - 12} more)
          </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseList;