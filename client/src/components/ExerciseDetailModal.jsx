import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw,
  Dumbbell,
  Activity,
  Target,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Star
} from 'lucide-react';

const ExerciseDetailModal = ({ exercise, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!exercise) return null;

  const equipmentIcons = {
    'dumbbell': '🏋️',
    'barbell': '🏋️‍♂️',
    'machine': '🏗️',
    'cable': '🔗',
    'kettlebell': '🥛',
    'body only': '💪',
    'bands': '🔄',
  };

  const getEquipmentIcon = (equipment) => {
    return equipmentIcons[equipment.toLowerCase()] || '🏋️';
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? (exercise.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === (exercise.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev === 0 ? exercise.instructions.length - 1 : prev - 1);
  };

  const handleNextStep = () => {
    setCurrentStep(prev => prev === exercise.instructions.length - 1 ? 0 : prev + 1);
  };

  const imageUrl = exercise.images && exercise.images[currentImageIndex]
    ? `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.images[currentImageIndex]}`
    : `https://via.placeholder.com/600x400/1f2937/9ca3af?text=${encodeURIComponent(exercise.name)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-300"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">{exercise.name}</h2>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Dumbbell className="w-5 h-5" />
                  <span>{exercise.equipment}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-400">
                  <Activity className="w-5 h-5" />
                  <span className="capitalize">{exercise.category}</span>
                </div>
                
                {exercise.level && (
                  <div className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-sm rounded-full">
                    {exercise.level}
                  </div>
                )}
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {exercise.primaryMuscles?.map((muscle) => (
                  <span
                    key={muscle}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30"
                  >
                    {muscle}
                  </span>
                ))}
                
                {exercise.secondaryMuscles?.map((muscle) => (
                  <span
                    key={muscle}
                    className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full border border-green-500/30"
                  >
                    {muscle}
                  </span>
                ))}
                
                {exercise.mechanic && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30">
                    {exercise.mechanic}
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-4xl mb-2">
                {getEquipmentIcon(exercise.equipment)}
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= (exercise.difficulty || 3) 
                        ? 'text-yellow-500 fill-yellow-500' 
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column - Images */}
            <div>
              <div className="relative rounded-xl overflow-hidden bg-gray-800 mb-4">
                <img
                  src={imageUrl}
                  alt={`${exercise.name} - Step ${currentImageIndex + 1}`}
                  className="w-full h-64 object-cover"
                />
                
                {/* Image Navigation */}
                {exercise.images && exercise.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {exercise.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'bg-red-500' 
                              : 'bg-gray-600 hover:bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              {/* YouTube Search Button */}
              <button
                onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name)}`, '_blank')}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                Watch Tutorial on YouTube
              </button>
            </div>
            
            {/* Right Column - Instructions */}
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-red-500" />
                  Instructions
                </h3>
                
                {/* Steps Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={handlePrevStep}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <div className="text-center">
                    <span className="text-sm text-gray-400">Step</span>
                    <div className="text-2xl font-bold text-white">
                      {currentStep + 1} / {exercise.instructions.length}
                    </div>
                  </div>
                  
                  <button
                    onClick={handleNextStep}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Current Instruction */}
                <div className="bg-gray-800 rounded-xl p-6 min-h-[150px]">
                  <p className="text-white text-lg">
                    {exercise.instructions[currentStep]}
                  </p>
                </div>
                
                {/* Steps Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {exercise.instructions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentStep 
                          ? 'bg-red-500' 
                          : 'bg-gray-600 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Play/Pause Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-300"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>
                
                <button
                  onClick={() => setCurrentStep(0)}
                  className="p-4 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors duration-300"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">Exercise Details</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Force Type</div>
                <div className="text-white font-semibold capitalize">
                  {exercise.force || 'N/A'}
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Mechanic</div>
                <div className="text-white font-semibold capitalize">
                  {exercise.mechanic || 'N/A'}
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Level</div>
                <div className="text-white font-semibold capitalize">
                  {exercise.level || 'Intermediate'}
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Rating</div>
                <div className="text-white font-semibold">
                  {(exercise.rating || 4).toFixed(1)}/5
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-gray-800 bg-gray-900/50 rounded-b-2xl">
          <div className="flex justify-between items-center">
            <div className="text-gray-400 text-sm">
              Exercise ID: {exercise._id?.slice(-8) || 'N/A'}
            </div>
            
            <button
              onClick={onClose}
              className="btn-primary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailModal;