import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast, Toaster } from "@/components/ui/toaster";

const CELL_TYPES = {
  EMPTY: "empty",
  TREASURE: "treasure",
  TRAP: "trap",
};

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const GameCell = ({ type, revealed, onClick }) => {
  const getCellContent = () => {
    if (!revealed) return "?";
    switch (type) {
      case CELL_TYPES.TREASURE:
        return "💎";
      case CELL_TYPES.TRAP:
        return "💀";
      default:
        return "";
    }
  };

  const getCellClass = () => {
    let baseClass = "w-12 h-12 flex items-center justify-center text-2xl border border-gray-300 cursor-pointer transition-all duration-300 ";
    if (!revealed) return baseClass + "bg-blue-100 hover:bg-blue-200";
    switch (type) {
      case CELL_TYPES.TREASURE:
        return baseClass + "bg-yellow-200 animate-pulse";
      case CELL_TYPES.TRAP:
        return baseClass + "bg-red-200 animate-bounce";
      default:
        return baseClass + "bg-gray-100";
    }
  };

  return (
    <div className={getCellClass()} onClick={onClick}>
      {getCellContent()}
    </div>
  );
};

const GameGrid = ({ grid, onCellClick }) => {
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))` }}>
      {grid.map((row, y) =>
        row.map((cell, x) => (
          <GameCell
            key={`${x}-${y}`}
            type={cell.type}
            revealed={cell.revealed}
            onClick={() => onCellClick(x, y)}
          />
        ))
      )}
    </div>
  );
};

const ControlPanel = ({ onMove, remainingMoves, score, gridSize, onGridSizeChange, onRestart }) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Game Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          <Button onClick={() => onMove(DIRECTIONS.UP)} className="col-start-2">
            ↑
          </Button>
          <Button onClick={() => onMove(DIRECTIONS.LEFT)} className="col-start-1 row-start-2">
            ←
          </Button>
          <Button onClick={() => onMove(DIRECTIONS.DOWN)} className="col-start-2 row-start-2">
            ↓
          </Button>
          <Button onClick={() => onMove(DIRECTIONS.RIGHT)} className="col-start-3 row-start-2">
            →
          </Button>
        </div>
        <div className="mt-4">
          <p>Remaining Moves: {remainingMoves}</p>
          <p>Score: {score}</p>
        </div>
        <div className="mt-4">
          <label htmlFor="gridSize" className="block mb-2">
            Grid Size: {gridSize}x{gridSize}
          </label>
          <Slider
            id="gridSize"
            min={5}
            max={7}
            step={1}
            value={[gridSize]}
            onValueChange={(value) => onGridSizeChange(value[0])}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onRestart} className="w-full">
          Restart Game
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function App() {
  const [gridSize, setGridSize] = useState(5);
  const [grid, setGrid] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [remainingMoves, setRemainingMoves] = useState(20);
  const [gameOver, setGameOver] = useState(false);

  const initializeGrid = useCallback(() => {
    const newGrid = Array(gridSize)
      .fill()
      .map(() =>
        Array(gridSize)
          .fill()
          .map(() => ({
            type: Math.random() < 0.2 ? CELL_TYPES.TREASURE : Math.random() < 0.1 ? CELL_TYPES.TRAP : CELL_TYPES.EMPTY,
            revealed: false,
          }))
      );
    setGrid(newGrid);
    setPlayerPosition({ x: 0, y: 0 });
    setScore(0);
    setRemainingMoves(20);
    setGameOver(false);
  }, [gridSize]);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  const handleMove = (direction) => {
    if (gameOver) return;

    const newPosition = {
      x: playerPosition.x + direction.x,
      y: playerPosition.y + direction.y,
    };

    if (
      newPosition.x >= 0 &&
      newPosition.x < gridSize &&
      newPosition.y >= 0 &&
      newPosition.y < gridSize
    ) {
      setPlayerPosition(newPosition);
      revealCell(newPosition.x, newPosition.y);
      setRemainingMoves((prev) => prev - 1);
    }
  };

  const revealCell = (x, y) => {
    const newGrid = [...grid];
    if (!newGrid[y][x].revealed) {
      newGrid[y][x].revealed = true;
      setGrid(newGrid);

      switch (newGrid[y][x].type) {
        case CELL_TYPES.TREASURE:
          setScore((prev) => prev + 10);
          toast({
            title: "Treasure Found!",
            description: "You gained 10 points.",
            duration: 2000,
          });
          break;
        case CELL_TYPES.TRAP:
          setScore((prev) => prev - 5);
          toast({
            title: "Trap Triggered!",
            description: "You lost 5 points.",
            duration: 2000,
          });
          break;
      }

      checkGameStatus(newGrid);
    }
  };

  const checkGameStatus = (currentGrid) => {
    const allTreasuresFound = currentGrid.every((row) =>
      row.every((cell) => cell.type !== CELL_TYPES.TREASURE || cell.revealed)
    );

    if (allTreasuresFound) {
      setGameOver(true);
      toast({
        title: "You Win!",
        description: `You found all treasures with a score of ${score}!`,
        duration: 5000,
      });
    } else if (remainingMoves <= 1) {
      setGameOver(true);
      toast({
        title: "Game Over",
        description: "You ran out of moves!",
        duration: 5000,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Treasure Hunt Adventure</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <GameGrid grid={grid} onCellClick={revealCell} />
        </div>
        <div className="flex-1">
          <ControlPanel
            onMove={handleMove}
            remainingMoves={remainingMoves}
            score={score}
            gridSize={gridSize}
            onGridSizeChange={setGridSize}
            onRestart={initializeGrid}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}