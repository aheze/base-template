import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function SuggestionCard({ suggestion, onAction }) {
  return (
    <Card
      className={`mb-4 shadow-lg transition-transform transform hover:scale-105 ${
        suggestion.priority ? "border-l-4 border-blue-500" : ""
      }`}
    >
      <CardHeader>
        <CardTitle>{suggestion.title}</CardTitle>
        <CardDescription>{suggestion.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {suggestion.action && (
          <Button
            onClick={() => onAction(suggestion.action)}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white"
          >
            {suggestion.actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function ProgressBar({ value, max, label }) {
  const percentage = (value / max) * 100;

  return (
    <div className="mb-4">
      <h3 className="text-sm mb-1">{label}</h3>
      <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
        <div
          style={{
            width: `${percentage}%`,
            transition: "width 0.5s ease-in-out",
          }}
          className={`h-full ${
            percentage >= 100 ? "bg-green-500" : "bg-blue-500"
          }`}
        ></div>
      </div>
      {percentage >= 100 && (
        <p className="text-green-600 mt-2 text-sm animate-bounce">
          Goal Achieved! 🎉
        </p>
      )}
    </div>
  );
}

function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [userStats, setUserStats] = useState({
    waterIntake: 3, // glasses
    tasksCompleted: 2,
    exerciseDays: 3,
    focusHours: 4, // hours
    upcomingDeadlines: 1,
  });

  useEffect(() => {
    const generateSuggestions = () => {
      let newSuggestions = [];
      if (userStats.waterIntake < 8) {
        newSuggestions.push({
          title: "Stay Hydrated!",
          description: "You haven’t logged enough water today.",
          action: "logWater",
          actionLabel: "Log Water",
        });
      }
      if (userStats.tasksCompleted === 0) {
        newSuggestions.push({
          title: "Get Started!",
          description: "You haven't completed any tasks today. Let's start one!",
          action: "addTask",
          actionLabel: "Add Task",
        });
      }
      if (userStats.focusHours < 6) {
        newSuggestions.push({
          title: "Boost Focus!",
          description: "You’ve logged less focus time today. Try a pomodoro session!",
          action: "logFocus",
          actionLabel: "Log Focus",
        });
      }
      if (userStats.exerciseDays < 4) {
        newSuggestions.push({
          title: "Keep Moving!",
          description: "You've exercised less this week. Time for some activity?",
          action: "logExercise",
          actionLabel: "Log Exercise",
        });
      }
      if (userStats.upcomingDeadlines > 0) {
        newSuggestions.push({
          title: "Deadline Approaching",
          description: "You have an upcoming deadline. Plan your tasks accordingly.",
        });
      }
      setSuggestions(newSuggestions);
    };

    generateSuggestions();
  }, [userStats]);

  const handleAction = (action) => {
    switch (action) {
      case "logWater":
        setUserStats((prev) => ({ ...prev, waterIntake: prev.waterIntake + 1 }));
        break;
      case "addTask":
        setUserStats((prev) => ({ ...prev, tasksCompleted: prev.tasksCompleted + 1 }));
        break;
      case "logFocus":
        setUserStats((prev) => ({ ...prev, focusHours: prev.focusHours + 1 }));
        break;
      case "logExercise":
        setUserStats((prev) => ({ ...prev, exerciseDays: prev.exerciseDays + 1 }));
        break;
      default:
        console.log("Unknown action");
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8 bg-gradient-to-b from-blue-100 to-white min-h-screen">
      <header className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600">
          Your Daily Insights 🌟
        </h1>
        <p className="text-gray-600">
          Stay productive and maintain your wellness with personalized
          suggestions.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Suggestion Panel */}
        <div>
          <h2 className="text-xl font-bold mb-4">Suggestions for You</h2>
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, idx) => (
              <SuggestionCard
                key={idx}
                suggestion={suggestion}
                onAction={handleAction}
              />
            ))
          ) : (
            <p className="text-gray-500">You're all caught up! 🎉</p>
          )}
        </div>

        {/* Progress Panel */}
        <div>
          <h2 className="text-xl font-bold mb-4">Your Progress</h2>
          <ProgressBar
            value={userStats.waterIntake}
            max={8}
            label="Hydration Goal"
          />
          <ProgressBar
            value={userStats.tasksCompleted}
            max={5}
            label="Tasks Completed Today"
          />
          <ProgressBar
            value={userStats.exerciseDays}
            max={7}
            label="Exercise Days This Week"
          />
          <ProgressBar
            value={userStats.focusHours}
            max={6}
            label="Daily Focus Hours"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
