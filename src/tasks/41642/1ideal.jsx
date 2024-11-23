import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ProfileSetup({ onSubmit }) {
  const [profile, setProfile] = useState({
    age: "",
    weight: "",
    height: "",
    fitnessGoal: "maintenance",
    activityLevel: "moderate",
  });

  const [error, setError] = useState("");

  const fitnessGoals = ["weight loss", "muscle gain", "maintenance"];
  const activityLevels = ["sedentary", "light", "moderate", "active"];

  const handleChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const calculateCalories = () => {
    const { weight, height, age, activityLevel, fitnessGoal } = profile;
    const activityMultiplier = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
    };
    let bmr = 10 * weight + 6.25 * height - 5 * age + 5; 
    bmr *= activityMultiplier[activityLevel];
    if (fitnessGoal === "weight loss") bmr -= 500; 
    if (fitnessGoal === "muscle gain") bmr += 500; 
    return Math.round(bmr);
  };

  const handleSubmit = () => {
    if (
      !profile.age ||
      !profile.weight ||
      !profile.height ||
      !profile.fitnessGoal ||
      !profile.activityLevel
    ) {
      setError("All fields are required!");
      return;
    }
    setError("");
    const calories = calculateCalories();
    onSubmit({ ...profile, calories });
  };

  return (
    <Card className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Profile Setup</CardTitle>
        <CardDescription className="text-gray-600">
          Enter your details to personalize your plan.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          type="number"
          placeholder="Age"
          className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
          value={profile.age}
          onChange={(e) => handleChange("age", e.target.value)}
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
          value={profile.weight}
          onChange={(e) => handleChange("weight", e.target.value)}
        />
        <input
          type="number"
          placeholder="Height (cm)"
          className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
          value={profile.height}
          onChange={(e) => handleChange("height", e.target.value)}
        />
        <select
          className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
          value={profile.fitnessGoal}
          onChange={(e) => handleChange("fitnessGoal", e.target.value)}
        >
          {fitnessGoals.map((goal) => (
            <option key={goal} value={goal}>
              {goal}
            </option>
          ))}
        </select>
        <select
          className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
          value={profile.activityLevel}
          onChange={(e) => handleChange("activityLevel", e.target.value)}
        >
          {activityLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500">{error}</p>}
      </CardContent>
      <CardFooter>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </CardFooter>
    </Card>
  );
}

function DietSuggestion({ weight }) {
  const isWeightLow = weight < 70;
  const suggestions = isWeightLow
    ? [
        "🍳 Increase protein intake with eggs, chicken, and legumes.",
        "🥑 Consume healthy fats like avocados and nuts.",
        "🥤 Include calorie-dense snacks like peanut butter and smoothies.",
      ]
    : [
        "🐟 Focus on lean proteins like fish and tofu.",
        "🥗 Reduce processed carbs and sugary snacks.",
        "🥦 Incorporate more vegetables and whole grains into your meals.",
      ];

  return (
    <Card className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Diet Suggestions</CardTitle>
        <CardDescription className="text-gray-600">
          Personalized diet plan to help you reach your goals. 🥗
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {suggestions.map((tip, idx) => (
          <p key={idx} className="text-gray-700">
            {tip}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}

function Dashboard({ profile }) {
  const { calories, weight } = profile;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Welcome to Your Dashboard! 🎉
      </h1>
      <Card className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Plan</CardTitle>
          <CardDescription className="text-gray-600">
            Daily Calorie Needs: {calories} kcal
          </CardDescription>
        </CardHeader>
      </Card>
      <DietSuggestion weight={weight} />
    </div>
  );
}

export default function App() {
  const [profile, setProfile] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-6">
      {!profile ? (
        <ProfileSetup onSubmit={(data) => setProfile(data)} />
      ) : (
        <Dashboard profile={profile} />
      )}
    </div>
  );
}
