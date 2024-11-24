import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Mock user data
const initialUserData = {
  tasks: [
    { id: 1, title: "Complete project proposal", completed: false, deadline: "2023-06-15" },
    { id: 2, title: "Prepare presentation", completed: true, deadline: "2023-06-10" },
  ],
  waterIntake: 0,
  exerciseDays: 2,
};

const SuggestionPanel = ({ suggestion, onAction }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle className="text-lg">AI Suggestion</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{suggestion.text}</p>
    </CardContent>
    <CardFooter>
      <Button onClick={() => onAction(suggestion.action)}>{suggestion.actionText}</Button>
    </CardFooter>
  </Card>
);

const ProgressTracker = ({ label, value, max }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span>{label}</span>
      <span>{value}/{max}</span>
    </div>
    <Progress value={(value / max) * 100} />
  </div>
);

const TaskList = ({ tasks }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>Tasks</CardTitle>
    </CardHeader>
    <CardContent>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={`mb-2 ${task.completed ? "line-through" : ""}`}>
            {task.title} - Due: {task.deadline}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default function App() {
  const [userData, setUserData] = useState(initialUserData);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    analyzeTasks();
    analyzeWaterIntake();
    analyzeExercise();
  }, [userData]);

  const analyzeTasks = () => {
    const incompleteTasks = userData.tasks.filter((task) => !task.completed);
    if (incompleteTasks.length > 0) {
      const nearestDeadline = incompleteTasks.reduce((nearest, task) =>
        new Date(task.deadline) < new Date(nearest.deadline) ? task : nearest
      );
      addSuggestion({
        text: `Your deadline for "${nearestDeadline.title}" is approaching. Consider adding tasks to meet it.`,
        action: () => console.log("Add task action"),
        actionText: "Add Task",
      });
    }
  };

  const analyzeWaterIntake = () => {
    if (userData.waterIntake < 8) {
      addSuggestion({
        text: "You haven't logged enough water intake today. Stay hydrated!",
        action: () => setUserData({ ...userData, waterIntake: userData.waterIntake + 1 }),
        actionText: "Log Water",
      });
    }
  };

  const analyzeExercise = () => {
    if (userData.exerciseDays < 3) {
      addSuggestion({
        text: `You've completed ${userData.exerciseDays} days of exercise this week. Keep the streak going!`,
        action: () => setUserData({ ...userData, exerciseDays: userData.exerciseDays + 1 }),
        actionText: "Log Exercise",
      });
    }
  };

  const addSuggestion = (suggestion) => {
    setSuggestions((prevSuggestions) => [...prevSuggestions, suggestion]);
  };

  const handleSuggestionAction = (action) => {
    action();
    setSuggestions((prevSuggestions) => prevSuggestions.slice(1));
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Productivity & Wellness Dashboard</h1>
      
      {suggestions.length > 0 && (
        <SuggestionPanel
          suggestion={suggestions[0]}
          onAction={handleSuggestionAction}
        />
      )}

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Progress Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressTracker label="Water Intake" value={userData.waterIntake} max={8} />
          <ProgressTracker label="Exercise Days" value={userData.exerciseDays} max={7} />
        </CardContent>
      </Card>

      <TaskList tasks={userData.tasks} />

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button onClick={() => setUserData({ ...userData, waterIntake: userData.waterIntake + 1 })}>
            Log Water
          </Button>
          <Button onClick={() => setUserData({ ...userData, exerciseDays: userData.exerciseDays + 1 })}>
            Log Exercise
          </Button>
          <Button onClick={() => console.log("Add task clicked")}>Add Task</Button>
        </CardContent>
      </Card>
    </div>
  );
}