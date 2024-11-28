import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AnimatedNumber = ({ number }) => {
  const [animatedNumber, setAnimatedNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedNumber((prev) => {
        if (prev < number) return prev + 1;
        clearInterval(interval);
        return number;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [number]);

  return (
    <span className="text-6xl font-bold text-primary animate-pulse">
      {animatedNumber}
    </span>
  );
};

export default function App() {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [randomNumber, setRandomNumber] = useState(null);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRandomNumber = () => {
    setError("");
    const minNum = parseInt(min);
    const maxNum = parseInt(max);

    if (isNaN(minNum) || isNaN(maxNum)) {
      setError("Please enter valid numbers for both min and max.");
      return;
    }

    if (minNum >= maxNum) {
      setError("Min must be smaller than max.");
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const newRandomNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      setRandomNumber(newRandomNumber);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Random Number Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="min" className="block text-sm font-medium text-gray-700 mb-1">
                Min
              </label>
              <Input
                id="min"
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder="Enter min"
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="max" className="block text-sm font-medium text-gray-700 mb-1">
                Max
              </label>
              <Input
                id="max"
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder="Enter max"
                className="w-full"
              />
            </div>
          </div>
          <Button
            onClick={generateRandomNumber}
            className="w-full bg-primary hover:bg-primary-dark transition-colors"
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Random Number"}
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {randomNumber !== null && (
            <div className="text-center mt-6 space-y-2">
              <p className="text-lg font-semibold">Generated Number:</p>
              <AnimatedNumber number={randomNumber} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}