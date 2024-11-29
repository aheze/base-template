import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function NumberInput({ label, value, onChange, name }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <Input 
        type="number" 
        name={name} 
        value={value} 
        onChange={onChange} 
        className="w-full"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}

function RandomNumberDisplay({ number }) {
  const [animate, setAnimate] = useState(false);

  React.useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [number]);

  return (
    <div className="text-center my-4">
      <p className={`text-6xl font-bold transition-all duration-500 ${animate ? 'scale-110' : 'scale-100'}`}>
        {number}
      </p>
    </div>
  );
}

export default function App() {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [randomNumber, setRandomNumber] = useState(null);
  const [error, setError] = useState(null);

  const generateNumber = () => {
    const minVal = parseInt(min, 10);
    const maxVal = parseInt(max, 10);

    if (isNaN(minVal) || isNaN(maxVal)) {
      setError("Please enter valid numbers.");
      return;
    }

    if (minVal >= maxVal) {
      setError("Minimum value should be less than maximum value.");
      return;
    }

    setError(null);
    const number = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    setRandomNumber(number);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl mb-4">Random Number Generator</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <NumberInput label="Minimum" value={min} onChange={e => setMin(e.target.value)} name="min" />
          <NumberInput label="Maximum" value={max} onChange={e => setMax(e.target.value)} name="max" />
          <Button onClick={generateNumber} className="w-full mt-4">Generate</Button>
          {randomNumber !== null && <RandomNumberDisplay number={randomNumber} />}
        </CardContent>
      </Card>
    </div>
  );
}