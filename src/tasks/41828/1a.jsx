import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function App() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('');
  const [tipAmount, setTipAmount] = useState(0);
  const [totalBill, setTotalBill] = useState(0);

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const tipPercent = parseFloat(tipPercentage);
    if (isNaN(bill) || isNaN(tipPercent) || bill < 0 || tipPercent < 0) {
      setTipAmount(0);
      setTotalBill(0);
      return;
    }
    const tip = bill * (tipPercent / 100);
    setTipAmount(tip);
    setTotalBill(bill + tip);
  };

  useEffect(() => {
    if (billAmount !== '' && tipPercentage !== '') {
      calculateTip();
    }
  }, [billAmount, tipPercentage]);

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setter(value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md sm:w-96">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Tip Calculator</CardTitle>
          <CardDescription>Calculate your tip with ease.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input 
              type="text" 
              placeholder="Bill Amount" 
              value={billAmount} 
              onChange={handleInputChange(setBillAmount)}
              className="text-right"
            />
            <Input 
              type="text" 
              placeholder="Tip Percentage (%)" 
              value={tipPercentage} 
              onChange={handleInputChange(setTipPercentage)}
              className="text-right"
            />
          </div>
          <Button onClick={calculateTip} className="w-full hover:bg-blue-600 transition-colors">
            Calculate
          </Button>
          <div className="text-center">
            <p className="text-lg font-semibold">Tip Amount: ${tipAmount.toFixed(2)}</p>
            <p className="text-lg font-semibold">Total Bill: ${totalBill.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}