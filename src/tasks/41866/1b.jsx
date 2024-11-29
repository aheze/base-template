import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, differenceInYears, differenceInMonths, differenceInDays, isValid, isFuture, addYears } from 'date-fns';

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);
  const [error, setError] = useState('');

  const calculateAge = () => {
    const date = new Date(birthDate);
    if (!isValid(date) || isFuture(date)) {
      setError('Please enter a valid date in the past.');
      setAge(null);
      return;
    }
    setError('');

    const now = new Date();
    const years = differenceInYears(now, date);
    const months = differenceInMonths(now, addYears(date, years));
    const days = differenceInDays(now, addYears(date, years));

    setAge({ years, months, days });
  };

  const nextBirthday = () => {
    const today = new Date();
    const birthDateThisYear = new Date(today.getFullYear(), new Date(birthDate).getMonth(), new Date(birthDate).getDate());
    return isFuture(birthDateThisYear) ? birthDateThisYear : addYears(birthDateThisYear, 1);
  };

  return (
    <Card className="w-full max-w-sm mx-auto mt-10 p-4 sm:p-6">
      <CardHeader>
        <CardTitle>Age Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Label htmlFor="birthdate">Enter your date of birth:</Label>
          <Input 
            id="birthdate" 
            type="date" 
            value={birthDate} 
            onChange={(e) => setBirthDate(e.target.value)} 
            className="w-full"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button onClick={calculateAge} className="w-full hover:bg-primary/90 transition-colors">
            Calculate Age
          </Button>
          {age && (
            <div className="text-center space-y-2">
              <p>You are {age.years} years, {age.months} months, and {age.days} days old.</p>
              <p>Next birthday: {format(nextBirthday(), 'MMMM d, yyyy')}</p>
              <p>{differenceInDays(nextBirthday(), new Date())} days until your next birthday.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <AgeCalculator />
    </div>
  );
}