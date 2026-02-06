// ===================================
// 💪 Equipment Selector Component
// ===================================
// Step 1 - Gym equipment selection with icons

import React from 'react';
import {
  Dumbbell,
  Weight,
  Zap,
  Couch,
  Wind,
  Circle,
  ArrowRight,
  Info
} from 'lucide-react';

const EquipmentSelector = ({
  equipmentList,
  selectedEquipment,
  onSelect,
  onContinue
}) => {
  // ============================================
  // Equipment icon mapping
  // ============================================

  const equipmentIcons = {
    'Dumbbell': Dumbbell,
    'Barbell': Weight,
    'Kettlebell': Circle,
    'Machine': Zap,
    'Cable': Wind,
    'Bench': Couch,
    'Bodyweight': Circle,
    'Medicine Ball': Circle,
    'EZ Bar': Weight,
    'Resistance Band': Wind,
    'Smith Machine': Zap,
    'Foam Roll': Circle,
    'Pull-up Bar': Circle,
    'Trap Bar': Weight,
  };

  // Get icon for equipment - Default use pannatum
  const getIcon = (equipment) => {
    const Icon = equipmentIcons[equipment] || Dumbbell;
    return Icon;
  };

  // ============================================
  // Render
  // ============================================

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Choose Your Equipment
        </h2>
        <p className="text-gray-400 text-lg">
          Select the gym equipment available to you. You can choose multiple options.
        </p>
        <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-600 text-blue-200 px-4 py-2 rounded-lg text-sm">
          <Info size={16} />
          <span>Select at least one equipment to continue</span>
        </div>
      </div>

      {/* Equipment grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {equipmentList.length > 0 ? (
          equipmentList.map((equipment) => {
            const Icon = getIcon(equipment);
            const isSelected = selectedEquipment.includes(equipment);

            return (
              <button
                key={equipment}
                onClick={() => onSelect(equipment)}
                className={`card-sm group cursor-pointer flex flex-col items-center justify-center gap-3 py-6 transition-all duration-300 ${
                  isSelected
                    ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/50'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-red-600'
                }`}
                title={`Select ${equipment}`}
              >
                {/* Icon */}
                <div className={`p-3 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-red-700'
                    : 'bg-gray-700 group-hover:bg-red-600/20'
                }`}>
                  <Icon size={28} />
                </div>

                {/* Label */}
                <p className="font-semibold text-sm text-center leading-tight">
                  {equipment}
                </p>

                {/* Checkmark for selected */}
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-white text-red-600 w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    ✓
                  </div>
                )}
              </button>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400">Loading equipment options...</p>
          </div>
        )}
      </div>

      {/* Selected summary */}
      {selectedEquipment.length > 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-white">Selected Equipment:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedEquipment.map((equipment) => (
              <div
                key={equipment}
                className="badge bg-red-600 text-white hover-lift cursor-pointer"
                onClick={() => onSelect(equipment)}
                title={`Click to remove ${equipment}`}
              >
                {equipment} ✕
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Continue button */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={onContinue}
          disabled={selectedEquipment.length === 0}
          className={`btn px-8 py-3 text-lg font-semibold rounded-lg flex items-center gap-3 transition-all ${
            selectedEquipment.length === 0
              ? 'btn-disabled'
              : 'btn-primary hover:shadow-lg hover:shadow-red-600/50'
          }`}
        >
          <span>Continue</span>
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Info section */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-gray-300 text-sm space-y-2">
        <h4 className="font-semibold text-white mb-3">💡 Tips:</h4>
        <ul className="space-y-1 list-disc list-inside">
          <li>Select multiple equipment types for more exercise variety</li>
          <li>You can mix equipment selections (e.g., Dumbbells + Barbells)</li>
          <li>Each equipment unlocks different exercise variations</li>
        </ul>
      </div>
    </div>
  );
};

export default EquipmentSelector;