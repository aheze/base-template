import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const WordCloud = ({ words }) => (
  <div className="flex flex-wrap justify-center p-4 bg-gray-100 rounded-lg">
    {words.map((word, index) => (
      <span
        key={index}
        className="m-1 p-1 hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
        style={{ fontSize: `${Math.max(12, word.count * 5)}px` }}
        title={`Frequency: ${word.count}`}
      >
        {word.text}
      </span>
    ))}
  </div>
);

const SentimentAnalysis = ({ sentiment }) => {
  const emojis = { positive: "😊", neutral: "😐", negative: "😢" };
  return (
    <div className="text-center">
      <span className="text-4xl">{emojis[sentiment]}</span>
      <p className="mt-2">The tone is {sentiment}</p>
    </div>
  );
};

const KeySentence = ({ sentence }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sentence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Key Sentence</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{sentence}</p>
        <Button onClick={copyToClipboard} className="mt-2">
          {copied ? "Copied!" : "Copy to Clipboard"}
        </Button>
      </CardContent>
    </Card>
  );
};

const ReadabilityScore = ({ score }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger className="inline-flex items-center">
        <span className="mr-2">Readability Score: Grade Level {score}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
      </TooltipTrigger>
      <TooltipContent>
        <p>This score indicates the U.S. grade level needed to understand the text.</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default function App() {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [analyzed, setAnalyzed] = useState(false);
  const [wordCloud, setWordCloud] = useState([]);
  const [sentiment, setSentiment] = useState("neutral");
  const [keySentences, setKeySentences] = useState([]);
  const [readabilityScore, setReadabilityScore] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setWordCount(text.trim().split(/\s+/).length);
    setCharCount(text.length);
  }, [text]);

  const analyzeText = () => {
    // Simple word cloud generation
    const words = text.toLowerCase().match(/\b(\w+)\b/g);
    const wordFreq = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
    const sortedWords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([text, count]) => ({ text, count }));
    setWordCloud(sortedWords);

    // Simple sentiment analysis
    const positiveWords = ["good", "great", "excellent", "amazing"];
    const negativeWords = ["bad", "terrible", "awful", "horrible"];
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    setSentiment(positiveCount > negativeCount ? "positive" : (negativeCount > positiveCount ? "negative" : "neutral"));

    // Simple key sentence extraction
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
    setKeySentences(sentences.slice(0, 3));

    // Simple readability score (Flesch-Kincaid Grade Level)
    const totalSentences = sentences.length;
    const totalWords = words.length;
    const totalSyllables = words.reduce((acc, word) => acc + (word.length > 3 ? 1 : 0), 0);
    const score = 0.39 * (totalWords / totalSentences) + 11.8 * (totalSyllables / totalWords) - 15.59;
    setReadabilityScore(Math.round(score));

    setAnalyzed(true);
  };

  const downloadSummary = () => {
    const summary = `
      Sentiment: ${sentiment}
      Readability Score: Grade Level ${readabilityScore}
      Key Sentences:
      ${keySentences.join("\n")}
    `;
    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "article_summary.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Interactive Article Analyzer</h1>
        <p className="text-sm">Transform text into meaningful insights</p>
      </header>
      <main className="container mx-auto p-4">
        <div className="mb-4">
          <Textarea
            placeholder="Paste your article here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-40"
          />
          <p className="text-sm mt-2">
            Characters: {charCount} | Words: {wordCount}
          </p>
        </div>
        <div className="flex justify-between mb-4">
          <Button onClick={analyzeText}>Analyze Article</Button>
          <Button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
        {analyzed && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Word Cloud</CardTitle>
              </CardHeader>
              <CardContent>
                <WordCloud words={wordCloud} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <SentimentAnalysis sentiment={sentiment} />
              </CardContent>
            </Card>
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-2">Key Sentences</h2>
              {keySentences.map((sentence, index) => (
                <KeySentence key={index} sentence={sentence} />
              ))}
            </div>
            <div className="md:col-span-2">
              <ReadabilityScore score={readabilityScore} />
            </div>
            <div className="md:col-span-2">
              <Button onClick={downloadSummary}>Download Summary</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}