import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function App() {
  const [articleText, setArticleText] = useState('');
  const [parsedSections, setParsedSections] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [heatmap, setHeatmap] = useState([]);

  const parseArticle = () => {
    // Simplified parsing logic
    const sections = articleText.split('\n\n').map((section, index) => ({
      title: `Section ${index + 1}`,
      content: section,
      keywords: section.match(/\b(\w+)\b/g)?.filter(word => word.length > 3) || [],
    }));
    setParsedSections(sections);

    // Extract keywords
    const allKeywords = sections.flatMap(section => section.keywords);
    const keywordFrequency = allKeywords.reduce((acc, keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1;
      return acc;
    }, {});
    setKeywords(Object.keys(keywordFrequency).sort((a, b) => keywordFrequency[b] - keywordFrequency[a]).slice(0, 10));

    // Generate simple heatmap data based on keyword density
    const heat = sections.map(section => 
      section.keywords.length / (section.content.length || 1)
    );
    setHeatmap(heat);
  };

  const KeywordGraph = () => (
    <div className="p-4 space-y-2">
      <h3 className="text-lg font-semibold">Keyword Network</h3>
      <div className="flex flex-wrap">
        {keywords.map(keyword => (
          <span key={keyword} className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 mb-2">{keyword}</span>
        ))}
      </div>
    </div>
  );

  const Heatmap = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold">Content Heatmap</h3>
      <div className="flex space-x-2">
        {heatmap.map((heat, index) => (
          <div 
            key={index}
            className="w-6 h-24 bg-gradient-to-t from-green-500 to-red-500" 
            style={{ background: `linear-gradient(to top, green ${heat*100}%, red ${100-heat*100}%)` }}
          ></div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Article Insights Visualizer</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Paste your article here..." 
            value={articleText} 
            onChange={(e) => setArticleText(e.target.value)} 
            className="mb-4 h-48"
          />
          <Button onClick={parseArticle}>Visualize Insights</Button>
          {parsedSections.length > 0 && (
            <div className="mt-4">
              <KeywordGraph />
              <Heatmap />
              {parsedSections.map((section, idx) => (
                <Card key={idx} className="mt-4">
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>{section.content}</CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;