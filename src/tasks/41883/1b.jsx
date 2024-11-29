import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

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

export default function App() {
  const [totalExpense, setTotalExpense] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [perPersonShare, setPerPersonShare] = useState(null);
  const [errors, setErrors] = useState({});

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

  const handleCalculate = () => {
    if (validateInputs()) {
      const share = parseFloat(totalExpense) / parseInt(numberOfPeople);
      setPerPersonShare(share);
    }
  };

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
          <ExpenseInput
            label="Total Expense"
            value={totalExpense}
            onChange={(e) => setTotalExpense(e.target.value)}
            error={errors.totalExpense}
          />
          <ExpenseInput
            label="Number of People"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            error={errors.numberOfPeople}
          />
          <div className="flex space-x-4">
            <Button onClick={handleCalculate} className="flex-1">
              Calculate Share
            </Button>
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Reset
            </Button>
          </div>
          {perPersonShare !== null && <ResultDisplay perPersonShare={perPersonShare} />}
        </CardContent>
      </Card>
    </div>
  );
}