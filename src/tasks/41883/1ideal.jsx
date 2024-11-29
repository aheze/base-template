// Importing necessary components and hooks
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Component to handle input fields for expense and people count
function ExpenseInput({ label, value, onChange, error }) {
  return (
    <div className="mb-4">
      <Label htmlFor={label.toLowerCase()} className="block mb-2">
        {label}
      </Label>
      <Input
        type="number"
        id={label.toLowerCase()}
        value={value}
        onChange={onChange}
        className={`w-full ${error ? "border-red-500" : ""}`}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      {/* Display validation error messages */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

// Component to display the calculated result
function ResultDisplay({ perPersonShare }) {
  return (
    <div className="mt-6 animate-fade-in">
      <Alert>
        <AlertDescription className="text-lg font-semibold">
          Each person should pay:{" "}
          <span className="text-green-600">
            {perPersonShare.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </AlertDescription>
      </Alert>
    </div>
  );
}

// Main Application Component
export default function App() {
  // State to track total expense, number of people, calculated share, and validation errors
  const [totalExpense, setTotalExpense] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [perPersonShare, setPerPersonShare] = useState(null);
  const [errors, setErrors] = useState({});

  // Function to validate input fields
  const validateInputs = () => {
    const newErrors = {};
    if (!totalExpense) newErrors.totalExpense = "Total expense is required";
    if (!numberOfPeople) newErrors.numberOfPeople = "Number of people is required";
    if (numberOfPeople && parseInt(numberOfPeople) <= 0)
      newErrors.numberOfPeople = "Number of people must be greater than 0";
    if (totalExpense && isNaN(parseFloat(totalExpense)))
      newErrors.totalExpense = "Total expense must be a valid number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to calculate the per-person share
  const handleCalculate = () => {
    if (validateInputs()) {
      const share = parseFloat(totalExpense) / parseInt(numberOfPeople);
      setPerPersonShare(share);
    }
  };

  // Function to reset all input fields and state
  const handleReset = () => {
    setTotalExpense("");
    setNumberOfPeople("");
    setPerPersonShare(null);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Expense Splitter
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Input for total expense */}
          <ExpenseInput
            label="Total Expense"
            value={totalExpense}
            onChange={(e) => setTotalExpense(e.target.value)}
            error={errors.totalExpense}
          />
          {/* Input for number of people */}
          <ExpenseInput
            label="Number of People"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            error={errors.numberOfPeople}
          />
          {/* Buttons to calculate or reset */}
          <div className="flex space-x-4">
            <Button onClick={handleCalculate} className="flex-1">
              Calculate Share
            </Button>
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Reset
            </Button>
          </div>
          {/* Display the calculated per-person share */}
          {perPersonShare !== null && <ResultDisplay perPersonShare={perPersonShare} />}
        </CardContent>
      </Card>
    </div>
  );
}
