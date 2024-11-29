import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function App() {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");
  const [nextBirthday, setNextBirthday] = useState(null);

  const calculateAge = () => {
    const today = new Date();
    const birth = new Date(birthDate);

    if (isNaN(birth.getTime()) || birth > today) {
      setError("Please enter a valid date of birth");
      setAge(null);
      setNextBirthday(null);
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
      days += prevMonth.getDate();
      months--;
    }

    setAge({ years, months, days });
    setError("");

    // Calculate next birthday
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < today) {
      nextBday.setFullYear(nextBday.getFullYear() + 1);
    }
    const daysUntilBday = Math.ceil((nextBday - today) / (1000 * 60 * 60 * 24));
    setNextBirthday(daysUntilBday);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Age Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate">Date of Birth</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full"
              />
            </div>
            <Button
              onClick={calculateAge}
              className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
            >
              Calculate Age
            </Button>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {age && (
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Your age is:</h2>
                <p className="text-lg">
                  {age.years} years, {age.months} months, and {age.days} days
                </p>
                {nextBirthday !== null && (
                  <p className="text-sm text-gray-600">
                    Days until next birthday: {nextBirthday}
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}