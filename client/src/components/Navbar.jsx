// ===================================
// 💪 Navbar Component
// ===================================
// Header navigation - Logo, title, reset button

import React from 'react';
import { RotateCcw } from 'lucide-react';

const Navbar = ({ onReset }) => {
  return (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          {/* Logo + Title - Left side */}
          <div className="flex items-center gap-3">
            <div className="text-3xl">💪</div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Muscle <span className="text-red-600">Dynamics</span>
              </h1>
              <p className="text-xs text-gray-400">AI Workout Generator</p>
            </div>
          </div>

          {/* Reset button - Right side */}
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200 hover-lift"
            title="Reset and start over"
          >
            <RotateCcw size={18} />
            <span className="hidden sm:inline font-semibold">Reset</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;