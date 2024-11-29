// Importing necessary components and hooks
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Tip Calculator Component
const TipCalculator = () => {
  // State for bill amount, tip percentage, calculated tip, total bill, and error message
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState("");
  const [tipAmount, setTipAmount] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [error, setError] = useState("");

  // Automatically calculate tip when bill amount or tip percentage changes
  useEffect(() => {
    if (billAmount && tipPercentage) {
      calculateTip();
    }
  }, [billAmount, tipPercentage]);

  // Function to calculate the tip and total bill
  const calculateTip = () => {
    const bill = parseFloat(billAmount); // Parse bill amount as a float
    const tip = parseFloat(tipPercentage); // Parse tip percentage as a float

    // Validate inputs to ensure positive numbers
    if (isNaN(bill) || isNaN(tip) || bill < 0 || tip < 0) {
      setError("Please enter valid positive numbers.");
      return;
    }

    // Clear any existing error
    setError("");

    // Calculate the tip amount and total bill
    const calculatedTip = (bill * tip) / 100;
    const total = bill + calculatedTip;

    // Update state with formatted results
    setTipAmount(calculatedTip.toFixed(2));
    setTotalBill(total.toFixed(2));
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Tip Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Input field for bill amount */}
          <div>
            <Label htmlFor="billAmount">Bill Amount ($)</Label>
            <Input
              id="billAmount"
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="Enter bill amount"
              className="mt-1"
            />
          </div>
          {/* Input field for tip percentage */}
          <div>
            <Label htmlFor="tipPercentage">Tip Percentage (%)</Label>
            <Input
              id="tipPercentage"
              type="number"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(e.target.value)}
              placeholder="Enter tip percentage"
              className="mt-1"
            />
          </div>
          {/* Button to trigger calculation */}
          <Button
            onClick={calculateTip}
            className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
          >
            Calculate
          </Button>
          {/* Display error message if inputs are invalid */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {/* Display the calculated tip and total bill */}
          {!error && (tipAmount > 0 || totalBill > 0) && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="text-lg font-semibold">
                Tip Amount: ${tipAmount}
              </p>
              <p className="text-lg font-semibold mt-2">
                Total Bill: ${totalBill}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Application Component
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <TipCalculator />
    </div>
  );
}
