import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GRID_SIZE = 5;
const MAX_MOVES = 20;
const TREASURE_COUNT = 5;
const TRAP_COUNT = 8;

function generateGrid(size, treasures, traps) {
  let grid = Array(size * size).fill('empty');
  const placeItems = (items, symbol) => {
    for (let i = 0; i < items; i++) {
      let index;
      do {
        index = Math.floor(Math.random() * grid.length);
      } while (grid[index] !== 'empty');
      grid[index] = symbol;
    }
  };
  placeItems(treasures, '💎');
  placeItems(traps, '💀');
  return grid;
}

function Cell({ value, onClick }) {
  let className = "w-12 h-12 flex items-center justify-center text-2xl border";
  if (value === '💎') className += " animate-pulse";
  else if (value === '💀') className += " animate-bounce";

  return <div className={className} onClick={onClick}>{value}</div>;
}

function GameGrid({ grid, revealCell }) {
  return (
    <div className="grid grid-cols-5 gap-1">
      {grid.map((cell, index) => (
        <Cell key={index} value={cell === 'empty' ? '' : cell} onClick={() => revealCell(index)} />
      ))}
    </div>
  );
}

export default function App() {
  const [grid, setGrid] = useState(generateGrid(GRID_SIZE, TREASURE_COUNT, TRAP_COUNT));
  const [playerPosition, setPlayerPosition] = useState(0);
  const [movesLeft, setMovesLeft] = useState(MAX_MOVES);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing');

  useEffect(() => {
    const handleKeyPress = (event) => {
      let newPosition = playerPosition;
      switch(event.key) {
        case 'ArrowUp': if (playerPosition >= GRID_SIZE) newPosition -= GRID_SIZE; break;
        case 'ArrowDown': if (playerPosition < GRID_SIZE * (GRID_SIZE - 1)) newPosition += GRID_SIZE; break;
        case 'ArrowLeft': if (playerPosition % GRID_SIZE !== 0) newPosition -= 1; break;
        case 'ArrowRight': if ((playerPosition + 1) % GRID_SIZE !== 0) newPosition += 1; break;
      }
      if (newPosition !== playerPosition) {
        movePlayer(newPosition);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPosition]);

  const revealCell = (index) => {
    if (gameStatus !== 'playing' || index !== playerPosition) return;
    const newGrid = [...grid];
    if (newGrid[index] === 'empty') {
      newGrid[index] = '🔍';
    }
    setGrid(newGrid);
    movePlayer(index);
  };

  const movePlayer = (newPosition) => {
    setPlayerPosition(newPosition);
    setMovesLeft(prev => prev - 1);
    
    if (grid[newPosition] === '💎') {
      setScore(prev => prev + 10);
    } else if (grid[newPosition] === '💀') {
      setScore(prev => prev - 5);
    }

    if (grid.filter(cell => cell === '💎').length === 0) {
      setGameStatus('won');
    } else if (movesLeft === 1 || grid.filter(cell => cell === '💀').length >= 3) {
      setGameStatus('lost');
    }
  };

  const restartGame = () => {
    setGrid(generateGrid(GRID_SIZE, TREASURE_COUNT, TRAP_COUNT));
    setPlayerPosition(0);
    setMovesLeft(MAX_MOVES);
    setScore(0);
    setGameStatus('playing');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4 sm:p-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Treasure Hunt Adventure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {gameStatus === 'playing' ? (
            <>
              <GameGrid grid={grid} revealCell={revealCell} />
              <div className="text-center">
                <p>Moves Left: {movesLeft}</p>
                <p>Score: {score}</p>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <h2 className={`text-2xl ${gameStatus === 'won' ? 'text-green-600' : 'text-red-600'}`}>
                {gameStatus === 'won' ? 'You Win!' : 'Game Over'}
              </h2>
              <p>Final Score: {score}</p>
              <Button onClick={restartGame}>Play Again</Button>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="mt-4 space-x-2">
        <Button onClick={() => movePlayer(playerPosition - 1)}>Left</Button>
        <Button onClick={() => movePlayer(playerPosition - GRID_SIZE)}>Up</Button>
        <Button onClick={() => movePlayer(playerPosition + GRID_SIZE)}>Down</Button>
        <Button onClick={() => movePlayer(playerPosition + 1)}>Right</Button>
      </div>
    </div>
  );
}