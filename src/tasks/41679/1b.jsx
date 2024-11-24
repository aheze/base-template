import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function SuggestionCard({ suggestion, onAction }) {
  return (
    <Card className="mb-4 shadow-lg">
      <CardHeader>
        <CardTitle>{suggestion.title}</CardTitle>
        <CardDescription>{suggestion.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {suggestion.action && 
          <Button onClick={() => onAction(suggestion.action)} className="mt-2">
            {suggestion.actionLabel}
          </Button>
        }
      </CardContent>
    </Card>
  );
}

function ProgressBar({ value, max, label }) {
  const percentage = (value / max) * 100;
  return (
    <div className="mb-4">
      <h3 className="text-sm mb-1">{label}</h3>
      <div className="bg-gray-200 h-4 rounded-full">
        <div style={{ width: `${percentage}%` }} className="bg-blue-500 h-4 rounded-full"></div>
      </div>
    </div>
  );
}

function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [userStats, setUserStats] = useState({
    waterIntake: 3, // glasses
    tasksCompleted: 2,
    exerciseDays: 3,
    upcomingDeadlines: 1
  });

  useEffect(() => {
    // This would typically fetch from an API or local storage
    const generateSuggestions = () => {
      let newSuggestions = [];
      if (userStats.waterIntake < 8) {
        newSuggestions.push({
          title: "Stay Hydrated!",
          description: "You haven’t logged enough water today.",
          action: 'logWater',
          actionLabel: 'Log Water'
        });
      }
      if (userStats.tasksCompleted === 0) {
        newSuggestions.push({
          title: "Get Started!",
          description: "You haven't completed any tasks today. Let's start one!",
          action: 'addTask',
          actionLabel: 'Add Task'
        });
      }
      if (userStats.upcomingDeadlines > 0) {
        newSuggestions.push({
          title: "Deadline Approaching",
          description: "You have an upcoming deadline. Plan your tasks accordingly."
        });
      }
      if (userStats.exerciseDays < 4) {
        newSuggestions.push({
          title: "Keep Moving!",
          description: "You've exercised less this week. Time for some activity?"
        });
      }
      setSuggestions(newSuggestions);
    };

    generateSuggestions();
  }, [userStats]);

  const handleAction = (action) => {
    switch(action) {
      case 'logWater':
        setUserStats(prev => ({...prev, waterIntake: prev.waterIntake + 1}));
        break;
      case 'addTask':
        // Here you might open a modal or redirect to a task creation page
        alert('Let\'s add a new task!');
        break;
      default:
        console.log('Unknown action');
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-4">Your Daily Insights</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          {suggestions.map((suggestion, idx) => (
            <SuggestionCard key={idx} suggestion={suggestion} onAction={handleAction} />
          ))}
        </div>
        <div>
          <ProgressBar value={userStats.waterIntake} max={8} label="Hydration Goal"/>
          <ProgressBar value={userStats.tasksCompleted} max={5} label="Tasks Completed Today"/>
          <ProgressBar value={userStats.exerciseDays} max={7} label="Exercise Days This Week"/>
        </div>
      </div>
    </div>
  );
}

export default App;