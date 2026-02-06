import React from 'react';

const WizardSteps = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Equipment' },
    { number: 2, label: 'Muscles' },
    { number: 3, label: 'Exercises' },
    { number: 4, label: 'Workout' },
  ];

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '48px'
  };

  const stepStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 20px'
  };

  const stepCircleStyle = (isActive, isCompleted) => ({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    marginBottom: '12px',
    border: isActive ? '2px solid #ef4444' : isCompleted ? '2px solid #10b981' : '2px solid #374151',
    backgroundColor: isActive ? '#ef4444' : isCompleted ? '#10b981' : 'transparent',
    color: isActive || isCompleted ? 'white' : '#6b7280',
    transition: 'all 0.3s'
  });

  const stepLabelStyle = (isActive, isCompleted) => ({
    fontSize: '14px',
    fontWeight: '500',
    color: isActive ? '#ef4444' : isCompleted ? '#10b981' : '#6b7280',
    transition: 'color 0.3s'
  });

  return (
    <div style={containerStyle}>
      {steps.map((step) => {
        const isActive = currentStep === step.number;
        const isCompleted = currentStep > step.number;
        
        return (
          <div key={step.number} style={stepStyle}>
            <div style={stepCircleStyle(isActive, isCompleted)}>
              {isCompleted ? '✓' : step.number}
            </div>
            <div style={stepLabelStyle(isActive, isCompleted)}>
              {step.label}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
              Step {step.number}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WizardSteps;