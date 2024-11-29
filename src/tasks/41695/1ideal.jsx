import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Predefined list of games with their details
const games = [
  { id: "memory", name: "Memory Match", description: "Match the cards to test your memory!" },
  { id: "reaction", name: "Quick Tap", description: "Improve reaction speed by tapping quickly!" },
  { id: "logic", name: "Logic Puzzle", description: "Solve puzzles to enhance logical thinking." },
];

// Game card component to display game details
const GameCard = ({ game, onPlay }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{game.name}</CardTitle>
      <CardDescription>{game.description}</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button onClick={() => onPlay(game.id)} className="w-full">
        Play Now
      </Button>
    </CardFooter>
  </Card>
);

// Memory Game Component
const MemoryGame = ({ level, onComplete }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Generate cards based on level
    const symbols = ["🍎", "🍌", "🍇", "🍊", "🍓", "🍑"];
    const shuffled = [...symbols, ...symbols]
      .slice(0, level * 4)
      .sort(() => Math.random() - 0.5);
    setCards(shuffled.map((symbol, index) => ({ id: index, symbol })));

    // Timer increment
    const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [level]);

  const handleCardClick = (id) => {
    if (flipped.length === 2) return; // Prevent flipping more than 2 cards
    setFlipped((prev) => [...prev, id]);
    setMoves((prev) => prev + 1);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].symbol === cards[second].symbol) {
        setSolved((prev) => [...prev, first, second]); // Mark as solved
      }
      setTimeout(() => setFlipped([]), 1000); // Flip cards back
    }
  }, [flipped, cards]);

  useEffect(() => {
    // Complete game when all cards are solved
    if (solved.length === cards.length && cards.length > 0) {
      onComplete(moves, timer);
    }
  }, [solved, cards, onComplete, moves, timer]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map(({ id, symbol }) => (
        <Button
          key={id}
          onClick={() => handleCardClick(id)}
          className={`h-16 text-2xl ${
            flipped.includes(id) || solved.includes(id) ? "bg-green-300" : "bg-gray-200"
          }`}
          disabled={flipped.includes(id) || solved.includes(id)}
        >
          {flipped.includes(id) || solved.includes(id) ? symbol : ""}
        </Button>
      ))}
      <div className="col-span-4 mt-4">
        Moves: {moves} | Time: {timer}s
      </div>
    </div>
  );
};

// Reaction Game Component
const ReactionGame = ({ onComplete }) => {
  const [status, setStatus] = useState("waiting");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  useEffect(() => {
    if (status === "ready") {
      const timeout = setTimeout(() => {
        setStatus("go");
        setStartTime(Date.now()); // Start timer
      }, Math.random() * 2000 + 1000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  const handleClick = () => {
    if (status === "waiting") {
      setStatus("ready"); // Transition to ready state
    } else if (status === "go") {
      const reactionTime = Date.now() - startTime;
      setEndTime(reactionTime);
      setStatus("done");
      onComplete(reactionTime); // Send completion
    }
  };

  return (
    <div className="text-center">
      <Button
        onClick={handleClick}
        className={`w-full h-40 text-2xl ${
          status === "go" ? "bg-green-500" : status === "ready" ? "bg-yellow-500" : "bg-red-500"
        }`}
      >
        {status === "waiting"
          ? "Click to start"
          : status === "ready"
          ? "Wait for green..."
          : status === "go"
          ? "Click now!"
          : `Your time: ${endTime}ms`}
      </Button>
      {status === "done" && (
        <Button onClick={() => setStatus("waiting")} className="mt-4">
          Play Again
        </Button>
      )}
    </div>
  );
};

// Logic Game Component
const LogicGame = ({ level, onComplete }) => {
  const [numbers, setNumbers] = useState([]);
  const [target, setTarget] = useState(0);
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Generate random numbers and set target
    const newNumbers = Array.from({ length: level * 3 }, () => Math.floor(Math.random() * 9) + 1);
    const newTarget = newNumbers.reduce((a, b) => a + b, 0);
    setNumbers(newNumbers);
    setTarget(newTarget);
    setSelected([]);
  }, [level]);

  const checkSolution = () => {
    const sum = selected.reduce((acc, idx) => acc + numbers[idx], 0);
    if (sum === target) {
      setScore((prev) => prev + 1);
      onComplete(score + 1); // Correct solution
    } else {
      setSelected([]); // Reset on incorrect
    }
  };

  return (
    <div className="text-center">
      <p className="text-xl mb-4">Target: {target}</p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {numbers.map((num, idx) => (
          <Button
            key={idx}
            onClick={() => setSelected((prev) => [...prev, idx])}
            className={`h-16 w-16 text-xl ${
              selected.includes(idx) ? "bg-blue-500" : "bg-gray-200"
            }`}
          >
            {num}
          </Button>
        ))}
      </div>
      <Button onClick={checkSolution} className="bg-green-500 hover:bg-green-600">
        Submit
      </Button>
      <p className="mt-4">Score: {score}</p>
    </div>
  );
};

// Main App Component
export default function App() {
  const [currentGame, setCurrentGame] = useState(null); // Current selected game
  const [level, setLevel] = useState(1); // Game level
  const [xp, setXp] = useState(0); // Experience points

  const handleGameComplete = (score) => {
    const newXp = xp + score * 10;
    setXp(newXp >= 100 ? newXp - 100 : newXp);
    if (newXp >= 100) setLevel((prev) => prev + 1); // Level up
    setCurrentGame(null); // Reset game state
  };

  return (
    <div className="container mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-600">Brain Game App</h1>
        <p className="text-gray-700">Sharpen your mind with fun and engaging challenges!</p>
      </header>

      {/* XP and Level Display */}
      <section className="mb-8">
        <p>Level: {level}</p>
        <div className="bg-gray-200 h-4 w-full rounded-full">
          <div
            className="bg-blue-500 h-full rounded-full"
            style={{ width: `${xp}%` }}
          ></div>
        </div>
        <p>{xp}/100 XP</p>
      </section>

      {/* Game Selection or Active Game */}
      {currentGame ? (
        <div>
          {currentGame === "memory" && <MemoryGame level={level} onComplete={handleGameComplete} />}
          {currentGame === "reaction" && <ReactionGame onComplete={handleGameComplete} />}
          {currentGame === "logic" && <LogicGame level={level} onComplete={handleGameComplete} />}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onPlay={setCurrentGame} />
          ))}
        </div>
      )}
    </div>
  );
}
