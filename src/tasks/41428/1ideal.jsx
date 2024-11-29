import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// A collection of medical terms with their definitions, symptoms, and treatments
const medicalTerms = {
  Hypertension: {
    definition: "High blood pressure.",
    symptoms: ["Headache", "Blurred vision", "Chest pain"],
    treatments: ["Lifestyle changes", "Medication"],
  },
  Antibiotics: {
    definition: "Drugs used to treat bacterial infections by killing or inhibiting bacterial growth.",
    uses: ["Treating infections", "Preventing infections post-surgery"],
  },
};

// A list of daily health tips
const dailyHealthTips = [
  "Drink at least 8 cups of water daily.",
  "Exercise for 30 minutes a day to stay active.",
  "Reduce stress by practicing mindfulness or meditation.",
];

function MedicalDictionary() {
  // State to hold the search input
  const [search, setSearch] = useState("");
  const term = medicalTerms[search] || null; // Lookup for the searched term

  return (
    <Card className="max-w-lg mx-auto mb-4">
      <CardHeader>
        <CardTitle>Medical Dictionary</CardTitle>
        <CardDescription>Search common terms and their meanings</CardDescription>
      </CardHeader>
      <CardContent>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Search medical terms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {term ? (
          <div>
            <h3 className="text-lg font-semibold">{search}</h3>
            <p>{term.definition}</p>
            {term.symptoms && (
              <div>
                <strong>Symptoms:</strong>
                <ul className="list-disc ml-4">
                  {term.symptoms.map((symptom, idx) => (
                    <li key={idx}>{symptom}</li>
                  ))}
                </ul>
              </div>
            )}
            {term.treatments && (
              <div>
                <strong>Treatments:</strong>
                <ul className="list-disc ml-4">
                  {term.treatments.map((treatment, idx) => (
                    <li key={idx}>{treatment}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          search && <p className="text-red-500">Term not found.</p>
        )}
      </CardContent>
    </Card>
  );
}

function SymptomChecker() {
  // State to manage symptom input and the determined condition
  const [symptom, setSymptom] = useState("");
  const [condition, setCondition] = useState(null);

  // Check symptoms to provide a potential condition
  const handleCheck = () => {
    if (symptom.toLowerCase().includes("headache")) {
      setCondition("Potential Condition: Migraine or Hypertension");
    } else {
      setCondition("No matching condition found.");
    }
  };

  return (
    <Card className="max-w-lg mx-auto mb-4">
      <CardHeader>
        <CardTitle>Symptom Checker</CardTitle>
        <CardDescription>
          Enter symptoms to explore potential conditions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your symptom..."
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleCheck}
        >
          Check
        </button>
        {condition && (
          <div className="mt-4">
            <p>{condition}</p>
            <p className="text-sm text-gray-500">
              Disclaimer: This tool is for educational purposes only.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function HealthCalculators() {
  // State for user inputs: height, weight, and BMI result
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  // Calculate BMI based on height and weight
  const calculateBMI = () => {
    const bmi = weight / ((height / 100) ** 2);
    setResult(`Your BMI is ${bmi.toFixed(2)}`);
  };

  return (
    <Card className="max-w-lg mx-auto mb-4">
      <CardHeader>
        <CardTitle>Health Calculators</CardTitle>
        <CardDescription>Calculate BMI and other metrics.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Height in cm"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={calculateBMI}
          >
            Calculate BMI
          </button>
          {result && <p>{result}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

function DailyTips() {
  // Displays daily health tips
  return (
    <Card className="max-w-lg mx-auto mb-4">
      <CardHeader>
        <CardTitle>Daily Health Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc ml-4">
          {dailyHealthTips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function Dashboard({ onToggleTheme }) {
  // The main dashboard that integrates all components
  return (
    <div>
      <MedicalDictionary />
      <SymptomChecker />
      <HealthCalculators />
      <DailyTips />
      <button
        className="fixed bottom-4 right-4 bg-gray-700 text-white py-2 px-4 rounded"
        onClick={onToggleTheme}
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default function App() {
  // State to manage dark mode
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen p-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <Dashboard onToggleTheme={() => setDarkMode((prev) => !prev)} />
    </div>
  );
}
