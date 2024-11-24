import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";

const ArticleComparison = () => {
  const [articles, setArticles] = useState([{ content: '', title: '' }, { content: '', title: '' }]);
  const [showDiff, setShowDiff] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleArticleChange = (index, field, value) => {
    setArticles(prev => 
      prev.map((article, i) => 
        i === index ? { ...article, [field]: value } : article
      )
    );
  };

  const highlightDifferences = (text1, text2) => {
    let diff = '';
    // Simplified difference highlighting
    if (showDiff) {
      diff = text1.split(' ').map(word => 
        text2.includes(word) ? `<span class="text-green-500">${word}</span>` : `<span class="text-red-500">${word}</span>`
      ).join(' ');
    } else {
      diff = text1;
    }
    return <div dangerouslySetInnerHTML={{ __html: diff }} />;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Article Comparison Mode</h1>
          <Toggle 
            checked={darkMode} 
            onCheckedChange={setDarkMode} 
            className="mr-2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {articles.map((article, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{`Article ${index + 1}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <Input 
                  placeholder="Title" 
                  value={article.title} 
                  onChange={(e) => handleArticleChange(index, 'title', e.target.value)} 
                />
                <Textarea 
                  placeholder="Paste or type article content here..." 
                  className="mt-2 h-64" 
                  value={article.content} 
                  onChange={(e) => handleArticleChange(index, 'content', e.target.value)} 
                />
              </CardContent>
            </Card>
          ))}
        </div>
        <Button onClick={() => setShowDiff(!showDiff)} className="mt-4">
          {showDiff ? 'Hide Differences' : 'Show Differences'}
        </Button>
        {articles[0].content && articles[1].content && (
          <div className="mt-4">
            {highlightDifferences(articles[0].content, articles[1].content)}
            <hr className="my-4"/>
            {highlightDifferences(articles[1].content, articles[0].content)}
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return <ArticleComparison />;
}