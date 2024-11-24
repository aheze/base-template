import React, { useState, useEffect } from 'react';
import { Button, Input, Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { format, differenceInDays, isToday } from 'date-fns';

function App() {
  const [birthDate, setBirthDate] = useState(null);
  const [gender, setGender] = useState("preferNotToSay");
  const [name, setName] = useState('');
  const [daysUntilBirthday, setDaysUntilBirthday] = useState(null);
  const [isBirthday, setIsBirthday] = useState(false);
  const [theme, setTheme] = useState('pastel');

  useEffect(() => {
    if (birthDate) {
      const today = new Date();
      const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
      if (nextBirthday < today) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
      }
      setDaysUntilBirthday(differenceInDays(nextBirthday, today));
      setIsBirthday(isToday(nextBirthday));
    }
  }, [birthDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you might want to validate the date again or handle errors
  };

  const birthdayMessage = () => {
    if (isBirthday) {
      return gender === "male" ? 
        `Happy Birthday, ${name}! Here's to a year full of adventures and success!` :
        gender === "female" ? 
        `Happy Birthday, ${name}! May your day be as wonderful and radiant as you are!` :
        `Happy Birthday, ${name}! Celebrate your special day!`;
    } else {
      return `Just ${daysUntilBirthday} days until your birthday! Time to start the countdown!`;
    }
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-${theme}-100 transition-colors duration-300`}>
      <Card className="w-full max-w-md p-4 sm:p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl mb-2 animate-pulse">Wish Me Birthday</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              type="text" 
              placeholder="Your Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
            <Input 
              type="date" 
              value={birthDate ? format(birthDate, 'yyyy-MM-dd') : ''}
              onChange={(e) => setBirthDate(new Date(e.target.value))} 
              required 
            />
            <div className="flex space-x-2">
              <Button onClick={() => setGender("male")} variant={gender === "male" ? "default" : "outline"}>Male</Button>
              <Button onClick={() => setGender("female")} variant={gender === "female" ? "default" : "outline"}>Female</Button>
              <Button onClick={() => setGender("preferNotToSay")} variant={gender === "preferNotToSay" ? "default" : "outline"}>Prefer Not to Say</Button>
            </div>
          </form>
        </CardContent>
        {birthDate && (
          <CardFooter className="flex flex-col items-center">
            <p className="text-xl text-center mb-2 animate-bounce">{birthdayMessage()}</p>
            <Button onClick={() => alert('Feature to share or save coming soon!')}>Share Your Birthday</Button>
          </CardFooter>
        )}
      </Card>
      <div className="mt-4">
        <Button onClick={() => changeTheme('pastel')}>Pastel</Button>
        <Button onClick={() => changeTheme('vibrant')}>Vibrant</Button>
        <Button onClick={() => changeTheme('minimal')}>Minimal</Button>
      </div>
    </div>
  );
}

export default App;