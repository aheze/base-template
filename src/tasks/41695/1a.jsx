import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const games = [
  { id: "memory", name: "Memory Match", description: "Test your memory by matching pairs of cards" },
  { id: "reaction", name: "Quick Tap", description: "Improve your reaction time by tapping targets quickly" },
  { id: "logic", name: "Number Puzzle", description: "Solve number puzzles to enhance logical thinking" },
];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const symbols = ["🍎", "🍌", "🍇", "🍊", "🍓", "🍑"];
    const shuffled = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    setCards(shuffled.map((symbol, index) => ({ id: index, symbol })));
  }, []);

  const handleClick = (id) => {
    if (flipped.length === 2) return;
    setFlipped([...flipped, id]);
    setMoves(moves + 1);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].symbol === cards[second].symbol) {
        setSolved([...solved, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped, cards]);

  return (
    <div className="grid grid-cols-4 gap-2">
      {cards.map(({ id, symbol }) => (
        <Button
          key={id}
          onClick={() => handleClick(id)}
          className={`h-16 text-2xl ${flipped.includes(id) || solved.includes(id) ? "" : "bg-gray-200"}`}
          disabled={flipped.includes(id) || solved.includes(id)}
        >
          {flipped.includes(id) || solved.includes(id) ? symbol : ""}
        </Button>
      ))}
      <p className="col-span-4 mt-4">Moves: {moves}</p>
    </div>
  );
};

const ReactionGame = () => {
  const [status, setStatus] = useState("waiting");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  useEffect(() => {
    if (status === "ready") {
      const timeout = setTimeout(() => {
        setStatus("go");
        setStartTime(Date.now());
      }, Math.random() * 2000 + 1000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  const handleClick = () => {
    if (status === "waiting") {
      setStatus("ready");
    } else if (status === "go") {
      setEndTime(Date.now());
      setStatus("done");
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
          : `Your time: ${endTime - startTime}ms`}
      </Button>
      {status === "done" && (
        <Button onClick={() => setStatus("waiting")} className="mt-4">
          Play again
        </Button>
      )}
    </div>
  );
};

const LogicGame = () => {
  const [numbers, setNumbers] = useState([]);
  const [target, setTarget] = useState(0);
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    newGame();
  }, []);

  const newGame = () => {
    const newNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 9) + 1);
    const newTarget = Math.floor(Math.random() * 50) + 10;
    setNumbers(newNumbers);
    setTarget(newTarget);
    setSelected([]);
  };

  const handleNumberClick = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const checkSolution = () => {
    const sum = selected.reduce((acc, index) => acc + numbers[index], 0);
    if (sum === target) {
      setScore(score + 1);
      newGame();
    } else {
      setSelected([]);
    }
  };

  return (
    <div className="text-center">
      <p className="text-2xl mb-4">Target: {target}</p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {numbers.map((number, index) => (
          <Button
            key={index}
            onClick={() => handleNumberClick(index)}
            className={selected.includes(index) ? "bg-blue-500" : ""}
          >
            {number}
          </Button>
        ))}
      </div>
      <Button onClick={checkSolution}>Check</Button>
      <p className="mt-4">Score: {score}</p>
    </div>
  );
};

const GameCard = ({ game, onPlay }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{game.name}</CardTitle>
      <CardDescription>{game.description}</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button onClick={() => onPlay(game.id)}>Play</Button>
    </CardFooter>
  </Card>
);

export default function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);

  const playGame = (gameId) => {
    setCurrentGame(gameId);
    setXp(xp + 10);
    if (xp >= 100) {
      setLevel(level + 1);
      setXp(0);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Brain Game</h1>
      <div className="mb-4">
        <p>Level: {level}</p>
        <Progress value={xp} max={100} className="w-full" />
      </div>
      <Tabs value={currentGame} onValueChange={setCurrentGame}>
        <TabsList className="grid w-full grid-cols-3">
          {games.map((game) => (
            <TabsTrigger key={game.id} value={game.id}>
              {game.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {games.map((game) => (
          <TabsContent key={game.id} value={game.id}>
            {game.id === "memory" && <MemoryGame />}
            {game.id === "reaction" && <ReactionGame />}
            {game.id === "logic" && <LogicGame />}
          </TabsContent>
        ))}
      </Tabs>
      {!currentGame && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onPlay={playGame} />
          ))}
        </div>
      )}
    </div>
  );
}