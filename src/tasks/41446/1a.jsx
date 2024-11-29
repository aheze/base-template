import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Cell = ({ value, onClick, isWinning }) => (
  <motion.button
    className={`w-full h-full text-4xl font-bold flex items-center justify-center
      ${isWinning ? "bg-green-200" : "bg-white"}
      hover:bg-gray-100 transition-colors duration-200`}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {value}
  </motion.button>
);

const Board = ({ squares, onClick, winningLine }) => (
  <div className="grid grid-cols-3 gap-2 w-full max-w-xs mx-auto">
    {squares.map((square, i) => (
      <Cell
        key={i}
        value={square}
        onClick={() => onClick(i)}
        isWinning={winningLine && winningLine.includes(i)}
      />
    ))}
  </div>
);

const ScoreBoard = ({ scores }) => (
  <div className="flex justify-between w-full max-w-xs mx-auto mt-4">
    <div className="text-center">
      <p className="font-bold">Player X</p>
      <p>{scores.X}</p>
    </div>
    <div className="text-center">
      <p className="font-bold">Player O</p>
      <p>{scores.O}</p>
    </div>
  </div>
);

const calculateWinner = (squares) => {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: WINNING_COMBINATIONS[i] };
    }
  }
  return null;
};

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [gameOver, setGameOver] = useState(false);

  const current = history[stepNumber];
  const winnerInfo = calculateWinner(current);
  const winner = winnerInfo?.winner;
  const winningLine = winnerInfo?.line;

  const handleClick = (i) => {
    if (gameOver || current[i] || winner) return;

    const newHistory = history.slice(0, stepNumber + 1);
    const currentSquares = [...current];

    currentSquares[i] = xIsNext ? "X" : "O";
    setHistory([...newHistory, currentSquares]);
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
    setGameOver(false);
  };

  useEffect(() => {
    if (winner) {
      setScores((prevScores) => ({
        ...prevScores,
        [winner]: prevScores[winner] + 1,
      }));
      setGameOver(true);
    } else if (stepNumber === 9) {
      setGameOver(true);
    }
  }, [winner, stepNumber]);

  const status = winner
    ? `Winner: ${winner}`
    : gameOver
    ? "Game Over - It's a draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Tic Tac Toe Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-4 font-semibold text-lg">{status}</div>
            <Board squares={current} onClick={handleClick} winningLine={winningLine} />
            <ScoreBoard scores={scores} />
            <div className="mt-4 flex justify-center">
              <Button onClick={resetGame} className="px-4 py-2">
                Reset Game
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}