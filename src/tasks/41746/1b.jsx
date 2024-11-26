import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const operations = ["+", "-", "*", "/"];
const difficultyLevels = ["Easy", "Medium", "Hard"];

const generateQuestion = (operation, difficulty) => {
  let num1, num2;
  switch (difficulty) {
    case "Easy":
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      break;
    case "Medium":
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
      break;
    case "Hard":
      num1 = Math.floor(Math.random() * 100) + 1;
      num2 = Math.floor(Math.random() * 100) + 1;
      break;
    default:
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
  }

  if (operation === "/" && num2 > num1) {
    [num1, num2] = [num2, num1];
  }

  return { num1, num2, operation };
};

const calculateAnswer = (num1, num2, operation) => {
  switch (operation) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return Math.round((num1 / num2) * 100) / 100;
    default:
      return 0;
  }
};

const QuestionDisplay = ({ question }) => (
  <div className="text-2xl font-bold mb-4">
    {question.num1} {question.operation} {question.num2} = ?
  </div>
);

const FeedbackDisplay = ({ feedback }) => (
  <div className={`text-lg font-semibold ${feedback.isCorrect ? "text-green-500" : "text-red-500"}`}>
    {feedback.message}
  </div>
);

const ScoreDisplay = ({ score, total }) => (
  <div className="text-lg">
    Score: {score} / {total}
  </div>
);

const TimerDisplay = ({ timeLeft }) => (
  <div className="text-lg font-semibold">
    Time left: {timeLeft}s
  </div>
);

export default function App() {
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState({ message: "", isCorrect: false });
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [operation, setOperation] = useState("+");
  const [difficulty, setDifficulty] = useState("Easy");
  const [gameMode, setGameMode] = useState("practice");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameActive, setIsGameActive] = useState(false);

  useEffect(() => {
    if (gameMode === "timed" && isGameActive) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsGameActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameMode, isGameActive]);

  const generateNewQuestion = () => {
    const newQuestion = generateQuestion(operation, difficulty);
    setQuestion(newQuestion);
    setAnswer("");
    setFeedback({ message: "", isCorrect: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswer = calculateAnswer(question.num1, question.num2, question.operation);
    const isCorrect = parseFloat(answer) === correctAnswer;

    setFeedback({
      message: isCorrect ? "Correct!" : `Wrong. The correct answer is ${correctAnswer}.`,
      isCorrect,
    });

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setTotal((prevTotal) => prevTotal + 1);

    if (gameMode === "practice" || (gameMode === "timed" && timeLeft > 0)) {
      setTimeout(generateNewQuestion, 1500);
    }
  };

  const startGame = () => {
    setScore(0);
    setTotal(0);
    setTimeLeft(60);
    setIsGameActive(true);
    generateNewQuestion();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Math Practice App</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Operation</Label>
              <RadioGroup
                value={operation}
                onValueChange={setOperation}
                className="flex space-x-2"
              >
                {operations.map((op) => (
                  <div key={op} className="flex items-center space-x-2">
                    <RadioGroupItem value={op} id={op} />
                    <Label htmlFor={op}>{op}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficultyLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Practise Mode</Label>
              <RadioGroup
                value={gameMode}
                onValueChange={setGameMode}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="practice" id="practice" />
                  <Label htmlFor="practice">Practice</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="timed" id="timed" />
                  <Label htmlFor="timed">Timed</Label>
                </div>
              </RadioGroup>
            </div>

            {isGameActive ? (
              <>
                <QuestionDisplay question={question} />
                <Input
                  type="number"
                  step="0.01"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your answer"
                  className="w-full"
                />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
                <FeedbackDisplay feedback={feedback} />
                <ScoreDisplay score={score} total={total} />
                {gameMode === "timed" && <TimerDisplay timeLeft={timeLeft} />}
              </>
            ) : (
              <Button onClick={startPractising} className="w-full">
                Start Game
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}