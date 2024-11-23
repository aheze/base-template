import React, { useState, useEffect } from "react";
const GRID_SIZE = 5;
const INITIAL_MOVES = 15;

export default function App() {
  const [grid, setGrid] = useState([]);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [movesLeft, setMovesLeft] = useState(INITIAL_MOVES);
  const [gameStatus, setGameStatus] = useState(""); 
  const [treasuresLeft, setTreasuresLeft] = useState(0);

  const generateGrid = () => {
    const newGrid = Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => {
        const rand = Math.random();
        if (rand < 0.2) return "treasure"; 
        if (rand < 0.3) return "trap"; 
        return "empty";
      })
    );

    const treasures = newGrid.flat().filter((cell) => cell === "treasure")
      .length;

    setGrid(newGrid);
    setPlayerPos({ x: 0, y: 0 });
    setScore(0);
    setMovesLeft(INITIAL_MOVES);
    setGameStatus("");
    setTreasuresLeft(treasures);
  };

  useEffect(() => {
    generateGrid();
  }, []);

  const movePlayer = (dx, dy) => {
    if (gameStatus) return; 
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (newX < 0 || newX >= GRID_SIZE || newY < 0 || newY >= GRID_SIZE) return; 

    const cell = grid[newY][newX];

    setPlayerPos({ x: newX, y: newY });
    setMovesLeft((prev) => prev - 1);

    if (cell === "treasure") {
      setScore((prev) => prev + 10);
      setTreasuresLeft((prev) => prev - 1);
      grid[newY][newX] = "found"; 
    } else if (cell === "trap") {
      setScore((prev) => prev - 5);
    }
    if (movesLeft - 1 <= 0) {
      setGameStatus("lose");
    } else if (treasuresLeft - 1 === 0) {
      setGameStatus("win");
    }
  };

  const resetGame = () => {
    generateGrid();
  };

  const handleKeyPress = (e) => {
    switch (e.key) {
      case "ArrowUp":
        movePlayer(0, -1);
        break;
      case "ArrowDown":
        movePlayer(0, 1);
        break;
      case "ArrowLeft":
        movePlayer(-1, 0);
        break;
      case "ArrowRight":
        movePlayer(1, 0);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [playerPos, movesLeft, gameStatus]);

  return (
    <div
      className={`min-h-screen p-4 ${
        gameStatus === "win"
          ? "bg-green-200"
          : gameStatus === "lose"
          ? "bg-red-200"
          : "bg-gray-50"
      }`}
    >
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold">Treasure Hunt Adventure</h1>
        <p className="text-gray-600">Collect treasures and avoid traps!</p>
      </header>

      <main className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">
              Score: <span className="text-blue-500">{score}</span>
            </p>
            <p className="font-semibold">
              Moves Left: <span className="text-yellow-500">{movesLeft}</span>
            </p>
            <p className="font-semibold">
              Treasures Remaining:{" "}
              <span className="text-green-500">{treasuresLeft}</span>
            </p>
          </div>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md shadow hover:bg-gray-700 transition"
            onClick={resetGame}
          >
            Restart Game
          </button>
        </div>

        {/* Render the game grid */}
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isPlayer =
                playerPos.x === colIndex && playerPos.y === rowIndex;
              const cellStyle = isPlayer
                ? "bg-blue-500 text-white animate-pulse"
                : cell === "found"
                ? "bg-green-300 text-black"
                : "bg-gray-200";

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`p-4 border flex items-center justify-center ${cellStyle}`}
                >
                  {isPlayer && "🏃"}
                  {cell === "treasure" && !isPlayer && "💎"}
                  {cell === "trap" && !isPlayer && "💀"}
                </div>
              );
            })
          )}
        </div>

        {/* Display game status */}
        {gameStatus && (
          <div
            className={`p-4 rounded-md shadow text-center ${
              gameStatus === "win" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <h2 className="text-2xl font-bold text-white">
              {gameStatus === "win" ? "You Win! 🎉" : "You Lose! 😢"}
            </h2>
            <button
              className="mt-4 bg-white text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-100"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
