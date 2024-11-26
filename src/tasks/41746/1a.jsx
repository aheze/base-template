import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function App() {
  const [operation, setOperation] = useState('add');
  const [difficulty, setDifficulty] = useState('easy');
  const [question, setQuestion] = useState({ num1: 0, num2: 0, op: '+' });
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState('');
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const operations = {
    'add': '+',
    'subtract': '-',
    'multiply': '×',
    'divide': '÷'
  };

  const generateQuestion = () => {
    let num1, num2;
    switch(difficulty) {
      case 'easy':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        break;
      case 'medium':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        break;
      case 'hard':
        num1 = Math.floor(Math.random() * 100) + 1;
        num2 = Math.floor(Math.random() * 100) + 1;
        break;
    }
    if (operation === 'divide') {
      num2 = num2 === 0 ? 1 : num2; // Avoid division by zero
      num1 = num1 * num2; // Ensure result is an integer
    }
    setQuestion({ num1, num2, op: operations[operation] });
  };

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const timerId = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
  }, [timer, isTimerRunning]);

  const checkAnswer = () => {
    let correctAnswer;
    switch(operation) {
      case 'add': correctAnswer = question.num1 + question.num2; break;
      case 'subtract': correctAnswer = question.num1 - question.num2; break;
      case 'multiply': correctAnswer = question.num1 * question.num2; break;
      case 'divide': correctAnswer = question.num1 / question.num2; break;
    }
    const isCorrect = parseFloat(userAnswer) === correctAnswer;
    setFeedback(isCorrect ? 'Correct!' : `Wrong. The answer was ${correctAnswer}`);
    setScore(prev => ({ correct: isCorrect ? prev.correct + 1 : prev.correct, total: prev.total + 1 }));
    generateQuestion();
    setUserAnswer('');
  };

  const startTimer = () => {
    setTimer(60);
    setIsTimerRunning(true);
    generateQuestion();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>Math Practice</CardTitle>
          <CardDescription>Improve your math skills!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label htmlFor="operation">Choose Operation:</Label>
            <select 
              id="operation" 
              value={operation} 
              onChange={(e) => setOperation(e.target.value)} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {Object.keys(operations).map(op => <option key={op} value={op}>{op}</option>)}
            </select>

            <Label htmlFor="difficulty">Difficulty:</Label>
            <select 
              id="difficulty" 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <div className="text-2xl font-bold">
              {question.num1} {question.op} {question.num2} = ?
            </div>

            <Input 
              type="number" 
              value={userAnswer} 
              onChange={(e) => setUserAnswer(e.target.value)} 
              placeholder="Your answer"
              className="mb-2"
            />

            <Button onClick={checkAnswer} disabled={isTimerRunning && timer === 0}>Submit</Button>

            <div className="text-center text-lg">{feedback}</div>

            <div>Score: {score.correct}/{score.total}</div>

            {!isTimerRunning ? 
              <Button onClick={startTimer}>Start Timer (60s)</Button> :
              <div>Time Left: {timer}s</div>
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;