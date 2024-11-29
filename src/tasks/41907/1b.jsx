import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const TableRow = ({ number, multiplier, result }) => (
  <div className="grid grid-cols-3 gap-4 py-2 border-b last:border-b-0">
    <span>{number}</span>
    <span>x {multiplier}</span>
    <span className="font-bold">{result}</span>
  </div>
);

const MultiplicationTable = ({ number }) => {
  return (
    <div className="animate-fade-in">
      {[...Array(10)].map((_, index) => (
        <TableRow
          key={index + 1}
          number={number}
          multiplier={index + 1}
          result={number * (index + 1)}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [inputNumber, setInputNumber] = useState("");
  const [generatedNumber, setGeneratedNumber] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setInputNumber(e.target.value);
    setError("");
  };

  const handleGenerate = () => {
    const num = parseInt(inputNumber);
    if (isNaN(num) || inputNumber.trim() === "") {
      setError("Please enter a valid number");
      setGeneratedNumber(null);
    } else {
      setGeneratedNumber(num);
      setError("");
    }
  };

  const handleReset = () => {
    setInputNumber("");
    setGeneratedNumber(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Multiplication Table Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter a number"
                value={inputNumber}
                onChange={handleInputChange}
                className="flex-grow"
              />
              <Button onClick={handleGenerate}>Generate</Button>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {generatedNumber !== null && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">
                  Multiplication Table for {generatedNumber}:
                </h3>
                <MultiplicationTable number={generatedNumber} />
                <Button onClick={handleReset} className="mt-4 w-full">
                  Reset
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}