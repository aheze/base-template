import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quizQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", answer: "Mars" },
  { question: "What is the largest mammal?", answer: "Blue Whale" },
  { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
  { question: "What is the chemical symbol for gold?", answer: "Au" }
];

const QuizQuestion = ({ question, userAnswer, onAnswerChange, onCheckAnswer, feedback }) => (
  <CardContent className="space-y-4">
    <p className="text-lg">{question}</p>
    <Input
      type="text"
      placeholder="Enter your answer"
      value={userAnswer}
      onChange={(e) => onAnswerChange(e.target.value)}
    />
    <Button onClick={onCheckAnswer}>Check Answer</Button>
    {feedback && (
      <p className={`text-lg font-bold ${feedback === "Correct!" ? "text-green-500" : "text-red-500"}`}>
        {feedback}
      </p>
    )}
  </CardContent>
);

const QuizNavigation = ({ currentQuestion, onPrevious, onNext }) => (
  <CardFooter className="flex justify-between">
    <Button onClick={onPrevious} disabled={currentQuestion === 0}>
      Previous
    </Button>
    <Button onClick={onNext} disabled={currentQuestion === quizQuestions.length - 1}>
      Next
    </Button>
  </CardFooter>
);

const QuizSummary = ({ score }) => (
  <CardContent className="text-center">
    <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
    <p className="text-xl">Your score: {score} out of 5</p>
  </CardContent>
);

export default function App() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(quizQuestions.length).fill(""));
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  const handleStart = () => setStarted(true);

  const handleAnswerChange = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);
  };

  const handleCheckAnswer = () => {
    const isCorrect = userAnswers[currentQuestion].toLowerCase() === quizQuestions[currentQuestion].answer.toLowerCase();
    setFeedback(isCorrect ? "Correct!" : "Try Again");
    if (isCorrect && feedback !== "Correct!") {
      setScore(score + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
    setFeedback("");
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
    setFeedback("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {!started ? "Learning Quiz" : `Question ${currentQuestion + 1} of 5`}
          </CardTitle>
        </CardHeader>
        {!started ? (
          <CardContent>
            <Button onClick={handleStart} className="w-full">Start Quiz</Button>
          </CardContent>
        ) : currentQuestion < quizQuestions.length ? (
          <>
            <QuizQuestion
              question={quizQuestions[currentQuestion].question}
              userAnswer={userAnswers[currentQuestion]}
              onAnswerChange={handleAnswerChange}
              onCheckAnswer={handleCheckAnswer}
              feedback={feedback}
            />
            <QuizNavigation
              currentQuestion={currentQuestion}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </>
        ) : (
          <QuizSummary score={score} />
        )}
      </Card>
    </div>
  );
}