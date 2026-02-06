import React, { useState } from 'react';
import { Search, Filter, Check } from 'lucide-react';

const EquipmentSelector = ({ equipment, selectedEquipment, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const equipmentIcons = {
    'dumbbell': '🏋️',
    'barbell': '🏋️‍♂️',
    'machine': '🏗️',
    'cable': '🔗',
    'kettlebell': '🥛',
    'body only': '💪',
    'bands': '🔄',
    'medicine ball': '🏐',
    'exercise ball': '🎱',
    'e-z curl bar': '📊',
    'foam roll': '🌀',
  };
  
  const filteredEquipment = equipment.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Select Equipment</h2>
          <p className="text-gray-400">
            Choose the equipment you have access to. You can select multiple options.
          </p>
        </div>
        <div className="text-red-500 bg-red-500/10 p-3 rounded-lg">
          <Filter className="w-8 h-8" />
        </div>
      </div>
      
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search equipment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field w-full pl-12"
          />
        </div>
      </div>
      
      {/* Equipment Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredEquipment.map((item) => {
          const isSelected = selectedEquipment.includes(item);
          const icon = equipmentIcons[item.toLowerCase()] || '🏋️';
          
          return (
            <button
              key={item}
              onClick={() => onSelect(item)}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-300
                ${isSelected 
                  ? 'bg-red-500/10 border-red-500 transform scale-105' 
                  : 'bg-gray-800/50 border-gray-700 hover:border-red-500/50 hover:bg-gray-800'
                }
                group
              `}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className="text-3xl mb-3">{icon}</div>
              
              <div className="text-left">
                <h3 className="font-semibold text-white mb-1 capitalize">
                  {item}
                </h3>
                <p className="text-xs text-gray-400">
                  {isSelected ? 'Selected' : 'Click to select'}
                </p>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </button>
          );
        })}
      </div>
      
      {/* Selected Equipment Summary */}
      {selectedEquipment.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-3">
            Selected Equipment ({selectedEquipment.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedEquipment.map((item) => (
              <span
                key={item}
                className="muscle-badge bg-red-500/20 text-red-300 border border-red-500/30"
              >
                {equipmentIcons[item.toLowerCase()] || '🏋️'} {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentSelector;