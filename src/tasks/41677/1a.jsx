import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const themes = {
  pastel: "bg-pink-100 text-pink-800",
  vibrant: "bg-purple-600 text-white",
  minimalist: "bg-gray-100 text-gray-800",
};

const WelcomeAnimation = () => (
  <div className="relative h-40 overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-4xl animate-bounce">🎂</div>
    </div>
    <div className="absolute inset-0 flex items-center justify-around">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`text-2xl animate-float-${i + 1}`}>
          🎈
        </div>
      ))}
    </div>
  </div>
);

const BirthdayMessage = ({ daysUntilBirthday, isBirthday, name, gender }) => {
  if (isBirthday) {
    const message =
      gender === "male"
        ? `Happy Birthday, ${name}! Here's to a year full of adventures and success!`
        : gender === "female"
        ? `Happy Birthday, ${name}! May your day be as wonderful and radiant as you are!`
        : `Happy Birthday, ${name}! Wishing you an amazing day filled with joy and laughter!`;
    return <div className="text-2xl font-bold text-center animate-fade-in">{message}</div>;
  }
  return (
    <div className="text-xl text-center animate-fade-in">
      Just {daysUntilBirthday} {daysUntilBirthday === 1 ? "day" : "days"} until your birthday! Time to start the
      countdown!
    </div>
  );
};

const CountdownTimer = ({ daysUntilBirthday }) => (
  <div className="text-4xl font-bold text-center mt-4 animate-pulse">{daysUntilBirthday}</div>
);

const BirthdayFact = ({ birthDate }) => {
  const facts = [
    "Did you know? The odds of being born on a leap day are 1 in 1,461!",
    "Fun fact: The most common birth month is September!",
    "Interesting: About 18 million people share a birthday with you!",
  ];
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  return <div className="text-sm italic mt-4 text-center">{randomFact}</div>;
};

export default function App() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState();
  const [gender, setGender] = useState("");
  const [theme, setTheme] = useState("pastel");
  const [darkMode, setDarkMode] = useState(false);
  const [daysUntilBirthday, setDaysUntilBirthday] = useState(null);
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    if (birthDate) {
      const today = new Date();
      const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
      if (nextBirthday < today) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
      }
      const diffTime = Math.abs(nextBirthday - today);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysUntilBirthday(diffDays);
      setIsBirthday(diffDays === 0);
    }
  }, [birthDate]);

  return (
    <div className={`min-h-screen ${themes[theme]} ${darkMode ? "dark" : ""}`}>
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Wish Me Birthday</CardTitle>
            <CardDescription className="text-center">Let's celebrate your special day!</CardDescription>
          </CardHeader>
          <CardContent>
            <WelcomeAnimation />
            <div className="space-y-4">
              <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    {birthDate ? format(birthDate, "PPP") : "Pick your birthday"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={birthDate} onSelect={setBirthDate} initialFocus />
                </PopoverContent>
              </Popover>
              <Select onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              {birthDate && (
                <>
                  <BirthdayMessage
                    daysUntilBirthday={daysUntilBirthday}
                    isBirthday={isBirthday}
                    name={name}
                    gender={gender}
                  />
                  <CountdownTimer daysUntilBirthday={daysUntilBirthday} />
                  <BirthdayFact birthDate={birthDate} />
                </>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Label htmlFor="theme">Theme:</Label>
              <Select defaultValue={theme} onValueChange={setTheme}>
                <SelectTrigger id="theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pastel">Pastel</SelectItem>
                  <SelectItem value="vibrant">Vibrant</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}