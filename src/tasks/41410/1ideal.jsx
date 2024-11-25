// Importing necessary modules and components
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Utility function to calculate the word count of the text
const calculateWordCount = (text) => text.split(/\s+/).filter(Boolean).length;

// Utility function to generate word cloud data
const generateWordCloudData = (text) => {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  const frequency = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(frequency).map(([word, count]) => ({ word, count }));
};

// Utility function to analyze the sentiment of the text
const analyzeSentiment = (text) => {
  const positiveWords = ["good", "great", "excellent", "positive", "happy"];
  const negativeWords = ["bad", "poor", "terrible", "negative", "sad"];
  const tokens = text.toLowerCase().split(/\s+/);
  let positive = 0, negative = 0;

  tokens.forEach((token) => {
    if (positiveWords.includes(token)) positive++;
    if (negativeWords.includes(token)) negative++;
  });

  if (positive > negative) return { emoji: "😊", label: "Positive" };
  if (negative > positive) return { emoji: "😢", label: "Negative" };
  return { emoji: "😐", label: "Neutral" };
};

// Utility function to extract key sentences from the text
const extractKeySentences = (text) => {
  const sentences = text.match(/[^.!?]+[.!?]/g) || [];
  return sentences.slice(0, 3);
};

// Utility function to calculate readability score of the text
const calculateReadabilityScore = (text) => {
  const sentences = text.match(/[^.!?]+[.!?]/g)?.length || 1;
  const words = calculateWordCount(text);
  const syllables = text.match(/[aeiouy]+/gi)?.length || 1;
  const score =
    206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  return Math.max(1, Math.min(12, Math.round(15 - score / 10)));
};

// InputSection component to handle user input
const InputSection = ({ text, setText, onAnalyze }) => (
  <div className="space-y-4">
    <textarea
      className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      rows="6"
      placeholder="Paste your article here..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
    <div className="flex justify-between items-center">
      <p className="text-gray-500">
        Characters: {text.length} | Words: {calculateWordCount(text)}
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition-transform transform hover:scale-105"
        onClick={onAnalyze}
      >
        Analyze Article
      </button>
    </div>
  </div>
);

// WordCloud component to display word frequency visually
const WordCloud = ({ data }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>Word Cloud</CardTitle>
      <CardDescription>Visual representation of word frequency</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {data.map(({ word, count }) => (
          <span
            key={word}
            className="cursor-pointer transition-all hover:scale-110"
            style={{
              fontSize: `${12 + count * 5}px`,
              color: `hsl(${count * 30}, 70%, 50%)`,
              fontWeight: count > 2 ? "bold" : "normal",
            }}
            title={`Frequency: ${count}`}
          >
            {word}
          </span>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Sentiment component to display sentiment analysis results
const Sentiment = ({ result }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>Sentiment Analysis</CardTitle>
      <CardDescription>
        Tone of the article based on word analysis
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-2xl">{result.emoji} {result.label}</p>
    </CardContent>
  </Card>
);

// KeySentences component to display key sentences
const KeySentences = ({ sentences }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>Key Sentences</CardTitle>
      <CardDescription>Highlighted important sentences</CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      {sentences.map((sentence, idx) => (
        <div key={idx} className="p-2 border rounded-md">
          <p>{sentence}</p>
        </div>
      ))}
    </CardContent>
  </Card>
);

// Readability component to display readability score
const Readability = ({ score }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>Readability Score</CardTitle>
      <CardDescription>
        Grade Level: {score} (1 = Easy, 12 = Difficult)
      </CardDescription>
    </CardHeader>
  </Card>
);

// Main App component
export default function App() {
  const [text, setText] = useState("");
  const [wordCloudData, setWordCloudData] = useState([]);
  const [sentimentResult, setSentimentResult] = useState(null);
  const [keySentences, setKeySentences] = useState([]);
  const [readabilityScore, setReadabilityScore] = useState(null);

  const handleAnalyze = () => {
    setWordCloudData(generateWordCloudData(text));
    setSentimentResult(analyzeSentiment(text));
    setKeySentences(extractKeySentences(text));
    setReadabilityScore(calculateReadabilityScore(text));
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-500">
          Interactive Article Analyzer
        </h1>
        <p className="text-gray-600">Transform text into meaningful insights</p>
      </header>
      <main className="space-y-8">
        <InputSection text={text} setText={setText} onAnalyze={handleAnalyze} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wordCloudData.length > 0 && <WordCloud data={wordCloudData} />}
          {sentimentResult && <Sentiment result={sentimentResult} />}
          {keySentences.length > 0 && <KeySentences sentences={keySentences} />}
          {readabilityScore && <Readability score={readabilityScore} />}
        </div>
      </main>
    </div>
  );
}
