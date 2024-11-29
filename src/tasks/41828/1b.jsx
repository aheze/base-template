import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState("");
  const [tipAmount, setTipAmount] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (billAmount && tipPercentage) {
      calculateTip();
    }
  }, [billAmount, tipPercentage]);

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercentage);

    if (isNaN(bill) || isNaN(tip) || bill < 0 || tip < 0) {
      setError("Please enter valid positive numbers.");
      return;
    }

    setError("");
    const calculatedTip = (bill * tip) / 100;
    const total = bill + calculatedTip;
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
          <Button
            onClick={calculateTip}
            className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
          >
            Calculate
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
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

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <TipCalculator />
    </div>
  );
}