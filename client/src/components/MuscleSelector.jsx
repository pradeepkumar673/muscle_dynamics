// ===================================
// 💪 Muscle Selector Component
// ===================================
// Step 2 - Interactive anatomy map + muscle selection

import React, { useState } from 'react';
import { Click2, ArrowRight, Info } from 'lucide-react';

const MuscleSelector = ({
  muscleList,
  selectedMuscles,
  onSelect,
  onContinue,
  loading
}) => {
  // ============================================
  // Muscle color mapping
  // ============================================

  const muscleColors = {
    'Chest': '#DC2626',      // red-600
    'Back': '#3B82F6',       // blue-500
    'Shoulders': '#F59E0B',  // amber-500
    'Biceps': '#8B5CF6',     // violet-500
    'Triceps': '#EC4899',    // pink-500
    'Forearms': '#14B8A6',   // teal-500
    'Legs': '#10B981',       // emerald-500
    'Quadriceps': '#06B6D4', // cyan-500
    'Hamstrings': '#A855F7', // purple-500
    'Glutes': '#F97316',     // orange-500
    'Calves': '#6366F1',     // indigo-500
    'Abs': '#FBBF24',        // amber-400
    'Obliques': '#FB923C',   // orange-400
    'Lats': '#0EA5E9',       // sky-500
    'Traps': '#8B5CF6',      // violet-500
  };

  // Muscle groups organize pannatum (Front/Back/Full)
  const muscleGroups = {
    'Front': [
      'Chest', 'Abs', 'Quadriceps', 'Biceps', 'Forearms', 'Calves', 'Shoulders'
    ],
    'Back': [
      'Back', 'Lats', 'Traps', 'Hamstrings', 'Glutes', 'Triceps', 'Calves'
    ],
    'Full Body': [
      'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Forearms',
      'Abs', 'Obliques', 'Legs', 'Quadriceps', 'Hamstrings', 'Glutes', 'Calves', 'Lats', 'Traps'
    ]
  };

  const [viewMode, setViewMode] = useState('Front');

  // ============================================
  // Muscle toggle handler
  // ============================================

  const toggleMuscle = (muscle) => {
    if (selectedMuscles.includes(muscle)) {
      onSelect(selectedMuscles.filter(m => m !== muscle));
    } else {
      onSelect([...selectedMuscles, muscle]);
    }
  };

  // Get color for muscle
  const getMuscleColor = (muscle) => {
    return muscleColors[muscle] || '#6B7280';
  };

  // ============================================
  // Simple SVG Anatomy Map
  // ============================================

  const AnatomyMap = ({ view }) => {
    const width = 200;
    const height = 400;

    if (view === 'Front') {
      return (
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-sm mx-auto"
          style={{ backgroundColor: '#1F2937', borderRadius: '12px' }}
        >
          {/* Head */}
          <circle cx={width / 2} cy={30} r={15} fill="#666" opacity="0.5" />

          {/* Chest - Clickable */}
          {['Chest'].map(muscle => (
            <rect
              key={muscle}
              x={width / 2 - 30}
              y={50}
              width={60}
              height={70}
              fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
              opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
              onClick={() => toggleMuscle(muscle)}
              cursor="pointer"
              style={{ transition: 'all 0.3s' }}
              rx="4"
            />
          ))}

          {/* Shoulders - Left */}
          {view === 'Front' && ['Shoulders'].map(muscle => (
            <g key={`${muscle}-left`}>
              <ellipse
                cx={width / 2 - 40}
                cy={60}
                rx={15}
                ry={20}
                fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
                opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
                onClick={() => toggleMuscle(muscle)}
                cursor="pointer"
                style={{ transition: 'all 0.3s' }}
              />
            </g>
          ))}

          {/* Shoulders - Right */}
          {view === 'Front' && ['Shoulders'].map(muscle => (
            <g key={`${muscle}-right`}>
              <ellipse
                cx={width / 2 + 40}
                cy={60}
                rx={15}
                ry={20}
                fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
                opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
                onClick={() => toggleMuscle(muscle)}
                cursor="pointer"
                style={{ transition: 'all 0.3s' }}
              />
            </g>
          ))}

          {/* Biceps - Left */}
          {['Biceps'].map(muscle => (
            <rect
              key={`${muscle}-left`}
              x={width / 2 - 55}
              y={70}
              width={20}
              height={60}
              fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
              opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
              onClick={() => toggleMuscle(muscle)}
              cursor="pointer"
              style={{ transition: 'all 0.3s' }}
              rx="3"
            />
          ))}

          {/* Triceps - Right */}
          {['Triceps'].map(muscle => (
            <rect
              key={`${muscle}-right`}
              x={width / 2 + 35}
              y={70}
              width={20}
              height={60}
              fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
              opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
              onClick={() => toggleMuscle(muscle)}
              cursor="pointer"
              style={{ transition: 'all 0.3s' }}
              rx="3"
            />
          ))}

          {/* Forearms - Left */}
          {['Forearms'].map(muscle => (
            <rect
              key={`${muscle}-left`}
              x={width / 2 - 55}
              y={130}
              width={18}
              height={50}
              fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
              opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
              onClick={() => toggleMuscle(muscle)}
              cursor="pointer"
              style={{ transition: 'all 0.3s' }}
              rx="3"
            />
          ))}

          {/* Forearms - Right */}
          {['Forearms'].map(muscle => (
            <rect
              key={`${muscle}-right`}
              x={width / 2 + 37}
              y={130}
              width={18}
              height={50}
              fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
              opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
              onClick={() => toggleMuscle(muscle)}
              cursor="pointer"
              style={{ transition: 'all 0.3s' }}
              rx="3"
            />
          ))}

          {/* Abs */}
          {['Abs'].map(muscle => (
            <rect
              key={muscle}
              x={width / 2 - 20}
              y={120}
              width={40}
              height={50}
              fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
              opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
              onClick={() => toggleMuscle(muscle)}
              cursor="pointer"
              style={{ transition: 'all 0.3s' }}
              rx="3"
            />
          ))}

          {/* Quadriceps */}
          {['Quadriceps'].map(muscle => (
            <rect
              key={muscle}
              x={width / 2 - 30}
              y={170}
              width={60}
              height={80}
              fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
              opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
              onClick={() => toggleMuscle(muscle)}
              cursor="pointer"
              style={{ transition: 'all 0.3s' }}
              rx="4"
            />
          ))}

          {/* Calves */}
          {['Calves'].map(muscle => (
            <rect
              key={muscle}
              x={width / 2 - 30}
              y={250}
              width={60}
              height={60}
              fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
              opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
              onClick={() => toggleMuscle(muscle)}
              cursor="pointer"
              style={{ transition: 'all 0.3s' }}
              rx="4"
            />
          ))}

          {/* Label */}
          <text
            x={width / 2}
            y={height - 5}
            textAnchor="middle"
            fill="#9CA3AF"
            fontSize="12"
          >
            Front View - Click to select
          </text>
        </svg>
      );
    } else if (view === 'Back') {
      return (
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-sm mx-auto"
          style={{ backgroundColor: '#1F2937', borderRadius: '12px' }}
        >
          {/* Head */}
          <circle cx={width / 2} cy={30} r={15} fill="#666" opacity="0.5" />

          {/* Back */}
          {['Back'].map(muscle => (
            <rect
              key={muscle}
              x={width / 2 - 30}
              y={50}
              width={60}
              height={80}
              fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
              opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
              onClick={() => toggleMuscle(muscle)}
              cursor="pointer"
              style={{ transition: 'all 0.3s' }}
              rx="4"
            />
          ))}

          {/* Traps */}
          {['Traps'].map(muscle => (
            <polygon
              key={muscle}
              points={`${width / 2},50 ${width / 2 - 40},80 ${width / 2 + 40},80`}
              fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
              opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
              onClick={() => toggleMuscle(muscle)}
              cursor="pointer"
              style={{ transition: 'all 0.3s' }}
            />
          ))}

          {/* Lats */}
          {['Lats'].map(muscle => (
            <g key={muscle}>
              <ellipse
                cx={width / 2 - 40}
                cy={110}
                rx={15}
                ry={40}
                fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
                opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
                onClick={() => toggleMuscle(muscle)}
                cursor="pointer"
                style={{ transition: 'all 0.3s' }}
              />
              <ellipse
                cx={width / 2 + 40}
                cy={110}
                rx={15}
                ry={40}
                fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
                opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
                onClick={() => toggleMuscle(muscle)}
                cursor="pointer"
                style={{ transition: 'all 0.3s' }}
              />
            </g>
          ))}

          {/* Triceps - Back view */}
          {['Triceps'].map(muscle => (
            <g key={muscle}>
              <rect
                x={width / 2 - 55}
                y={70}
                width={20}
                height={60}
                fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
                opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
                onClick={() => toggleMuscle(muscle)}
                cursor="pointer"
                style={{ transition: 'all 0.3s' }}
                rx="3"
              />
              <rect
                x={width / 2 + 35}
                y={70}
                width={20}
                height={60}
                fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
                opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
                onClick={() => toggleMuscle(muscle)}
                cursor="pointer"
                style={{ transition: 'all 0.3s' }}
                rx="3"
              />
            </g>
          ))}

          {/* Hamstrings */}
          {['Hamstrings'].map(muscle => (
            <rect
              key={muscle}
              x={width / 2 - 30}
              y={170}
              width={60}
              height={60}
              fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
              opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
              onClick={() => toggleMuscle(muscle)}
              cursor="pointer"
              style={{ transition: 'all 0.3s' }}
              rx="4"
            />
          ))}

          {/* Glutes */}
          {['Glutes'].map(muscle => (
            <ellipse
              key={muscle}
              cx={width / 2}
              cy={165}
              rx={35}
              ry={25}
              fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
              opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
              onClick={() => toggleMuscle(muscle)}
              cursor="pointer"
              style={{ transition: 'all 0.3s' }}
            />
          ))}

          {/* Calves - Back */}
          {['Calves'].map(muscle => (
            <rect
              key={muscle}
              x={width / 2 - 30}
              y={230}
              width={60}
              height={60}
              fill={selectedMuscles.includes(muscle) ? getMuscleColor(muscle) : '#444'}
              opacity={selectedMuscles.includes(muscle) ? 0.8 : 0.4}
              onClick={() => toggleMuscle(muscle)}
              cursor="pointer"
              style={{ transition: 'all 0.3s' }}
              rx="4"
            />
          ))}

          {/* Label */}
          <text
            x={width / 2}
            y={height - 5}
            textAnchor="middle"
            fill="#9CA3AF"
            fontSize="12"
          >
            Back View - Click to select
          </text>
        </svg>
      );
    }

    return null;
  };

  // ============================================
  // Render
  // ============================================

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Select Target Muscles
        </h2>
        <p className="text-gray-400 text-lg">
          Click on the anatomy map or use the buttons below to select which muscles you want to train.
        </p>
        <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-600 text-blue-200 px-4 py-2 rounded-lg text-sm">
          <Info size={16} />
          <span>Select at least one muscle group to continue</span>
        </div>
      </div>

      {/* View toggle buttons */}
      <div className="flex gap-3 justify-center flex-wrap">
        {['Front', 'Back'].map(view => (
          <button
            key={view}
            onClick={() => setViewMode(view)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              viewMode === view
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/50'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {view} View
          </button>
        ))}
      </div>

      {/* Anatomy Map */}
      <div className="flex justify-center bg-gray-800 rounded-xl p-8 border border-gray-700">
        <AnatomyMap view={viewMode} />
      </div>

      {/* Muscle button grid */}
      <div className="space-y-4">
        <h3 className="font-semibold text-white">Or select from list:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {muscleGroups[viewMode].map((muscle) => (
            <button
              key={muscle}
              onClick={() => toggleMuscle(muscle)}
              className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all hover-lift ${
                selectedMuscles.includes(muscle)
                  ? 'bg-red-600 text-white border border-red-500 shadow-lg shadow-red-600/50'
                  : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-red-600'
              }`}
              style={{
                backgroundColor: selectedMuscles.includes(muscle)
                  ? getMuscleColor(muscle)
                  : undefined
              }}
            >
              {muscle}
            </button>
          ))}
        </div>
      </div>

      {/* Selected muscles display */}
      {selectedMuscles.length > 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Selected Muscles:</h3>
            <span className="badge bg-red-600 text-white">
              {selectedMuscles.length} selected
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedMuscles.map((muscle) => (
              <div
                key={muscle}
                className="badge text-white cursor-pointer hover-lift transition-all"
                style={{ backgroundColor: getMuscleColor(muscle) }}
                onClick={() => toggleMuscle(muscle)}
                title={`Click to remove ${muscle}`}
              >
                {muscle} ✕
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Continue button */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={onContinue}
          disabled={selectedMuscles.length === 0 || loading}
          className={`btn px-8 py-3 text-lg font-semibold rounded-lg flex items-center gap-3 transition-all ${
            selectedMuscles.length === 0 || loading
              ? 'btn-disabled'
              : 'btn-primary hover:shadow-lg hover:shadow-red-600/50'
          }`}
        >
          <span>Find Exercises</span>
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Info */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-gray-300 text-sm space-y-2">
        <h4 className="font-semibold text-white mb-3">💡 Muscle Selection Tips:</h4>
        <ul className="space-y-1 list-disc list-inside">
          <li>Click on muscle areas in the anatomy map or use the buttons</li>
          <li>Multi-select: Choose multiple muscles for a full-body workout</li>
          <li>More selections = More exercise variety</li>
          <li>Exercises will target primary and secondary muscles</li>
        </ul>
      </div>
    </div>
  );
};

export default MuscleSelector;