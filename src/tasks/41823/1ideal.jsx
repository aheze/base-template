// Importing necessary components and hooks
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Component for input fields to accept minimum and maximum values
function NumberInput({ label, value, onChange, name }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      {/* Input for entering numbers */}
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

// Component to display the generated random number with an animation
function RandomNumberDisplay({ number }) {
  const [animate, setAnimate] = useState(false);

  React.useEffect(() => {
    // Trigger animation when the number updates
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500); // Reset animation after 500ms
    return () => clearTimeout(timer); // Clean up timeout
  }, [number]);

  return (
    <div className="text-center my-4">
      {/* Display the number with scaling animation */}
      <p className={`text-6xl font-bold transition-all duration-500 ${animate ? 'scale-110' : 'scale-100'}`}>
        {number}
      </p>
    </div>
  );
}

// Main Application Component
export default function App() {
  // State variables for minimum value, maximum value, generated random number, and errors
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [randomNumber, setRandomNumber] = useState(null);
  const [error, setError] = useState(null);

  // Function to generate a random number within the specified range
  const generateNumber = () => {
    const minVal = parseInt(min, 10); // Parse minimum value as integer
    const maxVal = parseInt(max, 10); // Parse maximum value as integer

    // Validate input values
    if (isNaN(minVal) || isNaN(maxVal)) {
      setError("Please enter valid numbers."); // Error if inputs are not numbers
      return;
    }

    if (minVal >= maxVal) {
      setError("Minimum value should be less than maximum value."); // Error if min is not less than max
      return;
    }

    setError(null); // Clear errors if validation passes

    // Generate a random number within the range
    const number = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    setRandomNumber(number); // Update the random number state
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl mb-4">Random Number Generator</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Display error message if validation fails */}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {/* Input fields for minimum and maximum values */}
          <NumberInput label="Minimum" value={min} onChange={e => setMin(e.target.value)} name="min" />
          <NumberInput label="Maximum" value={max} onChange={e => setMax(e.target.value)} name="max" />
          {/* Button to generate the random number */}
          <Button onClick={generateNumber} className="w-full mt-4">Generate</Button>
          {/* Display the random number if generated */}
          {randomNumber !== null && <RandomNumberDisplay number={randomNumber} />}
        </CardContent>
      </Card>
    </div>
  );
}
