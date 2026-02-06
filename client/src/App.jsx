import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

// Components
import WizardSteps from './components/WizardSteps';
import EquipmentSelector from './components/EquipmentSelector';
import MuscleSelector from './components/MuscleSelector';
import ExerciseList from './components/ExerciseList';
import Navbar from './components/Navbar';
import WorkoutSummary from './components/WorkoutSummary';

// API Configuration
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uniqueFilters, setUniqueFilters] = useState({
    equipment: [],
    muscles: [],
    categories: []
  });

  // App container style
  const appStyle = {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: 'white'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 16px'
  };

  // Fetch unique filters on mount
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get('/api/exercises/filters/unique');
        setUniqueFilters(response.data.data);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };
    
    fetchFilters();
  }, []);

  // Handle equipment selection
  const handleEquipmentSelect = (equipment) => {
    setSelectedEquipment(prev => {
      if (prev.includes(equipment)) {
        return prev.filter(item => item !== equipment);
      } else {
        return [...prev, equipment];
      }
    });
  };

  // Handle muscle selection
  const handleMuscleSelect = (muscle) => {
    setSelectedMuscles(prev => {
      if (prev.includes(muscle)) {
        return prev.filter(item => item !== muscle);
      } else {
        return [...prev, muscle];
      }
    });
  };

  // Fetch exercises based on selected muscles and equipment
  const fetchExercises = async () => {
    if (selectedMuscles.length === 0) return;
    
    setLoading(true);
    try {
      const params = {
        muscles: selectedMuscles.join(','),
        equipment: selectedEquipment.join(','),
        limit: 20
      };
      
      const response = await axios.get('/api/exercises', { params });
      setExercises(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      alert('Error fetching exercises. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle step navigation
  const handleNextStep = () => {
    if (currentStep === 1 && selectedEquipment.length === 0) {
      alert('Please select at least one equipment type');
      return;
    }
    
    if (currentStep === 2 && selectedMuscles.length === 0) {
      alert('Please select at least one muscle group');
      return;
    }
    
    if (currentStep === 2) {
      fetchExercises();
    }
    
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Handle exercise selection
  const handleExerciseSelect = (exercise) => {
    setSelectedExercises(prev => {
      if (prev.some(e => e._id === exercise._id)) {
        return prev.filter(e => e._id !== exercise._id);
      } else {
        return [...prev, exercise];
      }
    });
  };

  // Handle exercise shuffle
  const handleShuffleExercises = () => {
    const shuffled = [...exercises]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(10, exercises.length));
    setExercises(shuffled);
  };

  // Generate workout
  const generateWorkout = () => {
    if (selectedExercises.length === 0) {
      alert('Please select at least one exercise');
      return;
    }
    setCurrentStep(4);
  };

  // Reset wizard
  const handleReset = () => {
    setCurrentStep(1);
    setSelectedEquipment([]);
    setSelectedMuscles([]);
    setExercises([]);
    setSelectedExercises([]);
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <EquipmentSelector
            equipment={uniqueFilters.equipment}
            selectedEquipment={selectedEquipment}
            onSelect={handleEquipmentSelect}
          />
        );
      
      case 2:
        return (
          <MuscleSelector
            muscles={uniqueFilters.muscles}
            selectedMuscles={selectedMuscles}
            onSelect={handleMuscleSelect}
          />
        );
      
      case 3:
        return (
          <ExerciseList
            exercises={exercises}
            selectedExercises={selectedExercises}
            onSelect={handleExerciseSelect}
            onShuffle={handleShuffleExercises}
            loading={loading}
          />
        );
      
      case 4:
        return (
          <WorkoutSummary
            exercises={selectedExercises}
            equipment={selectedEquipment}
            muscles={selectedMuscles}
            onReset={handleReset}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <Router>
      <div style={appStyle}>
        <Navbar />
        
        <div style={containerStyle}>
          {/* Wizard Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{ 
              fontSize: '36px', 
              fontWeight: 'bold', 
              color: '#ef4444',
              marginBottom: '16px'
            }}>
              Muscle Dynamics
            </h1>
            <p style={{ color: '#9ca3af', maxWidth: '500px', margin: '0 auto 32px' }}>
              Build your perfect workout in 3 simple steps.
            </p>
            
            <WizardSteps currentStep={currentStep} />
          </div>
          
          {/* Step Content */}
          <div style={{ marginBottom: '32px' }}>
            {renderStepContent()}
          </div>
          
          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginTop: '48px',
              paddingTop: '32px',
              borderTop: '1px solid #374151'
            }}>
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                style={{ 
                  backgroundColor: '#374151',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '1px solid #4b5563',
                  opacity: currentStep === 1 ? 0.3 : 1
                }}
              >
                Previous
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>
                  {currentStep === 1 && `Selected: ${selectedEquipment.length} equipment`}
                  {currentStep === 2 && `Selected: ${selectedMuscles.length} muscles`}
                  {currentStep === 3 && `Selected: ${selectedExercises.length} exercises`}
                </span>
                
                <button
                  onClick={currentStep === 3 ? generateWorkout : handleNextStep}
                  style={{ 
                    backgroundColor: '#dc2626',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    opacity: (
                      (currentStep === 1 && selectedEquipment.length === 0) ||
                      (currentStep === 2 && selectedMuscles.length === 0) ||
                      (currentStep === 3 && selectedExercises.length === 0)
                    ) ? 0.5 : 1,
                    cursor: (
                      (currentStep === 1 && selectedEquipment.length === 0) ||
                      (currentStep === 2 && selectedMuscles.length === 0) ||
                      (currentStep === 3 && selectedExercises.length === 0)
                    ) ? 'not-allowed' : 'pointer'
                  }}
                  disabled={
                    (currentStep === 1 && selectedEquipment.length === 0) ||
                    (currentStep === 2 && selectedMuscles.length === 0) ||
                    (currentStep === 3 && selectedExercises.length === 0)
                  }
                >
                  {currentStep === 3 ? 'Generate Workout' : 'Continue'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;