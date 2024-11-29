import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const App = () => {
  // States for question, user input, feedback, score, and timer
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [timer, setTimer] = useState(60); // 60 seconds for practice mode
  const [practiceMode, setPracticeMode] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);

  // Generate a random math question based on difficulty and operation
  const generateQuestion = (difficulty = "easy", operation = null) => {
    const num1 = difficulty === "easy" ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 100);
    const num2 = difficulty === "easy" ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 100);
    const operations = ["+", "-", "*", "/"];
    const op = operation || operations[Math.floor(Math.random() * operations.length)];
    let correctAnswer;

    if (op === "+") correctAnswer = num1 + num2;
    else if (op === "-") correctAnswer = num1 - num2;
    else if (op === "*") correctAnswer = num1 * num2;
    else if (op === "/") correctAnswer = parseFloat((num1 / num2).toFixed(2));

    setQuestion({ num1, num2, op, correctAnswer });
  };

  // Handle answer validation and submission
  const handleSubmit = () => {
    if (!answer) {
      setFeedback("Please enter an answer.");
      return;
    }

    if (parseFloat(answer) === question.correctAnswer) {
      setFeedback("Correct!");
      setScore({ ...score, correct: score.correct + 1, total: score.total + 1 });
    } else {
      setFeedback(`Wrong! The correct answer is ${question.correctAnswer}`);
      setScore({ ...score, total: score.total + 1 });
    }

    setAnswer("");
    generateQuestion();
  };

  // Start a timed learning session
  const startLearningSession = () => {
    setSessionActive(true);
    setScore({ correct: 0, total: 0 });
    generateQuestion();
    setTimer(60);
  };

  // Timer for practice mode
  useEffect(() => {
    if (sessionActive && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0) setSessionActive(false); // End session when time is up
  }, [sessionActive, timer]);

  // Initialize the app
  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-indigo-600">
        Math Learning Application
      </h1>
      {/* Mode Toggle */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`py-2 px-4 rounded-md shadow-md ${
            practiceMode ? "bg-indigo-500 text-white" : "bg-gray-200"
          } hover:bg-indigo-600`}
          onClick={() => setPracticeMode((prev) => !prev)}
        >
          {practiceMode ? "Switch to Regular Practice" : "Switch to Timed Practice"}
        </button>
        {practiceMode && (
          <button
            className="py-2 px-4 rounded-md shadow-md bg-green-500 text-white hover:bg-green-600"
            onClick={startLearningSession}
          >
            Start Session
          </button>
        )}
      </div>

      {/* Question Card */}
      <Card className="max-w-md mx-auto mb-6">
        <CardHeader>
          <CardTitle>Math Question</CardTitle>
          <CardDescription>Solve the question below:</CardDescription>
        </CardHeader>
        <CardContent>
          {sessionActive || !practiceMode ? (
            <div className="text-center text-xl font-semibold">
              {question.num1} {question.op} {question.num2}
            </div>
          ) : (
            <p className="text-center text-gray-500">Start a session to begin practicing!</p>
          )}
        </CardContent>
        <CardFooter>
          {sessionActive || !practiceMode ? (
            <>
              <input
                type="text"
                className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button
                className="mt-4 w-full py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </>
          ) : null}
        </CardFooter>
      </Card>

      {/* Feedback and Scoring */}
      {feedback && (
        <div
          className={`text-center mb-4 font-semibold ${
            feedback.includes("Correct") ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback}
        </div>
      )}
      <div className="text-center font-semibold mb-6">
        Score: {score.correct} / {score.total}
      </div>

      {/* Timer for Practice Mode */}
      {practiceMode && (
        <div className="text-center text-xl font-semibold text-gray-700 mb-6">
          Time Left: {timer}s
        </div>
      )}
    </div>
  );
};

export default App;
