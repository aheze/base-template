import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const emojis = ["😊", "😐", "😢", "😠", "😴"];
const affirmations = [
  "I am capable of amazing things.",
  "I choose to be happy.",
  "I am worthy of love and respect.",
  "I embrace new challenges with courage.",
  "I am grateful for all that I have.",
];

const MoodTracker = ({ addMood }) => {
  return (
    <div className="flex justify-around">
      {emojis.map((emoji, index) => (
        <Button
          key={index}
          onClick={() => addMood(emoji)}
          className="text-2xl p-2"
        >
          {emoji}
        </Button>
      ))}
    </div>
  );
};

const DailyReflection = ({ addReflection }) => {
  const [reflection, setReflection] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addReflection(reflection);
    setReflection("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="What made you happy today?"
      />
      <Button type="submit">Save Reflection</Button>
    </form>
  );
};

const MindfulnessExercise = () => {
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(60);
    setIsActive(false);
  };

  return (
    <div className="space-y-4">
      <div className="text-4xl font-bold text-center">{seconds}</div>
      <div className="flex justify-center space-x-2">
        <Button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</Button>
        <Button onClick={resetTimer}>Reset</Button>
      </div>
    </div>
  );
};

const ProgressTracker = ({ reflections, mindfulnessDays }) => {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm font-medium">Reflections Completed</div>
        <Progress value={(reflections / 30) * 100} className="w-full" />
      </div>
      <div>
        <div className="text-sm font-medium">Mindfulness Days</div>
        <Progress value={(mindfulnessDays / 30) * 100} className="w-full" />
      </div>
    </div>
  );
};

const AffirmationGenerator = () => {
  const [affirmation, setAffirmation] = useState(affirmations[0]);

  const generateAffirmation = () => {
    const newAffirmation =
      affirmations[Math.floor(Math.random() * affirmations.length)];
    setAffirmation(newAffirmation);
  };

  return (
    <div className="space-y-4">
      <div className="text-xl font-medium text-center">{affirmation}</div>
      <div className="flex justify-center">
        <Button onClick={generateAffirmation}>New Affirmation</Button>
      </div>
    </div>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [moods, setMoods] = useState([]);
  const [reflections, setReflections] = useState([]);
  const [mindfulnessDays, setMindfulnessDays] = useState(0);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const addMood = (mood) => {
    setMoods([...moods, { mood, date: new Date() }]);
  };

  const addReflection = (reflection) => {
    setReflections([...reflections, { reflection, date: new Date() }]);
  };

  return (
    <div className={`min-h-screen p-4 ${darkMode ? "dark" : ""}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Emotional Wellness App</h1>
          <div className="flex items-center space-x-2">
            <span>Dark Mode</span>
            <Switch
              checked={darkMode}
              onCheckedChange={() => setDarkMode(!darkMode)}
            />
          </div>
        </div>

        <Tabs defaultValue="mood" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="mood">Mood</TabsTrigger>
            <TabsTrigger value="reflection">Reflection</TabsTrigger>
            <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="affirmation">Affirmation</TabsTrigger>
          </TabsList>
          <TabsContent value="mood">
            <Card>
              <CardHeader>
                <CardTitle>Mood Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <MoodTracker addMood={addMood} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reflection">
            <Card>
              <CardHeader>
                <CardTitle>Daily Reflection</CardTitle>
              </CardHeader>
              <CardContent>
                <DailyReflection addReflection={addReflection} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="mindfulness">
            <Card>
              <CardHeader>
                <CardTitle>Mindfulness Exercise</CardTitle>
              </CardHeader>
              <CardContent>
                <MindfulnessExercise />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Progress Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <ProgressTracker
                  reflections={reflections.length}
                  mindfulnessDays={mindfulnessDays}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="affirmation">
            <Card>
              <CardHeader>
                <CardTitle>Affirmation Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <AffirmationGenerator />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}