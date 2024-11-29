import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Predefined health conditions and their respective recommendations
const conditionsData = {
  Diabetes: {
    medications: [
      { name: "Metformin", dosage: "500mg twice daily", sideEffects: "Nausea, diarrhea" },
      { name: "Insulin", dosage: "As prescribed by a doctor", sideEffects: "Low blood sugar" },
    ],
    diet: ["Low-carb meals", "Fiber-rich vegetables", "Avoid sugary foods"],
  },
  "Cardiac Issues": {
    medications: [
      { name: "Beta-blockers", dosage: "50mg daily", sideEffects: "Fatigue, dizziness" },
      { name: "ACE inhibitors", dosage: "10mg daily", sideEffects: "Dry cough" },
    ],
    diet: ["Low-sodium meals", "Omega-3 rich foods", "Avoid saturated fats"],
  },
  Hypertension: {
    medications: [
      { name: "Diuretics", dosage: "25mg daily", sideEffects: "Frequent urination" },
      { name: "Calcium channel blockers", dosage: "10mg daily", sideEffects: "Swelling, fatigue" },
    ],
    diet: ["DASH diet", "Reduce salt intake", "High-potassium foods"],
  },
  "Anxiety/Stress": {
    medications: [
      { name: "SSRIs", dosage: "20mg daily", sideEffects: "Weight changes, insomnia" },
      { name: "Benzodiazepines", dosage: "As needed", sideEffects: "Drowsiness, dependency risk" },
    ],
    diet: ["Magnesium-rich foods", "Omega-3 sources", "Herbal teas"],
  },
  "Sleep Disorders": {
    medications: [
      { name: "Melatonin", dosage: "3mg before bedtime", sideEffects: "Drowsiness, headache" },
      { name: "Sedatives", dosage: "As prescribed", sideEffects: "Dependency risk" },
    ],
    diet: ["Avoid caffeine", "Light meals in the evening", "Chamomile tea"],
  },
  Arthritis: {
    medications: [
      { name: "NSAIDs", dosage: "200mg twice daily", sideEffects: "Stomach upset" },
      { name: "DMARDs", dosage: "As prescribed", sideEffects: "Infection risk" },
    ],
    diet: ["Anti-inflammatory foods", "Omega-3 rich fish", "Whole grains"],
  },
  "Asthma/Respiratory Issues": {
    medications: [
      { name: "Inhaled corticosteroids", dosage: "As prescribed", sideEffects: "Throat irritation" },
      { name: "Bronchodilators", dosage: "As needed", sideEffects: "Tremors, increased heart rate" },
    ],
    diet: ["Vitamin C rich foods", "Omega-3 sources", "Avoid dairy"],
  },
};

export default function App() {
  // State to manage selected conditions
  const [selectedConditions, setSelectedConditions] = useState([]);
  // State to capture user-added custom symptoms
  const [customSymptoms, setCustomSymptoms] = useState("");
  // State to toggle visibility of recommendations
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Function to add/remove a condition from the selected list
  const toggleCondition = (condition) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition) // Remove if already selected
        : [...prev, condition] // Add if not selected
    );
  };

  // Function to show recommendations for selected conditions
  const handleGetRecommendations = () => {
    setShowRecommendations(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-800 p-6">
      {/* App Header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-blue-600">Health Companion</h1>
        <p className="text-gray-600">Manage your health with personalized insights.</p>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">
        {/* User Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Select Your Health Conditions</CardTitle>
            <CardDescription>
              Choose from the list or add your own symptoms.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(conditionsData).map((condition) => (
                <Button
                  key={condition}
                  onClick={() => toggleCondition(condition)}
                  className={`${
                    selectedConditions.includes(condition) ? "bg-blue-500 text-white" : ""
                  } border border-blue-500 rounded-md py-2 px-4`}
                >
                  {condition}
                </Button>
              ))}
            </div>
            <Input
              type="text"
              placeholder="Add custom symptoms"
              value={customSymptoms}
              onChange={(e) => setCustomSymptoms(e.target.value)}
              className="mt-4"
            />
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleGetRecommendations}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Get Recommendations
            </Button>
          </CardFooter>
        </Card>

        {/* Recommendations Section */}
        {showRecommendations && (
          <div className="space-y-6">
            {selectedConditions.map((condition) => (
              <Card key={condition}>
                <CardHeader>
                  <CardTitle>{condition}</CardTitle>
                  <CardDescription>Recommendations for managing {condition}.</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold">Medications</h3>
                  <ul className="list-disc ml-5 mb-4">
                    {conditionsData[condition].medications.map((med, idx) => (
                      <li key={idx}>
                        <strong>{med.name}</strong>: {med.dosage} (
                        {med.sideEffects})
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-lg font-semibold">Diet Plan</h3>
                  <ul className="list-disc ml-5">
                    {conditionsData[condition].diet.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">
                    Disclaimer: These suggestions are for educational purposes only. Consult a
                    medical professional for advice.
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
