// Importing necessary components and hooks
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils'; // Utility for conditional class names

// Component to handle name input and initials generation
function NameInitialsGenerator() {
  const [fullName, setFullName] = useState(''); // Tracks the full name input
  const [initials, setInitials] = useState(''); // Tracks the generated initials
  const [error, setError] = useState(''); // Tracks validation errors

  // Function to generate initials from the full name
  const generateInitials = () => {
    if (!fullName.trim()) {
      setError('Please enter a valid name.');
      setInitials('');
      return;
    }

    const nameParts = fullName.split(' ').filter(part => part); // Split name into parts
    let result = nameParts.map(part => part[0] || '').join('').toUpperCase(); // Get first letters and join

    // Handle case where input has special characters or unexpected spaces
    if (result.length === 0 && fullName.length > 0) {
      result = fullName.trim()[0].toUpperCase();
    }

    setInitials(result); // Update initials state
    setError(''); // Clear any previous error
  };

  // Function to reset the input fields and state
  const resetFields = () => {
    setFullName('');
    setInitials('');
    setError('');
  };

  return (
    <Card className="max-w-lg mx-auto mt-10 p-4 sm:p-6">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Name Initials Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Input field for full name */}
          <Input 
            placeholder="Enter full name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full"
            onKeyPress={(e) => { if (e.key === 'Enter') generateInitials(); }} // Generate initials on Enter key
          />
          {/* Display validation error if present */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {/* Button to generate initials */}
          <Button onClick={generateInitials} className="w-full sm:w-auto">Generate Initials</Button>
          {/* Display the generated initials */}
          {initials && (
            <div className="text-center mt-4">
              <p className="text-lg mb-2">Your initials are:</p>
              <div className={cn(
                "inline-block p-4 rounded-full bg-blue-600 text-white text-3xl font-semibold", 
                { "animate-bounce": initials !== '' } // Bounce animation when initials are displayed
              )}>
                {initials}
              </div>
            </div>
          )}
          {/* Button to reset fields */}
          <Button onClick={resetFields} variant="secondary" className="mt-4 w-full sm:w-auto">Reset</Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Main Application Component
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <NameInitialsGenerator />
    </div>
  );
}
