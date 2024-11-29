import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ArticleInput = ({ onArticleSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onArticleSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your article here..."
        className="w-full h-40"
      />
      <Button type="submit">Submit Article</Button>
    </form>
  );
};

const ArticleComparison = ({ articles }) => {
  const [showHeadings, setShowHeadings] = useState(true);
  const [showKeywords, setShowKeywords] = useState(true);

  const toggleHeadings = useCallback(() => setShowHeadings((prev) => !prev), []);
  const toggleKeywords = useCallback(() => setShowKeywords((prev) => !prev), []);

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Toggle pressed={showHeadings} onPressedChange={toggleHeadings}>
          Show Headings
        </Toggle>
        <Toggle pressed={showKeywords} onPressedChange={toggleKeywords}>
          Show Keywords
        </Toggle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Article {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose">
                {showHeadings && <h2>Headings would be here</h2>}
                <p>{article}</p>
                {showKeywords && <div>Keywords would be highlighted here</div>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const KeywordComparison = ({ articles }) => {
  // Simplified keyword extraction and comparison
  const keywords = articles.map((article) =>
    article
      .split(/\s+/)
      .filter((word) => word.length > 3)
      .slice(0, 10)
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      {keywords.map((articleKeywords, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>Article {index + 1} Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {articleKeywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const SimilarityScore = ({ articles }) => {
  // Simplified similarity calculation
  const score = Math.round(
    (articles[0].split(/\s+/).filter((word) => articles[1].includes(word))
      .length /
      articles[0].split(/\s+/).length) *
      100
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Similarity Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-center">{score}%</div>
      </CardContent>
    </Card>
  );
};

export default function App() {
  const [articles, setArticles] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleArticleSubmit = useCallback((text) => {
    setArticles((prev) => [...prev, text]);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  return (
    <div className={`min-h-screen p-4 ${darkMode ? "dark bg-gray-900 text-white" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Article Comparison Mode</h1>
          <Button onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </header>

        <ArticleInput onArticleSubmit={handleArticleSubmit} />

        {articles.length === 2 && (
          <Tabs defaultValue="comparison" className="w-full">
            <TabsList>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="similarity">Similarity</TabsTrigger>
            </TabsList>
            <TabsContent value="comparison">
              <ArticleComparison articles={articles} />
            </TabsContent>
            <TabsContent value="keywords">
              <KeywordComparison articles={articles} />
            </TabsContent>
            <TabsContent value="similarity">
              <SimilarityScore articles={articles} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}