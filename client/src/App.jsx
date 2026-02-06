// ===================================
// 💪 Muscle Dynamics - Main App
// ===================================
// React component - 3 step wizard flow handle pannatum

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WizardSteps from './components/WizardSteps';
import EquipmentSelector from './components/EquipmentSelector';
import MuscleSelector from './components/MuscleSelector';
import ExerciseList from './components/ExerciseList';
import WorkoutSummary from './components/WorkoutSummary';
import './index.css';

// ============================================
// Main App Component
// ============================================

const App = () => {
  // State variables - Wizard steps track pannatum
  const [currentStep, setCurrentStep] = useState(1); // 1, 2, 3
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [allMuscles, setAllMuscles] = useState([]);
  const [allEquipment, setAllEquipment] = useState([]);

  // ============================================
  // Initialization - Data fetch pannatum
  // ============================================

  useEffect(() => {
    fetchAvailableOptions();
  }, []);

  // Available muscles and equipment fetch pannatum
  const fetchAvailableOptions = async () => {
    try {
      // API URL construct pannatum
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

      // Muscles fetch pannatum
      const musclesRes = await fetch(`${apiUrl}/api/exercises/muscles/all`);
      if (musclesRes.ok) {
        const musclesData = await musclesRes.json();
        setAllMuscles(musclesData.data || []);
      }

      // Equipment fetch pannatum
      const equipmentRes = await fetch(`${apiUrl}/api/exercises/equipment/all`);
      if (equipmentRes.ok) {
        const equipmentData = await equipmentRes.json();
        setAllEquipment(equipmentData.data || []);
      }
    } catch (err) {
      console.error('Error fetching options:', err);
    }
  };

  // ============================================
  // Step 1 - Equipment Selection Handler
  // ============================================

  const handleEquipmentSelect = (equipment) => {
    // Toggle equipment selection - Already selected ba remove pannatum
    setSelectedEquipment(prev =>
      prev.includes(equipment)
        ? prev.filter(e => e !== equipment)
        : [...prev, equipment]
    );
  };

  const handleEquipmentContinue = () => {
    // At least one equipment select pannanum
    if (selectedEquipment.length === 0) {
      setError('Please select at least one equipment');
      return;
    }

    setError('');
    setCurrentStep(2); // Step 2 ki move pannatum
  };

  // ============================================
  // Step 2 - Muscle Selection Handler
  // ============================================

  const handleMuscleContinue = async () => {
    // At least one muscle select pannanum
    if (selectedMuscles.length === 0) {
      setError('Please select at least one muscle group');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // API call - Exercises filter pannatum
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

      // Query string build pannatum
      let queryUrl = `${apiUrl}/api/exercises?`;

      // Muscles add pannatum
      selectedMuscles.forEach(muscle => {
        queryUrl += `muscles=${encodeURIComponent(muscle)}&`;
      });

      // Equipment add pannatum (first selected equipment)
      if (selectedEquipment.length > 0) {
        queryUrl += `equipment=${encodeURIComponent(selectedEquipment[0])}`;
      }

      // API request pannatum
      const response = await fetch(queryUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch exercises');
      }

      const data = await response.json();

      // Check minimum 10 exercises
      if (data.data && data.data.length >= 10) {
        setExercises(data.data);
        setFilteredExercises(data.data);
        setCurrentStep(3); // Step 3 ki move pannatum
      } else if (data.data && data.data.length > 0) {
        // Less than 10 but show anyway
        setExercises(data.data);
        setFilteredExercises(data.data);
        setCurrentStep(3);
      } else {
        setError('No exercises found for selected criteria. Try different selections.');
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Exercise fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // Step 3 - Exercise List Handlers
  // ============================================

  const handleShuffleExercises = () => {
    // Fisher-Yates shuffle algorithm use pannatum
    const shuffled = [...filteredExercises];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setFilteredExercises(shuffled);
  };

  const handleDeleteExercise = (exerciseId) => {
    // Exercise remove pannatum
    setFilteredExercises(prev =>
      prev.filter(exercise => exercise._id !== exerciseId)
    );
  };

  const handleGenerateWorkout = () => {
    // Workout summary show pannatum (optional feature)
    // Can be expanded to create a full workout routine
    setCurrentStep(4); // New step for summary
  };

  // ============================================
  // Reset Workout Handler
  // ============================================

  const handleResetWorkout = () => {
    // Reset all states - Start from beginning
    setCurrentStep(1);
    setSelectedEquipment([]);
    setSelectedMuscles([]);
    setExercises([]);
    setFilteredExercises([]);
    setError('');
  };

  // ============================================
  // Render - Step based UI
  // ============================================

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header - Navigation bar */}
      <Navbar onReset={handleResetWorkout} />

      {/* Main container */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Progress bar - Wizard steps show pannatum */}
        <WizardSteps currentStep={currentStep} totalSteps={3} />

        {/* Error message display */}
        {error && (
          <div className="mb-6 p-4 bg-red-600/20 border border-red-600 rounded-lg text-red-200 animate-slide-in-down">
            <p className="font-semibold">⚠️ {error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin">
              <div className="w-12 h-12 border-4 border-gray-700 border-t-red-600 rounded-full"></div>
            </div>
            <p className="ml-4 text-gray-400">Loading exercises...</p>
          </div>
        )}

        {/* Step 1 - Equipment Selection */}
        {currentStep === 1 && !loading && (
          <div className="animate-slide-in-up">
            <EquipmentSelector
              equipmentList={allEquipment}
              selectedEquipment={selectedEquipment}
              onSelect={handleEquipmentSelect}
              onContinue={handleEquipmentContinue}
            />
          </div>
        )}

        {/* Step 2 - Muscle Selection */}
        {currentStep === 2 && !loading && (
          <div className="animate-slide-in-up">
            <MuscleSelector
              muscleList={allMuscles}
              selectedMuscles={selectedMuscles}
              onSelect={setSelectedMuscles}
              onContinue={handleMuscleContinue}
              loading={loading}
            />
          </div>
        )}

        {/* Step 3 - Exercise List */}
        {currentStep === 3 && !loading && (
          <div className="animate-slide-in-up">
            <ExerciseList
              exercises={filteredExercises}
              selectedEquipment={selectedEquipment}
              selectedMuscles={selectedMuscles}
              onShuffle={handleShuffleExercises}
              onDelete={handleDeleteExercise}
              onGenerate={handleGenerateWorkout}
              onBack={() => setCurrentStep(2)}
            />
          </div>
        )}

        {/* Step 4 - Workout Summary (Optional) */}
        {currentStep === 4 && (
          <div className="animate-slide-in-up">
            <WorkoutSummary
              equipment={selectedEquipment}
              muscles={selectedMuscles}
              exercises={filteredExercises}
              onBack={() => setCurrentStep(3)}
              onReset={handleResetWorkout}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>💪 Muscle Dynamics v1.0 - Your Personal Workout Generator</p>
          <p className="mt-2">Data from free-exercise-db | Built with MERN Stack</p>
        </div>
      </footer>
    </div>
  );
};

export default App;