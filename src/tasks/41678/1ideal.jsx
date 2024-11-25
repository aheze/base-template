import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function App() {
  // State for managing gratitude entries
  const [gratitudeEntries, setGratitudeEntries] = useState([]);
  // State for current gratitude input fields
  const [currentGratitude, setCurrentGratitude] = useState(["", "", ""]);
  // State for selected mood emoji
  const [mood, setMood] = useState("😊");
  // State for the current affirmation
  const [affirmation, setAffirmation] = useState("");
  // State to manage the selected theme (light/dark)
  const [theme, setTheme] = useState("light");
  // State for suggestions and exercises
  const [suggestion, setSuggestion] = useState("");
  const [exercise, setExercise] = useState("");

  // List of affirmations to be displayed randomly
  const affirmations = [
    "I am capable of amazing things.",
    "I choose to focus on the positive.",
    "I am grateful for my journey.",
    "Today is a fresh start.",
    "I radiate positivity and gratitude.",
  ];

  // Predefined suggestions for different mood states
  const suggestions = {
    hopeful: [
      "Take a deep breath and try this: Inhale for 4 seconds, hold for 7, and exhale for 8.",
      "Go for a short walk outside. Nature often brings calm and clarity.",
      "Write a letter to yourself about why tomorrow will be brighter.",
    ],
    reflective: [
      "Try 10 minutes of guided meditation. Focus on your breath.",
      "List 5 small things that went well today.",
      "Stretch for 5 minutes and notice how your body feels.",
    ],
    motivational: [
      "Dance to your favorite song for 3 minutes. Feel the joy!",
      "Write a gratitude letter to someone who made a positive impact on your life.",
      "Try journaling about what makes you excited for tomorrow.",
    ],
  };

  // On component mount, set a random affirmation
  useEffect(() => {
    setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
  }, []);

  // Updates the current gratitude input fields
  const handleGratitudeChange = (index, value) => {
    const updatedGratitude = [...currentGratitude];
    updatedGratitude[index] = value;
    setCurrentGratitude(updatedGratitude);
  };

  // Analyzes mood based on the content of gratitude entries
  const analyzeMoodAndRecommendExercise = (entries) => {
    const positiveWords = ["happy", "grateful", "joy", "love", "peace"];
    const negativeWords = ["sad", "angry", "tired", "stressed", "hopeless"];

    let positiveCount = 0;
    let negativeCount = 0;

    // Count positive and negative words in the gratitude entries
    entries.forEach((entry) => {
      const words = entry.toLowerCase().split(/\s+/);
      positiveCount += words.filter((word) => positiveWords.includes(word)).length;
      negativeCount += words.filter((word) => negativeWords.includes(word)).length;
    });

    // Determine the suggestion and exercise based on the mood analysis
    if (negativeCount > positiveCount) {
      setSuggestion("You seem to be feeling down. Here's a suggestion to lift your spirits.");
      setExercise(
        suggestions.hopeful[Math.floor(Math.random() * suggestions.hopeful.length)]
      );
    } else if (positiveCount > negativeCount) {
      setSuggestion("You're feeling great! Keep up the positivity.");
      setExercise(
        suggestions.motivational[
          Math.floor(Math.random() * suggestions.motivational.length)
        ]
      );
    } else {
      setSuggestion("A moment for reflection can be grounding.");
      setExercise(
        suggestions.reflective[
          Math.floor(Math.random() * suggestions.reflective.length)
        ]
      );
    }
  };

  // Saves the current gratitude entries and resets the input fields
  const saveEntry = () => {
    if (currentGratitude.some((item) => item.trim() !== "")) {
      const newEntry = {
        date: new Date().toLocaleDateString(), // Stores the current date
        gratitude: currentGratitude, // Stores the gratitude entries
        mood, // Stores the selected mood
      };
      setGratitudeEntries([newEntry, ...gratitudeEntries]); // Add the new entry to the list
      setCurrentGratitude(["", "", ""]); // Reset the input fields
      analyzeMoodAndRecommendExercise(currentGratitude); // Analyze mood and provide suggestions
    }
  };

  // Generates a pie chart SVG based on the mood distribution
  const generatePieChart = () => {
    const moodCounts = gratitudeEntries.reduce(
      (acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
        return acc;
      },
      { "😊": 0, "😌": 0, "😃": 0, "😢": 0, "😡": 0 }
    );

    const total = Object.values(moodCounts).reduce((sum, val) => sum + val, 0);
    if (total === 0) {
      return <p className="text-gray-500 text-center">No mood data available yet.</p>;
    }

    let accumulatedPercentage = 0;

    return (
      <svg
        width="200"
        height="200"
        viewBox="0 0 36 36"
        className="mx-auto relative"
      >
        {Object.entries(moodCounts).map(([mood, count], index) => {
          const percentage = (count / total) * 100;
          const start = accumulatedPercentage;
          accumulatedPercentage += percentage;

          const x1 = 18 + 15 * Math.cos(2 * Math.PI * (start / 100));
          const y1 = 18 + 15 * Math.sin(2 * Math.PI * (start / 100));
          const x2 = 18 + 15 * Math.cos(2 * Math.PI * (accumulatedPercentage / 100));
          const y2 = 18 + 15 * Math.sin(2 * Math.PI * (accumulatedPercentage / 100));

          const largeArcFlag = percentage > 50 ? 1 : 0;

          return (
            <path
              key={index}
              d={`M18 18 L${x1} ${y1} A15 15 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
              fill={["#34d399", "#60a5fa", "#fbbf24", "#f87171", "#f43f5e"][index]}
              stroke="white"
              strokeWidth="0.2"
            />
          );
        })}
        <text
          x="18"
          y="18"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="4"
          fill="#333"
        >
          Total: {total}
        </text>
      </svg>
    );
  };

  // Renders the chart legend
  const renderChartLegend = () => (
    <div className="flex justify-center mt-4 space-x-4">
      {["😊", "😌", "😃", "😢", "😡"].map((mood, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div
            className="w-4 h-4"
            style={{
              backgroundColor: ["#34d399", "#60a5fa", "#fbbf24", "#f87171", "#f43f5e"][index],
            }}
          ></div>
          <span className="text-sm">{mood}</span>
        </div>
      ))}
    </div>
  );

  // Renders suggestion and exercise if available
  const renderSuggestionAndExercise = () => (
    suggestion && (
      <Card className="mt-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg shadow animate-floating">
        <CardHeader>
          <CardTitle>Your Suggestion</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{suggestion}</p>
          <p className="mt-2 italic text-gray-600">{exercise}</p>
        </CardContent>
      </Card>
    )
  );

  return (
    <div
      className={`min-h-screen ${
        theme === "light"
          ? "bg-gradient-to-b from-blue-100 to-white text-gray-800"
          : "bg-gray-900 text-gray-100"
      } p-6`}
    >
      <header className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-blue-600 animate-pulse">
          Daily Gratitude Journal
        </h1>
        <p className="text-gray-600">Reflect, express, and grow with gratitude.</p>
      </header>

      <Card className="max-w-3xl mx-auto mb-6">
        <CardHeader>
          <CardTitle>What are you grateful for today?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[0, 1, 2].map((index) => (
              <input
                key={index}
                type="text"
                placeholder={`Gratitude #${index + 1}`}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={currentGratitude[index]}
                onChange={(e) => handleGratitudeChange(index, e.target.value)}
              />
            ))}
          </div>
        </CardContent>
        <div className="p-4 text-center">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
            onClick={saveEntry}
          >
            Save Entry
          </button>
        </div>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Mood Distribution</CardTitle>
        </CardHeader>
        <CardContent>{generatePieChart()}</CardContent>
        {renderChartLegend()}
      </Card>

      {renderSuggestionAndExercise()}
    </div>
  );
}
