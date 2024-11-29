// Importing necessary components
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Data for illnesses, drug information, and vital ranges
const illnesses = {
  diabetes: {
    emoji: "🍬",
    drugs: ["Metformin", "Insulin"],
    tips: "Monitor blood sugar, maintain a healthy diet, and exercise regularly.",
  },
  hypertension: {
    emoji: "❤️",
    drugs: ["ACE inhibitors", "Beta-blockers", "Diuretics"],
    tips: "Reduce salt intake, manage stress, and maintain a healthy weight.",
  },
  constipation: {
    emoji: "🍽️",
    drugs: ["Laxatives", "Fiber supplements"],
    tips: "Increase fiber intake, stay hydrated, and exercise regularly.",
  },
  tuberculosis: {
    emoji: "🫁",
    drugs: ["Isoniazid", "Rifampin"],
    tips: "Complete the full course of medication, get plenty of rest, and eat a nutritious diet.",
  },
  "sore throat": {
    emoji: "🗣️",
    drugs: ["Lozenges", "NSAIDs", "Antibiotics (if bacterial)"],
    tips: "Gargle with salt water, rest your voice, and stay hydrated.",
  },
};

const drugInfo = {
  Metformin: {
    dosage: "500-2000mg daily",
    sideEffects: "Nausea, diarrhea, stomach upset",
    contraindications: "Kidney disease, liver disease",
  },
  // Additional drug data omitted for brevity
};

const vitalRanges = [
  { vital: "Pulse Rate", range: "60-100 bpm" },
  { vital: "Respiratory Rate", range: "12-20 breaths/min" },
  { vital: "Temperature", range: "97°F - 99°F" },
];

// Component for displaying drug information
function DrugInfo({ drug }) {
  const info = drugInfo[drug];
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>{drug} 💊</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Dosage:</strong> {info.dosage}</p>
        <p><strong>Side Effects:</strong> {info.sideEffects}</p>
        <p><strong>Contraindications:</strong> {info.contraindications}</p>
      </CardContent>
    </Card>
  );
}

// Symptom Checker Component
function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");

  // Analyze symptoms and provide possible conditions
  const checkSymptoms = () => {
    const lowerSymptoms = symptoms.toLowerCase();
    if (lowerSymptoms.includes("fever") || lowerSymptoms.includes("cough")) {
      setResult("You may have a respiratory infection. Please consult a doctor.");
    } else if (lowerSymptoms.includes("headache")) {
      setResult("You might be experiencing a migraine. Rest and consider pain relievers.");
    } else {
      setResult("Unable to determine specific conditions. Consult a doctor.");
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Symptom Checker 🤒</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Enter your symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
        <Button onClick={checkSymptoms}>Check Symptoms</Button>
        {result && <p className="mt-4">{result}</p>}
      </CardContent>
    </Card>
  );
}

// Main App Component
export default function App() {
  const [selectedIllness, setSelectedIllness] = useState("");
  const [selectedDrug, setSelectedDrug] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode class on root element
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className={`min-h-screen p-4 ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"}`}>
      <Card>
        <CardHeader>
          <CardTitle>Mini Medical Assistant 🩺</CardTitle>
          <CardDescription>Access information about illnesses and treatments.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Illness Selection */}
          <div className="mb-4">
            <Label>Select an illness:</Label>
            <Select onValueChange={setSelectedIllness}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an illness" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(illnesses).map((illness) => (
                  <SelectItem key={illness} value={illness}>
                    {illnesses[illness].emoji} {illness}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Display Illness Details */}
          {selectedIllness && (
            <>
              <h3>Recommended Drugs:</h3>
              <ul>
                {illnesses[selectedIllness].drugs.map((drug) => (
                  <li key={drug}>
                    <button onClick={() => setSelectedDrug(drug)}>{drug}</button>
                  </li>
                ))}
              </ul>
              <p><strong>Tips:</strong> {illnesses[selectedIllness].tips}</p>
            </>
          )}

          {/* Display Drug Information */}
          {selectedDrug && <DrugInfo drug={selectedDrug} />}

          {/* Symptom Checker */}
          <SymptomChecker />

          {/* Vital Ranges Table */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Vital Ranges Table 📊</CardTitle>
            </CardHeader>
            <CardContent>
              <table>
                <thead>
                  <tr>
                    <th>Vital</th>
                    <th>Normal Range</th>
                  </tr>
                </thead>
                <tbody>
                  {vitalRanges.map((vital, index) => (
                    <tr key={index}>
                      <td>{vital.vital}</td>
                      <td>{vital.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Dark Mode Toggle */}
          <div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            <Label>Dark Mode</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
