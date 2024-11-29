import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const medicalTerms = {
  "Hypertension": "High blood pressure, a condition in which the force of blood against artery walls is too high.",
  "Antibiotics": "Medications used to treat bacterial infections by killing or inhibiting the growth of bacteria.",
  "BMI": "Body Mass Index, a measure of body fat based on height and weight.",
  "BMR": "Basal Metabolic Rate, the number of calories your body burns at rest.",
};

const symptoms = {
  "Headache": ["Tension headache", "Migraine", "Sinusitis"],
  "Fever": ["Flu", "Common cold", "COVID-19"],
  "Fatigue": ["Anemia", "Depression", "Chronic fatigue syndrome"],
};

const healthTips = [
  "Drink at least 8 glasses of water daily.",
  "Aim for 7-9 hours of sleep each night.",
  "Include fruits and vegetables in every meal.",
  "Take short breaks to stretch during long periods of sitting.",
];

function DictionarySearch() {
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");

  const handleSearch = () => {
    setDefinition(medicalTerms[term] || "Term not found");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Dictionary</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Enter a medical term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <Button onClick={handleSearch} className="mt-2">Search</Button>
        {definition && (
          <p className="mt-4">{definition}</p>
        )}
      </CardContent>
    </Card>
  );
}

function SymptomChecker() {
  const [symptom, setSymptom] = useState("");
  const [conditions, setConditions] = useState([]);

  const handleCheck = () => {
    setConditions(symptoms[symptom] || []);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Symptom Checker</CardTitle>
        <CardDescription>For educational purposes only. Not a substitute for medical advice.</CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Enter a symptom"
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
        />
        <Button onClick={handleCheck} className="mt-2">Check</Button>
        {conditions.length > 0 && (
          <ul className="mt-4">
            {conditions.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function HealthCalculators() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [bmi, setBmi] = useState(null);
  const [bmr, setBmr] = useState(null);

  const calculateBMI = () => {
    const bmiValue = (weight / ((height / 100) ** 2)).toFixed(2);
    setBmi(bmiValue);
  };

  const calculateBMR = () => {
    let bmrValue;
    if (gender === "male") {
      bmrValue = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmrValue = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    setBmr(bmrValue.toFixed(2));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Calculators</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="mb-2"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="mb-2 p-2 border rounded"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <Button onClick={calculateBMI} className="mr-2">Calculate BMI</Button>
        <Button onClick={calculateBMR}>Calculate BMR</Button>
        {bmi && <p className="mt-2">BMI: {bmi}</p>}
        {bmr && <p>BMR: {bmr} calories/day</p>}
      </CardContent>
    </Card>
  );
}

function DailyTip() {
  const [tip, setTip] = useState("");

  useEffect(() => {
    const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
    setTip(randomTip);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Health Tip</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{tip}</p>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen p-4 ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Medical Educational App</h1>
          <div className="flex items-center">
            <Label htmlFor="dark-mode" className="mr-2">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
        </header>

        <Tabs defaultValue="dictionary" className="mb-8">
          <TabsList>
            <TabsTrigger value="dictionary">Dictionary</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="calculators">Calculators</TabsTrigger>
          </TabsList>
          <TabsContent value="dictionary">
            <DictionarySearch />
          </TabsContent>
          <TabsContent value="symptoms">
            <SymptomChecker />
          </TabsContent>
          <TabsContent value="calculators">
            <HealthCalculators />
          </TabsContent>
        </Tabs>

        <DailyTip />

        <footer className="mt-8 text-center text-sm">
          <p>© 2023 Medical Educational App. For educational purposes only.</p>
        </footer>
      </div>
    </div>
  );
}