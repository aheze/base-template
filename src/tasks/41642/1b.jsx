import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

function App() {
  const [userProfile, setUserProfile] = useState({
    age: '', weight: '', height: '', goal: 'weightLoss', activityLevel: 'moderate'
  });
  const [calories, setCalories] = useState(0);

  const calculateCalories = () => {
    // Simplified calorie calculation
    const base = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age;
    let multiplier = 1.55; // Moderate activity
    if (userProfile.activityLevel === 'light') multiplier = 1.375;
    if (userProfile.activityLevel === 'heavy') multiplier = 1.725;
    
    const cal = userProfile.goal === 'weightLoss' 
      ? base * multiplier - 500 
      : (userProfile.goal === 'muscleGain' ? base * multiplier + 500 : base * multiplier);
    
    setCalories(Math.round(cal));
  };

  const handleProfileChange = (e) => {
    setUserProfile({...userProfile, [e.target.name]: e.target.value});
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Fitness Tracker</h1>
      
      {/* User Profile Setup */}
      <Card className="w-full max-w-md mb-4">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Input type="number" name="age" value={userProfile.age} onChange={handleProfileChange} placeholder="Age" className="mb-2"/>
          <Input type="number" name="weight" value={userProfile.weight} onChange={handleProfileChange} placeholder="Weight (kg)" className="mb-2"/>
          <Input type="number" name="height" value={userProfile.height} onChange={handleProfileChange} placeholder="Height (cm)" className="mb-2"/>
          <select name="goal" value={userProfile.goal} onChange={handleProfileChange} className="mb-2 p-2 w-full border rounded">
            <option value="weightLoss">Lose Weight</option>
            <option value="muscleGain">Gain Muscle</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox id="activityLight" name="activityLevel" value="light" checked={userProfile.activityLevel === 'light'} onChange={handleProfileChange} />
            <label htmlFor="activityLight">Light Activity</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="activityModerate" name="activityLevel" value="moderate" checked={userProfile.activityLevel === 'moderate'} onChange={handleProfileChange} />
            <label htmlFor="activityModerate">Moderate Activity</label>
          </div>
          <Button onClick={calculateCalories} className="mt-4 w-full">Calculate Calories</Button>
        </CardContent>
      </Card>

      {/* Calorie Display */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Daily Calorie Intake</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl text-center">{calories} kcal/day</p>
        </CardContent>
      </Card>

      {/* Here you would add more components like WorkoutPlanner, FoodTracker, ProgressTracker, etc. */}
    </div>
  );
}

export default App;