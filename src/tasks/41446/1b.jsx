import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({X: 0, O: 0});

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { player: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
  };

  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinner(result);
      setScores(prevScores => ({
        ...prevScores,
        [result.player]: prevScores[result.player] + 1
      }));
    } else if (!board.includes(null)) {
      setWinner('draw');
    }
  }, [board]);

  const Square = ({ value, onClick, index, highlight }) => (
    <button 
      className={`square ${highlight ? 'bg-emerald-200' : ''} hover:bg-slate-100 transition-colors duration-200 ease-in-out`} 
      onClick={onClick}
    >
      {value}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Tic Tac Toe Challenge</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-center">
            {winner ? (
              winner === 'draw' ? 'It\'s a Draw!' : `Winner: ${winner.player}`
            ) : `Next Player: ${xIsNext ? 'X' : 'O'}`}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {board.map((value, index) => (
              <Square 
                key={index}
                value={value}
                onClick={() => handleClick(index)}
                index={index}
                highlight={winner && winner.line && winner.line.includes(index)}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button onClick={resetGame} className="mt-4 w-full">Reset Game</Button>
        </CardFooter>
      </Card>
      <div className="mt-4 text-center">
        <p>Score - X: {scores.X} | O: {scores.O}</p>
      </div>
    </div>
  );
};

export default function App() {
  return <TicTacToe />;
}