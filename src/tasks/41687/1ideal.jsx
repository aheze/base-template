import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// List of pet care questions with associated metrics and weights
const petCareQuestions = [
  {
    question: "How often do you feed your pet?",
    options: ["Once a day", "Twice a day", "Whenever they ask"],
    metric: "health",
    weights: [20, 30, 10],
  },
  {
    question: "How much time do you spend playing with your pet daily?",
    options: ["Less than 30 minutes", "1-2 hours", "More than 2 hours"],
    metric: "happiness",
    weights: [10, 30, 40],
  },
  {
    question: "How often do you clean your pet's living space?",
    options: ["Weekly", "Bi-weekly", "Monthly"],
    metric: "cleanliness",
    weights: [40, 20, 10],
  },
];

export default function App() {
  const [currentPet, setCurrentPet] = useState(null); // Currently adopted pet
  const [petName, setPetName] = useState(""); // Name of the adopted pet
  const [answers, setAnswers] = useState([]); // User's answers to questions
  const [metrics, setMetrics] = useState({
    happiness: 50,
    health: 50,
    cleanliness: 50,
  }); // Pet care metrics
  const [showResults, setShowResults] = useState(false); // Toggle for showing results

  // Handle pet adoption by setting the selected pet
  const handleAdoptPet = (species) => {
    setCurrentPet({ species });
    setAnswers([]);
    setMetrics({ happiness: 50, health: 50, cleanliness: 50 });
    setShowResults(false);
  };

  // Handle answering a question and updating answers
  const handleAnswer = (index, weight) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = weight;
    setAnswers(updatedAnswers);
  };

  // Calculate metrics based on answers and update metrics state
  const calculateMetrics = () => {
    let happiness = 50;
    let health = 50;
    let cleanliness = 50;

    petCareQuestions.forEach((question, index) => {
      if (answers[index] !== undefined) {
        if (question.metric === "happiness") happiness += answers[index];
        if (question.metric === "health") health += answers[index];
        if (question.metric === "cleanliness") cleanliness += answers[index];
      }
    });

    setMetrics({
      happiness: Math.min(happiness, 100),
      health: Math.min(health, 100),
      cleanliness: Math.min(cleanliness, 100),
    });
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-100 to-white p-6">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-teal-600 animate-bounce">
          Virtual Pet Care Assistant
        </h1>
        <p className="text-gray-600">Adopt, care, and analyze your pet's well-being!</p>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">
        {/* Adoption Section */}
        {!currentPet && (
          <Card>
            <CardHeader>
              <CardTitle>Adopt a Pet</CardTitle>
              <CardDescription>Choose a pet to begin your journey.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {["Dog", "Cat", "Bird"].map((species) => (
                  <Card
                    key={species}
                    className="border hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle>{species}</CardTitle>
                    </CardHeader>
                    <CardFooter>
                      <Button
                        onClick={() => handleAdoptPet(species)}
                        className="bg-teal-500 text-white hover:bg-teal-600"
                      >
                        Adopt
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Questionnaire Section */}
        {currentPet && !showResults && (
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {petName || currentPet.species}!</CardTitle>
              <CardDescription>
                Answer these questions to analyze your pet care routine.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {petCareQuestions.map((question, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold">{question.question}</h3>
                  <div className="flex space-x-4 mt-2">
                    {question.options.map((option, optionIndex) => (
                      <Button
                        key={optionIndex}
                        onClick={() => handleAnswer(index, question.weights[optionIndex])}
                        className={`${
                          answers[index] === question.weights[optionIndex]
                            ? "bg-teal-500 text-white"
                            : "bg-gray-100"
                        } hover:bg-teal-200`}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button
                onClick={calculateMetrics}
                className="bg-teal-500 text-white hover:bg-teal-600 w-full"
              >
                Show Results
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Results Section */}
        {showResults && (
          <Card>
            <CardHeader>
              <CardTitle>Your Pet Care Analysis</CardTitle>
              <CardDescription>Here’s how well you’re caring for your pet!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(metrics).map(([metric, value]) => (
                  <div key={metric} className="text-center">
                    <h3 className="text-lg font-semibold capitalize">{metric}</h3>
                    <div className="relative h-32 w-32 mx-auto">
                      <svg
                        className="absolute inset-0"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="text-gray-200"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          strokeWidth="2"
                        />
                        <path
                          className="text-teal-500"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          strokeWidth="2"
                          strokeDasharray={`${value}, 100`}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-teal-600">
                        {value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
