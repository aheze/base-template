import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function App() {
  const [article1, setArticle1] = useState("");
  const [article2, setArticle2] = useState("");
  const [keywords1, setKeywords1] = useState([]);
  const [keywords2, setKeywords2] = useState([]);
  const [summary1, setSummary1] = useState("");
  const [summary2, setSummary2] = useState("");
  const [similarityScore, setSimilarityScore] = useState(null);
  const [highlightedDifferences, setHighlightedDifferences] = useState([]);

  const extractKeywords = (text) => {
    const words = text.toLowerCase().split(/\s+/);
    const frequency = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => ({ word, count: frequency[word] }));
  };

  const generateSummary = (text) => {
    const sentences = text.split(". ");
    return sentences.slice(0, 3).join(". ") + ".";
  };

  const calculateSimilarity = () => {
    const set1 = new Set(article1.toLowerCase().split(/\s+/));
    const set2 = new Set(article2.toLowerCase().split(/\s+/));
    const intersection = new Set([...set1].filter((x) => set2.has(x)));
    const score = ((intersection.size / set1.size) * 100).toFixed(2);
    setSimilarityScore(score);
    highlightDifferences();
  };

  const highlightDifferences = () => {
    const text1 = article1.split(/\s+/);
    const text2 = article2.split(/\s+/);

    const diffs = text1.map((word, index) => {
      if (word !== text2[index]) {
        return `<span class="bg-red-200 px-1">${word}</span>`;
      }
      return word;
    });

    setHighlightedDifferences(diffs.join(" "));
  };

  const handleCompare = () => {
    setKeywords1(extractKeywords(article1));
    setKeywords2(extractKeywords(article2));
    setSummary1(generateSummary(article1));
    setSummary2(generateSummary(article2));
    calculateSimilarity();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 text-gray-800 p-6">
      <header className="text-center mb-6">
        <h1 className="text-5xl font-extrabold mb-4 text-blue-600 animate-pulse">
          Article Comparison Mode
        </h1>
        <p className="text-gray-700 text-lg">
          Analyze, compare, and visualize article differences.
        </p>
      </header>

      {/* Article Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Article 1</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
              rows="8"
              placeholder="Paste your first article here..."
              value={article1}
              onChange={(e) => setArticle1(e.target.value)}
            />
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Article 2</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
              rows="8"
              placeholder="Paste your second article here..."
              value={article2}
              onChange={(e) => setArticle2(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Comparison Button */}
      <div className="text-center mb-6">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-110"
          onClick={handleCompare}
        >
          Compare Articles
        </button>
      </div>

      {/* Results Section */}
      {similarityScore !== null && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Keywords Comparison */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Keywords Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-blue-600 mb-2">Article 1</h3>
                  {keywords1.map((keyword, index) => (
                    <div
                      key={index}
                      className="text-sm px-3 py-1 bg-blue-200 rounded-full text-blue-800 hover:bg-blue-300 transition-transform transform hover:scale-105"
                    >
                      {keyword.word} ({keyword.count})
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="font-bold text-green-600 mb-2">Article 2</h3>
                  {keywords2.map((keyword, index) => (
                    <div
                      key={index}
                      className="text-sm px-3 py-1 bg-green-200 rounded-full text-green-800 hover:bg-green-300 transition-transform transform hover:scale-105"
                    >
                      {keyword.word} ({keyword.count})
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Similarity Score */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Similarity Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-center text-blue-600">
                {similarityScore}%
              </p>
              <p className="text-center text-gray-600">
                Similarity between the two articles.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Highlighted Differences */}
      {highlightedDifferences.length > 0 && (
        <Card className="shadow-lg mt-6 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Highlighted Differences</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightedDifferences }}
            ></p>
          </CardContent>
        </Card>
      )}

      {/* Summaries Section */}
      {summary1 && summary2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Summary: Article 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{summary1}</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Summary: Article 2</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{summary2}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
