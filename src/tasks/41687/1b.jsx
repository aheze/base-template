import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Pet({ name, species, onFeed, onPlay, onClean }) {
  return (
    <Card className="sm:w-full md:w-1/2 lg:w-1/3">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{species}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Happiness: 😊</p>
        <p>Health: ❤️</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={onFeed}>Feed</Button>
        <Button onClick={onPlay}>Play</Button>
        <Button onClick={onClean}>Clean</Button>
      </CardFooter>
    </Card>
  );
}

function PetAdoption({ onAdopt }) {
  const [petName, setPetName] = useState('');
  const [selectedPet, setSelectedPet] = useState('dog');

  const pets = [
    { type: 'dog', traits: 'Loyal, Playful' },
    { type: 'cat', traits: 'Independent, Curious' },
    // Add more pets here
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adopt a Pet</CardTitle>
      </CardHeader>
      <CardContent>
        <select onChange={(e) => setSelectedPet(e.target.value)} value={selectedPet} className="mb-2">
          {pets.map(pet => <option key={pet.type} value={pet.type}>{pet.type}</option>)}
        </select>
        <Input placeholder="Name your pet" value={petName} onChange={(e) => setPetName(e.target.value)} />
      </CardContent>
      <CardFooter>
        <Button onClick={() => onAdopt({ name: petName, species: selectedPet })}>Adopt</Button>
      </CardFooter>
    </Card>
  );
}

export default function App() {
  const [pet, setPet] = useState(null);

  const handleAdopt = (newPet) => {
    setPet(newPet);
  };

  const actions = {
    onFeed: () => console.log('Feeding the pet'),
    onPlay: () => console.log('Playing with the pet'),
    onClean: () => console.log('Cleaning the pet area'),
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-4">Virtual Pet Care Assistant</h1>
      {!pet ? 
        <PetAdoption onAdopt={handleAdopt} /> : 
        <Pet {...pet} {...actions} />}
      {/* Here you would expand with other features like health check, gamification, etc. */}
    </div>
  );
}