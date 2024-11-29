import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function Quiz() {
  const questions = [
    { id: 1, question: "What is the capital of France?", answer: "Paris" },
    { id: 2, question: "Which planet is known as the Red Planet?", answer: "Mars" },
    { id: 3, question: "What element does 'O' represent on the periodic table?", answer: "Oxygen" },
    { id: 4, question: "Who wrote 'Romeo and Juliet'?", answer: "Shakespeare" },
    { id: 5, question: "What is 7 times 8?", answer: "56" },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(5).fill(""));
  const [feedback, setFeedback] = useState(Array(5).fill(null));
  const [score, setScore] = useState(null);

  const handleAnswerChange = (e) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = e.target.value;
    setUserAnswers(newAnswers);
  };

  const checkAnswer = () => {
    const correct = userAnswers[currentQuestion].toLowerCase() === questions[currentQuestion].answer.toLowerCase();
    setFeedback(prev => {
      const newFeedback = [...prev];
      newFeedback[currentQuestion] = correct ? "Correct!" : "Try Again";
      return newFeedback;
    });
  };

  const navigateQuestion = (direction) => {
    setCurrentQuestion(prev => {
      let nextQuestion = prev + direction;
      if (nextQuestion < 0) return 0;
      if (nextQuestion >= questions.length) return questions.length - 1;
      return nextQuestion;
    });
    setFeedback(prev => {
      const newFeedback = [...prev];
      newFeedback[currentQuestion] = null;
      return newFeedback;
    });
  };

  const startQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers(Array(5).fill(""));
    setFeedback(Array(5).fill(null));
    setScore(null);
  };

  if (score !== null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Quiz Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your score: {score} out of 5</p>
          </CardContent>
          <CardFooter>
            <Button onClick={startQuiz}>Try Again</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-sm sm:p-6">
        <CardHeader>
          <CardTitle>Question {currentQuestion + 1} of 5</CardTitle>
          <CardDescription>{questions[currentQuestion].question}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input 
            value={userAnswers[currentQuestion]} 
            onChange={handleAnswerChange} 
            placeholder="Type your answer here"
          />
          {feedback[currentQuestion] && <p className={feedback[currentQuestion] === "Correct!" ? "text-green-600" : "text-red-600"}>{feedback[currentQuestion]}</p>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => navigateQuestion(-1)} disabled={currentQuestion === 0}>Previous</Button>
          <Button onClick={checkAnswer}>Check Answer</Button>
          <Button onClick={() => navigateQuestion(1)} disabled={currentQuestion === questions.length - 1}>Next</Button>
        </CardFooter>
        {currentQuestion === questions.length - 1 && (
          <CardFooter>
            <Button onClick={() => setScore(userAnswers.filter((ans, idx) => ans.toLowerCase() === questions[idx].answer.toLowerCase()).length)}>Finish Quiz</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8">
        <Quiz />
      </div>
    </div>
  );
}