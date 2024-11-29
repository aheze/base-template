import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const conditions = [
  "Diabetes",
  "Cardiac Issues",
  "Hypertension",
  "Anxiety/Stress",
  "Sleep Disorders",
  "Arthritis",
  "Asthma/Respiratory Issues"
];

const medicationSuggestions = {
  Diabetes: ["Metformin", "Insulin"],
  "Cardiac Issues": ["Beta-blockers", "ACE inhibitors"],
  Hypertension: ["Diuretics", "Calcium channel blockers"],
  "Anxiety/Stress": ["SSRIs", "Benzodiazepines"],
  "Sleep Disorders": ["Melatonin", "Zolpidem"],
  Arthritis: ["NSAIDs", "Corticosteroids"],
  "Asthma/Respiratory Issues": ["Inhaled corticosteroids", "Bronchodilators"]
};

const dietRecommendations = {
  Diabetes: "Low-carb meals and fiber-rich vegetables",
  "Cardiac Issues": "Heart-healthy diet low in sodium and rich in omega-3",
  Hypertension: "DASH diet with reduced salt intake",
  "Anxiety/Stress": "Foods rich in omega-3 and complex carbohydrates",
  "Sleep Disorders": "Avoid caffeine and heavy meals before bedtime",
  Arthritis: "Anti-inflammatory foods like fatty fish and leafy greens",
  "Asthma/Respiratory Issues": "Foods rich in vitamin D and omega-3 fatty acids"
};

function ConditionSelector({ selectedConditions, setSelectedConditions }) {
  const handleConditionChange = (condition) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  return (
    <div className="space-y-2">
      {conditions.map((condition) => (
        <div key={condition} className="flex items-center space-x-2">
          <Checkbox
            id={condition}
            checked={selectedConditions.includes(condition)}
            onCheckedChange={() => handleConditionChange(condition)}
          />
          <label htmlFor={condition} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {condition}
          </label>
        </div>
      ))}
    </div>
  );
}

function MedicationSuggestions({ selectedConditions }) {
  return (
    <div className="space-y-4">
      {selectedConditions.map((condition) => (
        <Card key={condition}>
          <CardHeader>
            <CardTitle>{condition}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              {medicationSuggestions[condition].map((medication) => (
                <li key={medication}>{medication}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function DietRecommendations({ selectedConditions }) {
  return (
    <div className="space-y-4">
      {selectedConditions.map((condition) => (
        <Card key={condition}>
          <CardHeader>
            <CardTitle>{condition}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{dietRecommendations[condition]}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ReminderSystem() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");

  const addReminder = () => {
    if (newReminder.trim()) {
      setReminders([...reminders, newReminder.trim()]);
      setNewReminder("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
          placeholder="Add a new reminder"
        />
        <Button onClick={addReminder}>Add</Button>
      </div>
      <ul className="space-y-2">
        {reminders.map((reminder, index) => (
          <li key={index} className="flex items-center justify-between">
            <span>{reminder}</span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setReminders(reminders.filter((_, i) => i !== index))}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HealthTipOfTheDay() {
  const [tip, setTip] = useState("");

  useEffect(() => {
    const tips = [
      "Stay hydrated by drinking at least 8 glasses of water a day.",
      "Take short breaks to stretch and move around if you sit for long periods.",
      "Practice deep breathing exercises to reduce stress and improve focus.",
      "Aim for 7-9 hours of sleep each night for optimal health.",
      "Include a variety of colorful fruits and vegetables in your diet.",
    ];
    setTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Tip of the Day</CardTitle>
      </CardHeader>
      <CardContent>{tip}</CardContent>
    </Card>
  );
}

export default function App() {
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen p-4 sm:p-6 ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Health Companion</h1>
          <div className="flex items-center space-x-2">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
        </div>

        <HealthTipOfTheDay />

        <Tabs defaultValue="conditions">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="conditions">Conditions</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="diet">Diet</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>
          <TabsContent value="conditions">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Conditions</CardTitle>
                <CardDescription>Choose the conditions that apply to you.</CardDescription>
              </CardHeader>
              <CardContent>
                <ConditionSelector
                  selectedConditions={selectedConditions}
                  setSelectedConditions={setSelectedConditions}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="medications">
            <MedicationSuggestions selectedConditions={selectedConditions} />
          </TabsContent>
          <TabsContent value="diet">
            <DietRecommendations selectedConditions={selectedConditions} />
          </TabsContent>
          <TabsContent value="reminders">
            <Card>
              <CardHeader>
                <CardTitle>Reminders</CardTitle>
                <CardDescription>Set reminders for medications and meals.</CardDescription>
              </CardHeader>
              <CardContent>
                <ReminderSystem />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Disclaimer: This app is for educational purposes only and is not a substitute for professional medical advice. Always consult with a healthcare provider before making changes to your medication or diet.
            </p>
          </CardContent>
        </Card>

        <Button className="w-full">Contact Pharmacist</Button>
      </div>
    </div>
  );
}