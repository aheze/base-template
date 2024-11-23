import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [draw, setDraw] = useState(false);
  const [winningCombination, setWinningCombination] = useState([]);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (index) => {
    if (board[index] || winner || draw) return; 

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    checkGameStatus(newBoard);
  };

  const checkGameStatus = (newBoard) => {
    // Check for a winner
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinner(newBoard[a]);
        setScore((prev) => ({
          ...prev,
          [newBoard[a]]: prev[newBoard[a]] + 1,
        }));
        setWinningCombination(combo);
        return;
      }
    }

    // Check for a draw
    if (newBoard.every((cell) => cell)) {
      setDraw(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setDraw(false);
    setWinningCombination([]);
  };

  const renderCell = (index) => {
    const isWinningCell = winningCombination.includes(index);

    return (
      <div
        className={`flex items-center justify-center border border-gray-300 h-20 w-20 sm:h-28 sm:w-28 cursor-pointer ${
          board[index] === "X"
            ? "text-blue-500"
            : board[index] === "O"
            ? "text-red-500"
            : "hover:bg-gray-100"
        } ${isWinningCell ? "animate-pulse bg-green-300" : ""}`}
        onClick={() => handleClick(index)}
      >
        <span className="text-3xl sm:text-4xl font-bold">{board[index]}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center p-6">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">Tic Tac Toe Challenge</h1>
        <p className="text-gray-600">X vs O - Let the battle begin!</p>
      </header>

      {/* Game Info */}
      <Card className="w-full max-w-md mb-6">
        <CardHeader>
          <CardTitle>
            {winner ? (
              <span className="text-green-500 text-2xl animate-bounce">
                🎉 Winner: {winner} 🎉
              </span>
            ) : draw ? (
              <span className="text-yellow-500 text-2xl">It's a Draw! 🤝</span>
            ) : (
              <span className="text-xl">
                Next Turn:{" "}
                <span
                  className={`${
                    isXNext ? "text-blue-500" : "text-red-500"
                  } font-bold`}
                >
                  {isXNext ? "X" : "O"}
                </span>
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <span className="text-blue-500 font-semibold">X: {score.X}</span>
            <span className="text-red-500 font-semibold">O: {score.O}</span>
          </div>
        </CardContent>
      </Card>

      {/* Game Board */}
      <div
        className="grid grid-cols-3 gap-2 sm:gap-4"
        style={{ maxWidth: "300px" }}
      >
        {Array.from({ length: 9 }, (_, i) => renderCell(i))}
      </div>

      {/* Reset Button */}
      <button
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
}
