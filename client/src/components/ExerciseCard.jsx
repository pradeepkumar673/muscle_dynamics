import React, { useState } from 'react';
import { 
  Check, 
  Trash2, 
  ExternalLink, 
  Info, 
  Dumbbell,
  Activity,
  Star,
  Clock
} from 'lucide-react';

const ExerciseCard = ({ 
  exercise, 
  isSelected, 
  muscleInitial, 
  muscleColor,
  onSelect, 
  onViewDetail 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get equipment icon
  const getEquipmentIcon = (equipment) => {
    const icons = {
      'dumbbell': '🏋️',
      'barbell': '🏋️‍♂️',
      'machine': '🏗️',
      'cable': '🔗',
      'kettlebell': '🥛',
      'body only': '💪',
      'bands': '🔄',
    };
    return icons[equipment.toLowerCase()] || '🏋️';
  };
  
  // Format difficulty stars
  const renderDifficulty = (difficulty) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= difficulty ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl border-2 transition-all duration-300
        ${isSelected 
          ? 'border-red-500 bg-gradient-to-br from-gray-900 to-gray-800 transform scale-[1.02] shadow-2xl' 
          : 'border-gray-800 bg-gray-900 hover:border-red-500/50 hover:shadow-xl'
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selection Indicator */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onSelect}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
            ${isSelected 
              ? 'bg-red-500 text-white shadow-lg' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }
          `}
        >
          {isSelected ? <Check className="w-5 h-5" /> : '+'}
        </button>
      </div>
      
      {/* Muscle Initial Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl
          ${muscleColor}
          shadow-lg
        `}>
          {muscleInitial}
        </div>
      </div>
      
      {/* Exercise Image */}
      <div className="h-48 overflow-hidden bg-gray-800 relative">
        {exercise.images && exercise.images[0] ? (
          <img
            src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.images[0]}`}
            alt={exercise.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x300/1f2937/9ca3af?text=${encodeURIComponent(exercise.name)}`;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <Dumbbell className="w-16 h-16 text-gray-700" />
          </div>
        )}
        
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
      </div>
      
      {/* Exercise Content */}
      <div className="p-6">
        {/* Title and Equipment */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-white line-clamp-2">
              {exercise.name}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Dumbbell className="w-4 h-4" />
              {exercise.equipment}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Activity className="w-4 h-4" />
              {exercise.category}
            </span>
          </div>
        </div>
        
        {/* Primary Muscles */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {exercise.primaryMuscles?.slice(0, 3).map((muscle) => (
              <span
                key={muscle}
                className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
              >
                {muscle}
              </span>
            ))}
            {exercise.primaryMuscles?.length > 3 && (
              <span className="px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">
                +{exercise.primaryMuscles.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        {/* Difficulty and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {renderDifficulty(exercise.difficulty || 3)}
            </div>
            
            {exercise.force && (
              <span className={`
                px-3 py-1 text-xs rounded-full font-medium
                ${exercise.force === 'push' 
                  ? 'bg-red-500/20 text-red-300' 
                  : 'bg-blue-500/20 text-blue-300'
                }
              `}>
                {exercise.force.toUpperCase()}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onViewDetail}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-300"
              title="View Details"
            >
              <Info className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name)}`, '_blank')}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-300"
              title="Search on YouTube"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Instructions Preview */}
        <div className="mt-4">
          <p className="text-sm text-gray-400 line-clamp-2">
            {exercise.instructions?.[0] || 'No instructions available.'}
          </p>
        </div>
      </div>
      
      {/* Hover Effect */}
      {isHovered && !isSelected && (
        <div className="absolute inset-0 border-2 border-red-500/30 rounded-xl pointer-events-none" />
      )}
    </div>
  );
};

export default ExerciseCard;