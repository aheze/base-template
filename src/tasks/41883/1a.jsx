import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function App() {
  const [totalAmount, setTotalAmount] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [share, setShare] = useState(null);
  const [error, setError] = useState('');

  const calculateShare = () => {
    if (!totalAmount || !numPeople) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/^\d+(\.\d{1,2})?$/.test(totalAmount)) {
      setError('Total amount must be a number.');
      return;
    }
    if (!/^\d+$/.test(numPeople) || parseInt(numPeople) === 0) {
      setError('Number of people must be a positive integer.');
      return;
    }

    const amount = parseFloat(totalAmount);
    const people = parseInt(numPeople);
    const individualShare = (amount / people).toFixed(2);
    setShare(individualShare);
    setError('');
  };

  const resetForm = () => {
    setTotalAmount('');
    setNumPeople('');
    setShare(null);
    setError('');
  };

  useEffect(() => {
    if (share !== null) {
      const timer = setTimeout(() => {
        setShare(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [share]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 sm:px-6 lg:px-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Expense Splitter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="totalAmount">Total Expense</Label>
              <Input 
                id="totalAmount" 
                type="text" 
                placeholder="$0.00" 
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="numPeople">Number of People</Label>
              <Input 
                id="numPeople" 
                type="text" 
                placeholder="1" 
                value={numPeople}
                onChange={(e) => setNumPeople(e.target.value)}
                className="mt-1"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {share !== null && (
              <div className="animate-fade-in text-lg font-semibold text-center">
                Each person's share: ${share}
              </div>
            )}
            <div className="flex space-x-2">
              <Button onClick={calculateShare}>Calculate Share</Button>
              <Button variant="secondary" onClick={resetForm}>Reset</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}