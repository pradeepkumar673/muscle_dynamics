// ===================================
// 💪 Wizard Steps Component
// ===================================
// Progress bar - 3 step wizard show pannatum

import React from 'react';
import { Check } from 'lucide-react';

const WizardSteps = ({ currentStep, totalSteps = 3 }) => {
  // ============================================
  // Step configuration
  // ============================================

  const steps = [
    {
      number: 1,
      title: 'Equipment',
      description: 'Select gym equipment'
    },
    {
      number: 2,
      title: 'Muscles',
      description: 'Choose target muscles'
    },
    {
      number: 3,
      title: 'Exercises',
      description: 'Build your workout'
    }
  ];

  // ============================================
  // Progress percentage calculate pannatum
  // ============================================

  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      {/* Title and progress info */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          Step {currentStep} of {totalSteps}
        </h2>
        <p className="text-gray-400 text-sm">
          {Math.round(progressPercent)}% Complete
        </p>
      </div>

      {/* Progress bar visual */}
      <div className="mb-6">
        {/* Background bar */}
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          {/* Filled bar - Progress show pannatum */}
          <div
            className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isUpcoming = step.number > currentStep;

          return (
            <div
              key={step.number}
              className="flex-1 flex flex-col items-center"
            >
              {/* Step circle with icon */}
              <div className="flex items-center w-full">
                {/* Connector line (left) */}
                {index > 0 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all duration-500 ${
                      isCompleted || isCurrent
                        ? 'bg-red-600'
                        : 'bg-gray-700'
                    }`}
                  ></div>
                )}

                {/* Step circle */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-red-600 text-white scale-110 shadow-lg shadow-red-600/50'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check size={20} />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>

                {/* Connector line (right) */}
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all duration-500 ${
                      isCompleted ? 'bg-red-600' : 'bg-gray-700'
                    }`}
                  ></div>
                )}
              </div>

              {/* Step label */}
              <div className="mt-3 text-center">
                <p
                  className={`font-semibold text-sm transition-colors ${
                    isCurrent ? 'text-red-600' : 'text-gray-300'
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WizardSteps;