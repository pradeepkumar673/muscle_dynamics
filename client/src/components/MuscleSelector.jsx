/*import React, { useState } from 'react';
import Body from 'react-body-highlighter';
import { Search, X, AlertCircle } from 'lucide-react';

const MuscleSelector = ({ muscles, selectedMuscles, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Muscle groups with colors and data mappings
  const muscleGroups = {
    // Front muscles
    'pectorals': { side: 'front', color: '#3B82F6', label: 'Chest' },
    'abdominals': { side: 'front', color: '#10B981', label: 'Abs' },
    'quadriceps': { side: 'front', color: '#8B5CF6', label: 'Quads' },
    'biceps': { side: 'front', color: '#EF4444', label: 'Biceps' },
    'shoulders': { side: 'front', color: '#F59E0B', label: 'Shoulders' },
    'forearms': { side: 'front', color: '#EC4899', label: 'Forearms' },
    
    // Back muscles
    'lats': { side: 'back', color: '#3B82F6', label: 'Lats' },
    'traps': { side: 'back', color: '#10B981', label: 'Traps' },
    'glutes': { side: 'back', color: '#8B5CF6', label: 'Glutes' },
    'hamstrings': { side: 'back', color: '#EF4444', label: 'Hamstrings' },
    'triceps': { side: 'back', color: '#F59E0B', label: 'Triceps' },
    'calves': { side: 'back', color: '#EC4899', label: 'Calves' },
    'lower back': { side: 'back', color: '#06B6D4', label: 'Lower Back' },
  };
  
  const filteredMuscles = muscles.filter(muscle => {
    const muscleInfo = muscleGroups[muscle.toLowerCase()];
    if (!muscleInfo) return false;
    
    return muscle.toLowerCase().includes(searchTerm.toLowerCase()) ||
           muscleInfo.label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleMuscleClick = (muscle) => {
    onSelect(muscle);
  };

  const handleBodyClick = (muscle) => {
    // Find the actual muscle name from our mapping
    const foundMuscle = Object.entries(muscleGroups).find(
      ([_, info]) => info.label.toLowerCase() === muscle.toLowerCase()
    );
    
    if (foundMuscle) {
      onSelect(foundMuscle[0]);
    }
  };

  const getBodyData = () => {
    const front = [];
    const back = [];
    
    selectedMuscles.forEach(muscle => {
      const info = muscleGroups[muscle.toLowerCase()];
      if (info) {
        if (info.side === 'front') {
          front.push({ 
            name: info.label, 
            color: info.color,
            intensity: 1 
          });
        } else {
          back.push({ 
            name: info.label, 
            color: info.color,
            intensity: 1 
          });
        }
      }
    });
    
    return { front, back };
  };

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Target Muscles</h2>
          <p className="text-gray-400">
            Click on muscles to select them. You can select multiple muscle groups.
          </p>
        </div>
        <div className="text-blue-500 bg-blue-500/10 p-3 rounded-lg">
          <Activity className="w-8 h-8" />
        </div>
      </div>
      
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search muscles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field w-full pl-12"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
           
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-4">Front View</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <Body
                  data={getBodyData().front}
                  onClick={handleBodyClick}
                  style={{ width: '200px', height: '400px' }}
                  colors={['#3B82F6', '#10B981', '#8B5CF6', '#EF4444']}
                  side="front"
                />
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-4">Back View</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <Body
                  data={getBodyData().back}
                  onClick={handleBodyClick}
                  style={{ width: '200px', height: '400px' }}
                  colors={['#3B82F6', '#10B981', '#8B5CF6', '#EF4444']}
                  side="back"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center text-gray-400 text-sm">
            <AlertCircle className="w-4 h-4 inline mr-2" />
            Click directly on the body or use the muscle list below
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredMuscles.map((muscle) => {
          const info = muscleGroups[muscle.toLowerCase()];
          const isSelected = selectedMuscles.includes(muscle);
          
          if (!info) return null;
          
          return (
            <button
              key={muscle}
              onClick={() => handleMuscleClick(muscle)}
              className={`
                flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300
                ${isSelected 
                  ? 'border-blue-500 bg-blue-500/10 transform scale-105' 
                  : 'border-gray-700 bg-gray-800/50 hover:border-blue-500/50 hover:bg-gray-800'
                }
              `}
              style={isSelected ? { borderColor: info.color } : {}}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: isSelected ? info.color : '#374151' }}
              >
                {info.label.charAt(0)}
              </div>
              
              <div className="text-left flex-1">
                <h4 className="font-semibold text-white capitalize">
                  {info.label}
                </h4>
                <p className="text-xs text-gray-400 capitalize">
                  {muscle}
                </p>
              </div>
              
              {isSelected && (
                <div className="text-blue-500">
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>
      {selectedMuscles.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-3">
            Selected Muscles ({selectedMuscles.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedMuscles.map((muscle) => {
              const info = muscleGroups[muscle.toLowerCase()];
              return (
                <span
                  key={muscle}
                  className="muscle-badge"
                  style={{
                    backgroundColor: `${info?.color}20`,
                    color: info?.color,
                    borderColor: `${info?.color}40`
                  }}
                >
                  {info?.label || muscle}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MuscleSelector;
*/



import React, { useState } from 'react';
import { Search, X, AlertCircle, Check } from 'lucide-react';

const MuscleSelector = ({ muscles, selectedMuscles, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Muscle groups with colors and data mappings
  const muscleGroups = {
    // Front muscles
    'pectorals': { side: 'front', color: '#3B82F6', label: 'Chest', position: 'top-32 left-1/2 transform -translate-x-1/2 w-24 h-24' },
    'abdominals': { side: 'front', color: '#10B981', label: 'Abs', position: 'top-56 left-1/2 transform -translate-x-1/2 w-20 h-16' },
    'quadriceps': { side: 'front', color: '#8B5CF6', label: 'Quads', position: 'top-80 left-1/2 transform -translate-x-1/2 w-16 h-24' },
    'biceps': { side: 'front', color: '#EF4444', label: 'Biceps', position: 'top-40 left-1/4 w-8 h-16' },
    'shoulders': { side: 'front', color: '#F59E0B', label: 'Shoulders', position: 'top-24 left-1/2 transform -translate-x-1/2 w-32 h-12' },
    'forearms': { side: 'front', color: '#EC4899', label: 'Forearms', position: 'top-56 left-1/4 w-6 h-16' },
    
    // Back muscles
    'lats': { side: 'back', color: '#3B82F6', label: 'Lats', position: 'top-40 left-1/2 transform -translate-x-1/2 w-20 h-24' },
    'traps': { side: 'back', color: '#10B981', label: 'Traps', position: 'top-20 left-1/2 transform -translate-x-1/2 w-24 h-12' },
    'glutes': { side: 'back', color: '#8B5CF6', label: 'Glutes', position: 'top-64 left-1/2 transform -translate-x-1/2 w-20 h-16' },
    'hamstrings': { side: 'back', color: '#EF4444', label: 'Hamstrings', position: 'top-80 left-1/2 transform -translate-x-1/2 w-16 h-24' },
    'triceps': { side: 'back', color: '#F59E0B', label: 'Triceps', position: 'top-40 left-3/4 w-8 h-16' },
    'calves': { side: 'back', color: '#EC4899', label: 'Calves', position: 'top-96 left-1/2 transform -translate-x-1/2 w-12 h-12' },
    'lower back': { side: 'back', color: '#06B6D4', label: 'Lower Back', position: 'top-56 left-1/2 transform -translate-x-1/2 w-24 h-12' },
  };
  
  const filteredMuscles = muscles.filter(muscle => {
    const muscleInfo = muscleGroups[muscle.toLowerCase()];
    if (!muscleInfo) return false;
    
    return muscle.toLowerCase().includes(searchTerm.toLowerCase()) ||
           muscleInfo.label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleMuscleClick = (muscle) => {
    onSelect(muscle);
  };

  // SVG Body Component
  const BodySVG = ({ side, selectedMuscles }) => {
    const isFront = side === 'front';
    
    const muscleElements = Object.entries(muscleGroups)
      .filter(([_, info]) => info.side === side)
      .map(([muscle, info]) => {
        const isSelected = selectedMuscles.includes(muscle);
        return (
          <div
            key={muscle}
            className={`absolute ${info.position} rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-110 ${
              isSelected ? 'ring-4 ring-opacity-50' : 'hover:ring-2 hover:ring-opacity-30'
            }`}
            style={{
              backgroundColor: isSelected ? info.color : `${info.color}40`,
              border: `2px solid ${info.color}`,
              zIndex: isSelected ? 10 : 1
            }}
            onClick={() => handleMuscleClick(muscle)}
            title={info.label}
          >
            {isSelected && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-black" />
              </div>
            )}
            <div className="h-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">{info.label}</span>
            </div>
          </div>
        );
      });

    return (
      <div className="relative w-64 h-96 bg-gray-800 rounded-lg p-4">
        {/* Body Outline */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isFront ? (
            // Front body SVG outline
            <svg width="200" height="400" viewBox="0 0 200 400" className="opacity-20">
              {/* Head */}
              <ellipse cx="100" cy="50" rx="30" ry="40" fill="none" stroke="#4B5563" strokeWidth="2"/>
              {/* Neck */}
              <rect x="85" y="90" width="30" height="20" fill="none" stroke="#4B5563" strokeWidth="2"/>
              {/* Torso */}
              <path d="M70,110 L130,110 L140,200 L130,290 L70,290 L60,200 Z" fill="none" stroke="#4B5563" strokeWidth="2"/>
              {/* Arms */}
              <rect x="30" y="120" width="40" height="120" rx="20" fill="none" stroke="#4B5563" strokeWidth="2"/>
              <rect x="130" y="120" width="40" height="120" rx="20" fill="none" stroke="#4B5563" strokeWidth="2"/>
              {/* Legs */}
              <rect x="70" y="290" width="20" height="110" rx="10" fill="none" stroke="#4B5563" strokeWidth="2"/>
              <rect x="110" y="290" width="20" height="110" rx="10" fill="none" stroke="#4B5563" strokeWidth="2"/>
            </svg>
          ) : (
            // Back body SVG outline
            <svg width="200" height="400" viewBox="0 0 200 400" className="opacity-20">
              {/* Head */}
              <ellipse cx="100" cy="50" rx="30" ry="40" fill="none" stroke="#4B5563" strokeWidth="2"/>
              {/* Neck */}
              <rect x="85" y="90" width="30" height="20" fill="none" stroke="#4B5563" strokeWidth="2"/>
              {/* Back */}
              <path d="M70,110 L130,110 L140,250 L130,290 L70,290 L60,250 Z" fill="none" stroke="#4B5563" strokeWidth="2"/>
              {/* Arms */}
              <rect x="30" y="120" width="40" height="120" rx="20" fill="none" stroke="#4B5563" strokeWidth="2"/>
              <rect x="130" y="120" width="40" height="120" rx="20" fill="none" stroke="#4B5563" strokeWidth="2"/>
              {/* Legs */}
              <rect x="70" y="290" width="20" height="110" rx="10" fill="none" stroke="#4B5563" strokeWidth="2"/>
              <rect x="110" y="290" width="20" height="110" rx="10" fill="none" stroke="#4B5563" strokeWidth="2"/>
            </svg>
          )}
        </div>
        
        {/* Muscle overlays */}
        {muscleElements}
      </div>
    );
  };

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Target Muscles</h2>
          <p className="text-gray-400">
            Click on muscles to select them. You can select multiple muscle groups.
          </p>
        </div>
        <div className="text-blue-500 bg-blue-500/10 p-3 rounded-lg">
          <AlertCircle className="w-8 h-8" />
        </div>
      </div>
      
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search muscles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field w-full pl-12"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      {/* Muscle Visualization */}
      <div className="mb-8">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Front Body */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-4">Front View</h3>
              <BodySVG side="front" selectedMuscles={selectedMuscles} />
            </div>
            
            {/* Back Body */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-4">Back View</h3>
              <BodySVG side="back" selectedMuscles={selectedMuscles} />
            </div>
          </div>
          
          <div className="mt-6 text-center text-gray-400 text-sm">
            <AlertCircle className="w-4 h-4 inline mr-2" />
            Click directly on the colored muscle areas or use the muscle list below
          </div>
        </div>
      </div>
      
      {/* Muscle Selection Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredMuscles.map((muscle) => {
          const info = muscleGroups[muscle.toLowerCase()];
          const isSelected = selectedMuscles.includes(muscle);
          
          if (!info) return null;
          
          return (
            <button
              key={muscle}
              onClick={() => handleMuscleClick(muscle)}
              className={`
                flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300
                ${isSelected 
                  ? 'border-blue-500 bg-blue-500/10 transform scale-105' 
                  : 'border-gray-700 bg-gray-800/50 hover:border-blue-500/50 hover:bg-gray-800'
                }
              `}
              style={isSelected ? { borderColor: info.color } : {}}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: isSelected ? info.color : '#374151' }}
              >
                {info.label.charAt(0)}
              </div>
              
              <div className="text-left flex-1">
                <h4 className="font-semibold text-white capitalize">
                  {info.label}
                </h4>
                <p className="text-xs text-gray-400 capitalize">
                  {muscle}
                </p>
              </div>
              
              {isSelected && (
                <div className="text-blue-500">
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Selected Muscles Summary */}
      {selectedMuscles.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-3">
            Selected Muscles ({selectedMuscles.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedMuscles.map((muscle) => {
              const info = muscleGroups[muscle.toLowerCase()];
              return (
                <span
                  key={muscle}
                  className="muscle-badge"
                  style={{
                    backgroundColor: `${info?.color}20`,
                    color: info?.color,
                    borderColor: `${info?.color}40`
                  }}
                >
                  {info?.label || muscle}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MuscleSelector;