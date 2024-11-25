import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// # Quiz Application
function Quiz() {
  // ## All questions data
  const allQuestions = [
    {
      id: 1,
      question: "What is the capital of France?",
      answer: "Paris",
      options: ["Paris", "Rome", "Madrid", "Berlin"],
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      answer: "Mars",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
    },
    {
      id: 3,
      question: "What element does 'O' represent on the periodic table?",
      answer: "Oxygen",
      options: ["Oxygen", "Osmium", "Gold", "Oganesson"],
    },
    {
      id: 4,
      question: "Who wrote 'Romeo and Juliet'?",
      answer: "Shakespeare",
      options: ["Shakespeare", "Dickens", "Hemingway", "Poe"],
    },
    {
      id: 5,
      question: "What is 7 times 8?",
      answer: "56",
      options: ["48", "54", "56", "64"],
    },
    {
      id: 6,
      question: "What is the largest ocean on Earth?",
      answer: "Pacific Ocean",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
    },
    {
      id: 7,
      question: "Who painted the Mona Lisa?",
      answer: "Leonardo da Vinci",
      options: [
        "Leonardo da Vinci",
        "Michelangelo",
        "Raphael",
        "Van Gogh",
      ],
    },
    {
      id: 8,
      question: "What is the chemical formula for water?",
      answer: "H2O",
      options: ["H2O", "CO2", "O2", "H2"],
    },
  ];

  // ## State variables
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [score, setScore] = useState(null);

  // ## Shuffle questions on load
  useEffect(() => {
    const shuffledQuestions = allQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    setQuestions(shuffledQuestions);
    setUserAnswers(Array(5).fill(""));
    setFeedback(Array(5).fill(null));
  }, []);

  // ## Handle answer selection
  const handleAnswerSelect = (option) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = option;
    setUserAnswers(newAnswers);
  };

  // ## Check current answer
  const checkAnswer = () => {
    const correct =
      userAnswers[currentQuestion] === questions[currentQuestion].answer;
    setFeedback((prev) => {
      const newFeedback = [...prev];
      newFeedback[currentQuestion] = correct ? "Correct!" : "Try Again";
      return newFeedback;
    });
  };

  // ## Navigate questions
  const navigateQuestion = (direction) => {
    setCurrentQuestion((prev) => {
      let nextQuestion = prev + direction;
      if (nextQuestion < 0) return 0;
      if (nextQuestion >= questions.length) return questions.length - 1;
      return nextQuestion;
    });
    setFeedback((prev) => {
      const newFeedback = [...prev];
      newFeedback[currentQuestion] = null;
      return newFeedback;
    });
  };

  // ## Start or restart the quiz
  const startQuiz = () => {
    const shuffledQuestions = allQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    setQuestions(shuffledQuestions);
    setCurrentQuestion(0);
    setUserAnswers(Array(5).fill(""));
    setFeedback(Array(5).fill(null));
    setScore(null);
  };

  // ## Finish quiz and calculate score
  const finishQuiz = () => {
    const finalScore = userAnswers.filter(
      (ans, idx) => ans === questions[idx].answer
    ).length;
    setScore(finalScore);
  };

  // ## Render results after quiz completion
  if (score !== null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader>
            <CardTitle>Quiz Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              **Your score:** {score} out of {questions.length}
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={startQuiz} className="bg-white text-blue-500">
              **Try Again**
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // ## Render loading state
  if (!questions.length) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p>Loading questions...</p>
      </div>
    );
  }

  // ## Render the quiz content
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white">
      <Card className="w-full max-w-lg sm:p-6 bg-white text-gray-900 shadow-lg">
        <CardHeader>
          <CardTitle>
            **Question {currentQuestion + 1} of {questions.length}**
          </CardTitle>
          <CardDescription>
            {questions[currentQuestion].question}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full ${
                userAnswers[currentQuestion] === option
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {option}
            </Button>
          ))}
          {feedback[currentQuestion] && (
            <p
              className={`font-bold ${
                feedback[currentQuestion] === "Correct!"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {feedback[currentQuestion]}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => navigateQuestion(-1)}
            disabled={currentQuestion === 0}
            className="bg-blue-500 text-white"
          >
            Previous
          </Button>
          <Button onClick={checkAnswer} className="bg-green-500 text-white">
            Check Answer
          </Button>
          <Button
            onClick={() => navigateQuestion(1)}
            disabled={currentQuestion === questions.length - 1}
            className="bg-blue-500 text-white"
          >
            Next
          </Button>
        </CardFooter>
        {currentQuestion === questions.length - 1 && (
          <CardFooter>
            <Button
              onClick={finishQuiz}
              className="bg-green-500 text-white w-full"
            >
              Finish Quiz
            </Button>
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
