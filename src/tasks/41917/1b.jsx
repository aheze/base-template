import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

function NameInitialsGenerator() {
  const [fullName, setFullName] = useState('');
  const [initials, setInitials] = useState('');
  const [error, setError] = useState('');

  const generateInitials = () => {
    if (!fullName.trim()) {
      setError('Please enter a valid name.');
      setInitials('');
      return;
    }

    const nameParts = fullName.split(' ').filter(part => part);
    let result = nameParts.map(part => part[0] || '').join('').toUpperCase();

    // Handle case where name might not split correctly due to multiple spaces or special chars
    if (result.length === 0 && fullName.length > 0) {
      result = fullName.trim()[0].toUpperCase();
    }

    setInitials(result);
    setError('');
  };

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
          <Input 
            placeholder="Enter full name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full"
            onKeyPress={(e) => { if(e.key === 'Enter') generateInitials(); }}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button onClick={generateInitials} className="w-full sm:w-auto">Generate Initials</Button>
          {initials && (
            <div className="text-center mt-4">
              <p className="text-lg mb-2">Your initials are:</p>
              <div className={cn("inline-block p-4 rounded-full bg-blue-600 text-white text-3xl font-semibold", {
                "animate-bounce": initials !== ''
              })}>
                {initials}
              </div>
            </div>
          )}
          <Button onClick={resetFields} variant="secondary" className="mt-4 w-full sm:w-auto">Reset</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <NameInitialsGenerator />
    </div>
  );
}