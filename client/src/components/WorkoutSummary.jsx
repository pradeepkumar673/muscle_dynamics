import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { 
  Download, 
  Printer, 
  Share2, 
  Clock, 
  Dumbbell,
  Calendar,
  Trophy,
  RefreshCw,
  CheckCircle
} from 'lucide-react';
import { useWindowSize } from 'react-use';

const WorkoutSummary = ({ exercises, equipment, muscles, onReset }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();
  
  // Calculate workout statistics
  const totalExercises = exercises.length;
  const estimatedTime = totalExercises * 5; // 5 minutes per exercise
  const primaryMuscles = [...new Set(exercises.flatMap(e => e.primaryMuscles))];
  const equipmentUsed = [...new Set(exercises.map(e => e.equipment))];
  
  // Generate workout schedule
  const generateWorkoutSchedule = () => {
    const schedule = [];
    let time = 0;
    
    exercises.forEach((exercise, index) => {
      const exerciseTime = 5; // 5 minutes per exercise including rest
      schedule.push({
        id: index,
        time: `${time}:00 - ${time + exerciseTime}:00`,
        exercise: exercise.name,
        equipment: exercise.equipment,
        sets: '3x12',
        rest: '60s'
      });
      time += exerciseTime;
    });
    
    return schedule;
  };

  const workoutSchedule = generateWorkoutSchedule();

  const handleDownload = () => {
    const workoutData = {
      date: new Date().toISOString(),
      exercises: exercises.map(e => ({
        name: e.name,
        equipment: e.equipment,
        primaryMuscles: e.primaryMuscles,
        instructions: e.instructions[0]
      })),
      statistics: {
        totalExercises,
        estimatedTime,
        primaryMuscles,
        equipmentUsed
      }
    };
    
    const dataStr = JSON.stringify(workoutData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `workout-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const workoutText = `I just created a workout with ${totalExercises} exercises targeting ${primaryMuscles.length} muscle groups!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Workout Plan',
          text: workoutText,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(workoutText);
      alert('Workout details copied to clipboard!');
    }
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}
      
      <div className="card animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">
            Workout Generated Successfully! 🎉
          </h2>
          <p className="text-gray-400">
            Your personalized workout plan is ready. Save, print, or start your workout now!
          </p>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Dumbbell className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{totalExercises}</div>
                <div className="text-sm text-gray-400">Exercises</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{estimatedTime}</div>
                <div className="text-sm text-gray-400">Minutes</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Activity className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{primaryMuscles.length}</div>
                <div className="text-sm text-gray-400">Muscle Groups</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{new Date().getDate()}</div>
                <div className="text-sm text-gray-400">Today</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={handleDownload}
            className="btn-primary flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Workout
          </button>
          
          <button
            onClick={handlePrint}
            className="btn-secondary flex items-center gap-2"
          >
            <Printer className="w-5 h-5" />
            Print Plan
          </button>
          
          <button
            onClick={handleShare}
            className="btn-secondary flex items-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Workout
          </button>
          
          <button
            onClick={onReset}
            className="btn-secondary flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            New Workout
          </button>
        </div>
        
        {/* Workout Schedule */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-red-500" />
            Workout Schedule
          </h3>
          
          <div className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700">
            <div className="grid grid-cols-12 bg-gray-900 text-gray-400 text-sm font-medium p-4 border-b border-gray-700">
              <div className="col-span-1">#</div>
              <div className="col-span-3">Time</div>
              <div className="col-span-4">Exercise</div>
              <div className="col-span-2">Sets</div>
              <div className="col-span-2">Rest</div>
            </div>
            
            <div className="divide-y divide-gray-700">
              {workoutSchedule.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 p-4 hover:bg-gray-800/30 transition-colors duration-300">
                  <div className="col-span-1 text-white font-semibold">{index + 1}</div>
                  <div className="col-span-3 text-gray-300">{item.time}</div>
                  <div className="col-span-4">
                    <div className="text-white font-medium">{item.exercise}</div>
                    <div className="text-sm text-gray-400">{item.equipment}</div>
                  </div>
                  <div className="col-span-2 text-green-400 font-semibold">{item.sets}</div>
                  <div className="col-span-2 text-yellow-400">{item.rest}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Exercise List */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Selected Exercises</h3>
          
          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <div 
                key={exercise._id} 
                className="bg-gray-800/30 rounded-lg p-4 border border-gray-700 hover:border-red-500/30 transition-colors duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white">{exercise.name}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span>{exercise.equipment}</span>
                        <span>•</span>
                        <span>{exercise.primaryMuscles?.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                
                {exercise.instructions?.[0] && (
                  <p className="mt-3 text-gray-400 text-sm pl-14">
                    {exercise.instructions[0]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Workout Tips */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">💪 Workout Tips</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-red-500 font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Warm Up Properly</h4>
                <p className="text-gray-400 text-sm">
                  Spend 5-10 minutes on dynamic stretches and light cardio before starting.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-500 font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Stay Hydrated</h4>
                <p className="text-gray-400 text-sm">
                  Drink water throughout your workout to maintain performance and recovery.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-green-500 font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Focus on Form</h4>
                <p className="text-gray-400 text-sm">
                  Quality over quantity. Proper form prevents injuries and maximizes results.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-500 font-bold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Track Progress</h4>
                <p className="text-gray-400 text-sm">
                  Record your weights and reps to monitor improvement over time.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Final CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={onReset}
            className="btn-primary text-lg px-8 py-4"
          >
            Create Another Workout
          </button>
          
          <p className="mt-4 text-gray-400 text-sm">
            Workout generated on {new Date().toLocaleDateString()} • Ready to transform! 💪
          </p>
        </div>
      </div>
    </>
  );
};

export default WorkoutSummary;