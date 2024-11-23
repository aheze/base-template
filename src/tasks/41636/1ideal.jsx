import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
  Insulin: {
    dosage: "Varies based on individual needs",
    sideEffects: "Hypoglycemia, weight gain",
    contraindications: "None, but requires careful monitoring",
  },
  "ACE inhibitors": {
    dosage: "Varies by specific drug",
    sideEffects: "Dry cough, dizziness",
    contraindications: "Pregnancy, history of angioedema",
  },
  "Beta-blockers": {
    dosage: "Varies by specific drug",
    sideEffects: "Fatigue, cold hands and feet",
    contraindications: "Asthma, certain heart conditions",
  },
  Diuretics: {
    dosage: "Varies by specific drug",
    sideEffects: "Frequent urination, electrolyte imbalance",
    contraindications: "Gout, certain kidney problems",
  },
  Laxatives: {
    dosage: "Follow package instructions",
    sideEffects: "Abdominal cramps, dehydration if overused",
    contraindications: "Intestinal obstruction, undiagnosed abdominal pain",
  },
  "Fiber supplements": {
    dosage: "Follow package instructions",
    sideEffects: "Bloating, gas",
    contraindications: "None for most people",
  },
  Isoniazid: {
    dosage: "300mg daily for adults",
    sideEffects: "Liver damage, peripheral neuropathy",
    contraindications: "Severe liver disease",
  },
  Rifampin: {
    dosage: "600mg daily for adults",
    sideEffects: "Orange discoloration of body fluids, liver damage",
    contraindications: "Certain liver conditions",
  },
  Lozenges: {
    dosage: "1 lozenge every 2-3 hours as needed",
    sideEffects: "None significant",
    contraindications: "None for most people",
  },
  NSAIDs: {
    dosage: "Varies by specific drug",
    sideEffects: "Stomach upset, increased bleeding risk",
    contraindications: "Ulcers, bleeding disorders",
  },
  "Antibiotics (if bacterial)": {
    dosage: "Varies by specific antibiotic",
    sideEffects: "Nausea, diarrhea, allergic reactions",
    contraindications: "Allergies to specific antibiotics",
  },
};

const vitalRanges = [
  { vital: "Pulse Rate", range: "60-100 bpm" },
  { vital: "Respiratory Rate", range: "12-20 breaths/min" },
  { vital: "Temperature", range: "97°F - 99°F (36.1°C - 37.2°C)" },
  { vital: "Hemoglobin Level", range: "13.8-17.2 g/dL (men), 12.1-15.1 g/dL (women)" },
];

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

function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");

  const checkSymptoms = () => {
    const lowerSymptoms = symptoms.toLowerCase();
    if (lowerSymptoms.includes("fever") || lowerSymptoms.includes("cough")) {
      setResult("You may have a respiratory infection. Please consult a doctor.");
    } else if (lowerSymptoms.includes("headache") || lowerSymptoms.includes("nausea")) {
      setResult("You might be experiencing a migraine. Rest in a dark room and consider over-the-counter pain relievers.");
    } else {
      setResult("Based on the limited information, we can't determine a specific condition. Please consult a healthcare professional.");
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
          className="mb-4"
        />
        <Button onClick={checkSymptoms}>Check Symptoms</Button>
        {result && <p className="mt-4">{result}</p>}
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [selectedIllness, setSelectedIllness] = useState("");
  const [selectedDrug, setSelectedDrug] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen p-4 ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"}`}>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Mini Medical Assistant 🩺</CardTitle>
          <CardDescription>Quickly access information about illnesses and treatments.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="illness-select">Select an illness:</Label>
            <Select onValueChange={setSelectedIllness}>
              <SelectTrigger id="illness-select">
                <SelectValue placeholder="Choose an illness" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(illnesses).map((illness) => (
                  <SelectItem key={illness} value={illness}>
                    {illnesses[illness].emoji} {illness.charAt(0).toUpperCase() + illness.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedIllness && (
            <>
              <h3 className="text-lg font-semibold mt-4">Recommended Drugs:</h3>
              <ul className="list-disc pl-5 mt-2">
                {illnesses[selectedIllness].drugs.map((drug) => (
                  <li key={drug} className="mt-1">
                    <button
                      onClick={() => setSelectedDrug(drug)}
                      className="text-blue-600 hover:underline focus:outline-none"
                    >
                      {drug}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-4"><strong>Tips:</strong> {illnesses[selectedIllness].tips}</p>
            </>
          )}

          {selectedDrug && <DrugInfo drug={selectedDrug} />}

          <SymptomChecker />

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Vital Ranges Table 📊</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="table-auto w-full border-collapse border border-gray-300 text-gray-800 bg-white rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Vital</th>
                    <th className="border border-gray-300 px-4 py-2">Normal Range</th>
                  </tr>
                </thead>
                <tbody>
                  {vitalRanges.map((vital, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                      <td className="border border-gray-300 px-4 py-2">{vital.vital}</td>
                      <td className="border border-gray-300 px-4 py-2">{vital.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <div className="flex items-center space-x-2 mt-4">
            <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Disclaimer: This app is for informational purposes only and is not a substitute for professional medical advice. Always seek the advice of your physician for medical concerns.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
