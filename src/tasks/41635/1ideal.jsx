// Import necessary modules and components
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
import { Textarea } from "@/components/ui/textarea";

// Constants for moods, affirmations, and meditation guides
const MOOD_OPTIONS = [
  { emoji: "😀", mood: "Happy" },
  { emoji: "😔", mood: "Sad" },
  { emoji: "😌", mood: "Calm" },
  { emoji: "😡", mood: "Angry" },
  { emoji: "😴", mood: "Tired" },
];

const AFFIRMATIONS = [
  "You are capable of amazing things.",
  "Take it one step at a time.",
  "You are stronger than you think.",
  "Your feelings are valid.",
  "You are enough just as you are.",
];

const MEDITATION_GUIDES = {
  focus: "Imagine a calm forest with gentle sounds of nature. Focus on your breathing, in through your nose, out through your mouth.",
  stress: "Close your eyes and imagine waves crashing on a beach. Take deep breaths and let the tension release with each exhale.",
  sleep: "Picture a quiet, starry sky. Take slow, deep breaths, and let the day's worries fade away.",
};

// Component for mood tracking
function MoodTracker({ onMoodSelect, moodLog }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Tracker</CardTitle>
        <CardDescription>How are you feeling today?</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {MOOD_OPTIONS.map((option) => (
          <Button
            key={option.mood}
            onClick={() => onMoodSelect(option.mood)}
            className="w-12 h-12 text-xl"
          >
            {option.emoji}
          </Button>
        ))}
      </CardContent>
      <CardFooter>
        <p className="text-sm">
          Last logged mood: {moodLog.length ? moodLog[moodLog.length - 1] : "None"}
        </p>
      </CardFooter>
    </Card>
  );
}

// Component for daily reflections
function DailyReflections({ onReflectionSubmit, reflections }) {
  const [reflection, setReflection] = useState("");

  const handleSubmit = () => {
    if (reflection) {
      onReflectionSubmit(reflection);
      setReflection("");
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Daily Reflections</CardTitle>
        <CardDescription>What’s on your mind today?</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write about your day..."
          className="w-full"
        />
        <Button onClick={handleSubmit} className="mt-4">
          Save Reflection
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-sm">Reflections logged: {reflections.length}</p>
      </CardFooter>
    </Card>
  );
}

// Component for mindfulness exercises
function MindfulnessExercises() {
  const [guide, setGuide] = useState("");

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Mindfulness Exercises</CardTitle>
        <CardDescription>Choose an exercise to relax and focus.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          {Object.keys(MEDITATION_GUIDES).map((type) => (
            <Button key={type} onClick={() => setGuide(MEDITATION_GUIDES[type])}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
        {guide && <p className="mt-4 text-sm">{guide}</p>}
      </CardContent>
    </Card>
  );
}

// Component for daily affirmations
function AffirmationGenerator() {
  const [affirmation, setAffirmation] = useState("");

  const generateAffirmation = () => {
    const random = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
    setAffirmation(random);
  };

  useEffect(() => {
    generateAffirmation();
  }, []);

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Daily Affirmation</CardTitle>
        <CardDescription>Let positivity guide your day.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{affirmation}</p>
        <Button onClick={generateAffirmation} className="mt-4">
          New Affirmation
        </Button>
      </CardContent>
    </Card>
  );
}

// Component for tracking user progress
function ProgressTracking({ moodLog, reflections }) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Progress Tracking</CardTitle>
        <CardDescription>Your journey at a glance.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Moods logged: {moodLog.length}</p>
        <p>Reflections completed: {reflections.length}</p>
      </CardContent>
    </Card>
  );
}

// Main app component
export default function App() {
  const [moodLog, setMoodLog] = useState([]);
  const [reflections, setReflections] = useState([]);

  const handleMoodSelect = (mood) => setMoodLog([...moodLog, mood]);
  const handleReflectionSubmit = (reflection) =>
    setReflections([...reflections, reflection]);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Emotional Wellness App 🌿</h1>
      <MoodTracker onMoodSelect={handleMoodSelect} moodLog={moodLog} />
      <DailyReflections
        onReflectionSubmit={handleReflectionSubmit}
        reflections={reflections}
      />
      <MindfulnessExercises />
      <AffirmationGenerator />
      <ProgressTracking moodLog={moodLog} reflections={reflections} />
    </div>
  );
}
