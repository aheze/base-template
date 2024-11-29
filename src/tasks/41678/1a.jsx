import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const affirmations = ["I am capable", "I am grateful for my journey", "Every day is a fresh start"];

function DailyGratitude() {
  const [entries, setEntries] = useState(() => JSON.parse(localStorage.getItem('gratitudeEntries')) || []);
  const [gratitude, setGratitude] = useState(['', '', '']);
  const [mood, setMood] = useState(5);
  const [affirmation, setAffirmation] = useState(affirmations[Math.floor(Math.random() * affirmations.length)]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    localStorage.setItem('gratitudeEntries', JSON.stringify(entries));
    const today = new Date().toDateString();
    if (!entries.some(e => e.date === today)) {
      setStreak(prev => entries.some(e => e.date === new Date(Date.now() - 86400000).toDateString()) ? prev + 1 : 1);
    }
  }, [entries]);

  const addEntry = () => {
    setEntries(prev => [...prev, { date: new Date().toDateString(), gratitude, mood }]);
    setGratitude(['', '', '']);
    setMood(5);
  };

  return (
    <Card className="max-w-lg mx-auto mt-5 p-4">
      <CardHeader>
        <CardTitle>Daily Gratitude Journal</CardTitle>
        <CardDescription>{affirmation}</CardDescription>
      </CardHeader>
      <CardContent>
        {gratitude.map((item, idx) => (
          <Input 
            key={idx}
            placeholder={`What made you smile today? #${idx + 1}`}
            value={item}
            onChange={e => setGratitude(gratitude.map((v, i) => i === idx ? e.target.value : v))}
            className="mb-2"
          />
        ))}
        <div className="mt-4">
          <label className="block mb-2">How do you feel today?</label>
          <Slider 
            defaultValue={[mood]} 
            onValueChange={setMood} 
            max={10} 
            step={1}
            className="mb-4"
          />
        </div>
        <Button onClick={addEntry}>Submit Entry</Button>
      </CardContent>
      <CardFooter>
        <p>Current Streak: {streak} days</p>
      </CardFooter>
    </Card>
  );
}

function MoodVisualizer({ mood }) {
  const moodFaces = ['😢', '😌', '😊', '😄', '😁'];
  return <span>{moodFaces[Math.floor((mood - 1) / 2)]}</span>;
}

function History() {
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('gratitudeEntries')) || []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Your Journey</h2>
      {history.map((entry, idx) => (
        <Card key={idx} className="mb-2">
          <CardContent>
            <p>{entry.date}</p>
            {entry.gratitude.map((g, i) => <p key={i}>{g}</p>)}
            <MoodVisualizer mood={entry.mood} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('journal');

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <nav className="p-4 flex justify-between bg-primary text-primary-foreground">
        <Button variant="outline" onClick={() => setView('journal')}>Journal</Button>
        <Button variant="outline" onClick={() => setView('history')}>History</Button>
      </nav>
      {view === 'journal' ? <DailyGratitude /> : <History />}
    </div>
  );
}