import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const GameCard = ({ title, children, onStart }) => (
  <Card className="m-4 w-full max-w-sm">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
    <CardFooter>
      <Button onClick={onStart}>Start Game</Button>
    </CardFooter>
  </Card>
);

const MemoryGame = () => {
  const [cards, setCards] = useState(Array(6).fill().map((_, i) => ({ id: i, flipped: false })));
  const [matched, setMatched] = useState([]);
  
  const flipCard = (id) => {
    if (matched.includes(id)) return;
    // Simplified flip logic for demonstration
    setCards(prev => prev.map(card => card.id === id ? { ...card, flipped: !card.flipped } : card));
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {cards.map(card => (
        <div key={card.id} onClick={() => flipCard(card.id)} className="h-20 bg-blue-500 cursor-pointer">
          {card.flipped && <p className="text-white">Card {card.id}</p>}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [activeGame, setActiveGame] = useState(null);

  const games = {
    memory: "Memory Challenge",
    logic: "Logic Puzzle",
    // Add more game types here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6">Brain Game</h1>
      {activeGame ? (
        <>
          {activeGame === 'memory' && <MemoryGame />}
          <Button className="mt-4" onClick={() => setActiveGame(null)}>Back to Menu</Button>
        </>
      ) : (
        Object.entries(games).map(([key, name]) => (
          <GameCard key={key} title={name} onStart={() => setActiveGame(key)}>
            <p>Test your {name.toLowerCase()} skills!</p>
          </GameCard>
        ))
      )}
      {/* Placeholder for other features like Progress Tracking, Custom Challenges, etc. */}
    </div>
  );
};

export default App;