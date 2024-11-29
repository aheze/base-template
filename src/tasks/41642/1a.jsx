import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

const exercises = [
  { name: "Push-ups", category: "Strength", level: "Beginner" },
  { name: "Squats", category: "Strength", level: "Beginner" },
  { name: "Jogging", category: "Cardio", level: "Beginner" },
  { name: "Plank", category: "Core", level: "Intermediate" },
  { name: "Burpees", category: "HIIT", level: "Advanced" },
];

const foods = [
  { name: "Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: "Brown Rice", calories: 216, protein: 5, carbs: 45, fat: 1.6 },
];

function ProfileSetup({ onComplete }) {
  const [profile, setProfile] = useState({
    age: "",
    weight: "",
    height: "",
    goal: "weight-loss",
    activityLevel: "moderate",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(profile);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Profile Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="age"
            type="number"
            placeholder="Age"
            value={profile.age}
            onChange={handleChange}
            required
          />
          <Input
            name="weight"
            type="number"
            placeholder="Weight (kg)"
            value={profile.weight}
            onChange={handleChange}
            required
          />
          <Input
            name="height"
            type="number"
            placeholder="Height (cm)"
            value={profile.height}
            onChange={handleChange}
            required
          />
          <Select
            name="goal"
            value={profile.goal}
            onChange={handleChange}
            required
          >
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
          </Select>
          <Select
            name="activityLevel"
            value={profile.activityLevel}
            onChange={handleChange}
            required
          >
            <option value="sedentary">Sedentary</option>
            <option value="moderate">Moderately Active</option>
            <option value="active">Active</option>
          </Select>
          <Button type="submit">Complete Setup</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function Dashboard({ profile }) {
  const [selectedTab, setSelectedTab] = useState("workouts");
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const addWorkout = (exercise) => {
    setWorkouts([...workouts, exercise]);
  };

  const addMeal = (food) => {
    setMeals([...meals, food]);
  };

  const totalCaloriesBurned = workouts.length * 100; // Simplified calculation
  const totalCaloriesConsumed = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Fitness Tracker</h1>
          <div className="flex items-center space-x-2">
            <span>Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </div>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="meals">Meals</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          <TabsContent value="workouts">
            <Card>
              <CardHeader>
                <CardTitle>Workout Planner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {exercises.map((exercise, index) => (
                    <Button key={index} onClick={() => addWorkout(exercise)}>
                      {exercise.name}
                    </Button>
                  ))}
                </div>
                <div className="mt-4">
                  <h3 className="font-bold">Completed Workouts:</h3>
                  <ul>
                    {workouts.map((workout, index) => (
                      <li key={index}>{workout.name}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="meals">
            <Card>
              <CardHeader>
                <CardTitle>Meal Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {foods.map((food, index) => (
                    <Button key={index} onClick={() => addMeal(food)}>
                      {food.name}
                    </Button>
                  ))}
                </div>
                <div className="mt-4">
                  <h3 className="font-bold">Logged Meals:</h3>
                  <ul>
                    {meals.map((meal, index) => (
                      <li key={index}>
                        {meal.name} - {meal.calories} calories
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Progress Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold">Calories Burned:</h3>
                    <Progress value={(totalCaloriesBurned / 500) * 100} />
                    <p>{totalCaloriesBurned} / 500 kcal</p>
                  </div>
                  <div>
                    <h3 className="font-bold">Calories Consumed:</h3>
                    <Progress value={(totalCaloriesConsumed / 2000) * 100} />
                    <p>{totalCaloriesConsumed} / 2000 kcal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function App() {
  const [profile, setProfile] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {profile ? (
        <Dashboard profile={profile} />
      ) : (
        <ProfileSetup onComplete={setProfile} />
      )}
    </div>
  );
}