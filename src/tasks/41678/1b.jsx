import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const emojis = ["😢", "😕", "😐", "🙂", "😄"];
const affirmations = [
  "I am capable of great things",
  "I am grateful for my journey",
  "I choose to be positive today",
  "I am worthy of love and respect",
  "I embrace the beauty in each day",
];

const GratitudePrompt = ({ onSave }) => {
  const [entries, setEntries] = useState(["", "", ""]);

  const handleChange = (index, value) => {
    const newEntries = [...entries];
    newEntries[index] = value;
    setEntries(newEntries);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Daily Gratitude</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">What are you grateful for today?</p>
        {entries.map((entry, index) => (
          <Input
            key={index}
            className="mb-2"
            placeholder={`Gratitude ${index + 1}`}
            value={entry}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        ))}
        <Button onClick={() => onSave(entries)}>Save Entries</Button>
      </CardContent>
    </Card>
  );
};

const MoodTracker = ({ onSave }) => {
  const [mood, setMood] = useState(2);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Mood Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2">
          {emojis.map((emoji, index) => (
            <span key={index} className="text-2xl">
              {emoji}
            </span>
          ))}
        </div>
        <Slider
          min={0}
          max={4}
          step={1}
          value={[mood]}
          onValueChange={(value) => setMood(value[0])}
        />
        <div className="mt-4 text-center">
          <span className="text-4xl">{emojis[mood]}</span>
        </div>
        <Button className="mt-4" onClick={() => onSave(mood)}>
          Save Mood
        </Button>
      </CardContent>
    </Card>
  );
};

const ReflectionJournal = ({ entries }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>Reflection Journal</CardTitle>
    </CardHeader>
    <CardContent>
      <Calendar
        mode="single"
        selected={new Date()}
        className="rounded-md border"
      />
      <div className="mt-4">
        <h3 className="font-semibold">Recent Entries</h3>
        {entries.map((entry, index) => (
          <div key={index} className="mt-2">
            <Badge>{new Date().toLocaleDateString()}</Badge>
            <p>{entry}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const PositiveAffirmation = () => {
  const [affirmation, setAffirmation] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setAffirmation(affirmations[randomIndex]);
  }, []);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Daily Affirmation</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-xl italic">{affirmation}</p>
      </CardContent>
    </Card>
  );
};

const ThemeToggle = ({ darkMode, onToggle }) => (
  <div className="flex items-center justify-end mb-4">
    <span className="mr-2">Dark Mode</span>
    <Switch checked={darkMode} onCheckedChange={onToggle} />
  </div>
);

const StreakTracker = ({ streak }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>Streak Tracker</CardTitle>
    </CardHeader>
    <CardContent>
      <Progress value={(streak / 7) * 100} className="w-full" />
      <p className="mt-2 text-center">
        {streak} day{streak !== 1 ? "s" : ""} streak!
      </p>
      {streak >= 7 && (
        <p className="mt-2 text-center font-semibold text-green-500">
          Congratulations on your 7-day streak! 🎉
        </p>
      )}
    </CardContent>
  </Card>
);

const MindfulnessExercise = () => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>Mindfulness Exercise</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="mb-4">Take a moment to breathe and relax:</p>
      <ol className="list-decimal list-inside">
        <li>Close your eyes</li>
        <li>Take a deep breath in for 4 seconds</li>
        <li>Hold for 4 seconds</li>
        <li>Exhale slowly for 4 seconds</li>
        <li>Repeat 3 times</li>
      </ol>
    </CardContent>
  </Card>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [entries, setEntries] = useState([]);
  const [streak, setStreak] = useState(0);

  const saveGratitudeEntries = (newEntries) => {
    setEntries([...entries, newEntries.join(", ")]);
    setStreak(streak + 1);
  };

  const saveMood = (mood) => {
    console.log("Mood saved:", emojis[mood]);
  };

  return (
    <div className={`min-h-screen p-4 ${darkMode ? "dark bg-gray-800 text-white" : "bg-gray-100"}`}>
      <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
      <h1 className="text-3xl font-bold text-center mb-6">Daily Gratitude Journal</h1>
      <div className="max-w-md mx-auto">
        <GratitudePrompt onSave={saveGratitudeEntries} />
        <MoodTracker onSave={saveMood} />
        <ReflectionJournal entries={entries} />
        <PositiveAffirmation />
        <StreakTracker streak={streak} />
        <MindfulnessExercise />
      </div>
    </div>
  );
}