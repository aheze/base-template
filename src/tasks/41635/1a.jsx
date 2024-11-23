import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Toggle } from "@/components/ui/toggle";

function MoodTracker() {
  const [mood, setMood] = useState(null);
  const [moods, setMoods] = useState(() => {
    const savedMoods = localStorage.getItem('moods');
    return savedMoods ? JSON.parse(savedMoods) : {};
  });

  useEffect(() => {
    localStorage.setItem('moods', JSON.stringify(moods));
  }, [moods]);

  const selectMood = (moodEmoji) => {
    const date = new Date().toISOString().split('T')[0];
    setMoods(prev => ({ ...prev, [date]: moodEmoji }));
    setMood(moodEmoji);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>How do you feel today?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-around">
          <Button variant={mood === '😊' ? 'default' : 'outline'} onClick={() => selectMood('😊')}>Happy</Button>
          <Button variant={mood === '😐' ? 'default' : 'outline'} onClick={() => selectMood('😐')}>Neutral</Button>
          <Button variant={mood === '😔' ? 'default' : 'outline'} onClick={() => selectMood('😔')}>Sad</Button>
        </div>
        <Calendar 
          mode="single" 
          selected={mood ? new Date() : null} 
          onSelect={(date) => {}} 
          markedDates={Object.keys(moods).reduce((acc, date) => ({...acc, [date]: {mood: moods[date]}}), {})}
        />
      </CardContent>
    </Card>
  );
}

function DailyReflection() {
  const [reflection, setReflection] = useState('');
  const [pastReflections, setPastReflections] = useState(() => {
    const saved = localStorage.getItem('reflections');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('reflections', JSON.stringify(pastReflections));
  }, [pastReflections]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reflection) {
      setPastReflections([...pastReflections, { text: reflection, date: new Date().toDateString() }]);
      setReflection('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Reflection</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input 
            placeholder="What made you happy today?" 
            value={reflection} 
            onChange={(e) => setReflection(e.target.value)}
          />
          <Button className="mt-2" type="submit">Save Reflection</Button>
        </form>
        <div className="mt-4">
          {pastReflections.map((ref, idx) => (
            <p key={idx}>{ref.date}: {ref.text}</p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function MindfulnessExercise() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mindfulness Timer</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <h2 className="text-4xl mb-4">{timer}s</h2>
        <Button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Start'}
        </Button>
      </CardContent>
    </Card>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-4 sm:p-8`}>
      <Toggle 
        checked={darkMode} 
        onCheckedChange={setDarkMode} 
        className="mb-6 float-right"
      >
        Dark Mode
      </Toggle>
      <h1 className="text-3xl font-bold mb-6">Emotional Wellness</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MoodTracker />
        <DailyReflection />
        <MindfulnessExercise />
        {/* Placeholder for other components like Progress Tracking, Affirmation Generator */}
      </div>
    </div>
  );
}

export default App;