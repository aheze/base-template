import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const petTypes = ["Dog", "Cat", "Bird", "Reptile"];
const petNames = ["Buddy", "Luna", "Charlie", "Max", "Lucy", "Bailey"];

const PetCard = ({ pet, onCare, onRename }) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{pet.name}</span>
          <Badge variant="outline">{pet.type}</Badge>
        </CardTitle>
        <CardDescription>Level {pet.level}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-4">
          <Avatar className="w-24 h-24">
            <span className="text-4xl">{pet.emoji}</span>
          </Avatar>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Happiness</span>
            <Progress value={pet.happiness} className="w-1/2" />
          </div>
          <div className="flex justify-between">
            <span>Health</span>
            <Progress value={pet.health} className="w-1/2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => onCare("feed")}>Feed</Button>
        <Button onClick={() => onCare("play")}>Play</Button>
        <Button onClick={() => onCare("clean")}>Clean</Button>
      </CardFooter>
    </Card>
  );
};

const AdoptionCenter = ({ onAdopt }) => {
  const [selectedPet, setSelectedPet] = useState(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adopt a Pet</CardTitle>
        <CardDescription>Choose your new virtual companion</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {petTypes.map((type) => (
            <Button
              key={type}
              variant={selectedPet === type ? "default" : "outline"}
              onClick={() => setSelectedPet(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onAdopt(selectedPet)}
          disabled={!selectedPet}
          className="w-full"
        >
          Adopt {selectedPet}
        </Button>
      </CardFooter>
    </Card>
  );
};

const EducationalContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pet Care Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          <li>Provide fresh water daily</li>
          <li>Feed a balanced diet appropriate for your pet's species</li>
          <li>Exercise your pet regularly</li>
          <li>Schedule regular vet check-ups</li>
          <li>Groom your pet as needed</li>
        </ul>
      </CardContent>
    </Card>
  );
};

const Settings = ({ darkMode, onToggleDarkMode }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode">Dark Mode</Label>
          <Switch
            id="dark-mode"
            checked={darkMode}
            onCheckedChange={onToggleDarkMode}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default function App() {
  const [pet, setPet] = useState(null);
  const [coins, setCoins] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const adoptPet = (type) => {
    setPet({
      name: petNames[Math.floor(Math.random() * petNames.length)],
      type,
      emoji: type === "Dog" ? "🐶" : type === "Cat" ? "🐱" : type === "Bird" ? "🦜" : "🦎",
      happiness: 50,
      health: 50,
      level: 1,
    });
  };

  const carePet = (action) => {
    setPet((prevPet) => {
      let happiness = prevPet.happiness;
      let health = prevPet.health;

      switch (action) {
        case "feed":
          health = Math.min(100, health + 10);
          break;
        case "play":
          happiness = Math.min(100, happiness + 10);
          break;
        case "clean":
          health = Math.min(100, health + 5);
          happiness = Math.min(100, happiness + 5);
          break;
      }

      setCoins((prevCoins) => prevCoins + 5);

      return { ...prevPet, happiness, health };
    });
  };

  const renamePet = (newName) => {
    setPet((prevPet) => ({ ...prevPet, name: newName }));
  };

  return (
    <div className={`min-h-screen p-4 ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"}`}>
      <h1 className="text-3xl font-bold text-center mb-6">Virtual Pet Care Assistant</h1>
      <div className="max-w-md mx-auto space-y-4">
        {pet ? (
          <>
            <PetCard pet={pet} onCare={carePet} onRename={renamePet} />
            <Card>
              <CardContent className="pt-4">
                <p className="text-center">Coins: {coins}</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <AdoptionCenter onAdopt={adoptPet} />
        )}
        <Tabs defaultValue="education">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="education">
            <EducationalContent />
          </TabsContent>
          <TabsContent value="settings">
            <Settings darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}