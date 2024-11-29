// Importing necessary components and hooks
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Utility for conditional class names

// Component to display the multiplication table
const MultiplicationTable = ({ number }) => {
  return (
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
      {/* Generate multiplication table up to 10 */}
      {Array.from({ length: 10 }, (_, i) => i + 1).map((multiplier) => (
        <Card key={multiplier} className="text-center animate-fade-in">
          <CardContent>
            <p>{number} x {multiplier} = {number * multiplier}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default function App() {
  // State for input number, generated table, and error message
  const [number, setNumber] = useState('');
  const [table, setTable] = useState(null);
  const [error, setError] = useState('');

  // Function to generate the multiplication table
  const generateTable = () => {
    if (!number) {
      setError('Please enter a number.');
      return;
    }

    const num = parseFloat(number);
    if (isNaN(num)) {
      setError('Please enter a valid number.');
      return;
    }

    setError(''); // Clear error if valid input
    setTable(<MultiplicationTable number={num} />); // Generate the table component
  };

  // Function to reset the input and table
  const reset = () => {
    setNumber('');
    setTable(null);
    setError('');
  };

  // Small animation when input changes
  useEffect(() => {
    if (number) {
      const inputElement = document.querySelector('input');
      if (inputElement) {
        inputElement.classList.add('animate-pulse');
        setTimeout(() => inputElement.classList.remove('animate-pulse'), 500);
      }
    }
  }, [number]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4">
      {/* Main card container */}
      <Card className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle>Multiplication Table Generator</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Input for number */}
          <Input 
            type="text" 
            placeholder="Enter a number" 
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className={cn("mb-4", error && "border-red-500")}
          />
          {/* Error message if input is invalid */}
          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
          {/* Buttons for generating and resetting the table */}
          <div className="flex justify-between">
            <Button onClick={generateTable}>Generate Table</Button>
            <Button onClick={reset} variant="secondary">Reset</Button>
          </div>
          {/* Display the generated table */}
          {table && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Table for {number}</h2>
              {table}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
