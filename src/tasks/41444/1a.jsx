import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const KeywordNetwork = ({ keywords }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
        >
          {keyword}
        </span>
      ))}
    </div>
  );
};

const Timeline = ({ events }) => {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={index} className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <div className="ml-4">
            <p className="font-semibold">{event.date}</p>
            <p>{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Heatmap = ({ sections }) => {
  return (
    <div className="space-y-2">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`p-2 rounded ${
            section.density > 0.7
              ? "bg-red-200"
              : section.density > 0.4
              ? "bg-yellow-200"
              : "bg-green-200"
          }`}
        >
          <p className="font-semibold">{section.title}</p>
          <p className="text-sm">Density: {section.density.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

const Summary = ({ summary }) => {
  return (
    <div className="space-y-2">
      {summary.map((item, index) => (
        <p key={index} className="text-sm">
          • {item}
        </p>
      ))}
    </div>
  );
};

export default function App() {
  const [article, setArticle] = useState("");
  const [insights, setInsights] = useState(null);

  const analyzeArticle = () => {
    // In a real app, this would be a complex analysis process
    // Here, we're simulating the results
    setInsights({
      keywords: [
        "React",
        "Tailwind",
        "Shadcn",
        "Article Analysis",
        "Visualization",
      ],
      timeline: [
        { date: "2023-01-01", description: "Article published" },
        { date: "2023-02-15", description: "First major update" },
        { date: "2023-05-30", description: "Second revision" },
      ],
      heatmap: [
        { title: "Introduction", density: 0.3 },
        { title: "Main Content", density: 0.8 },
        { title: "Conclusion", density: 0.5 },
      ],
      summary: [
        "This article discusses modern web development techniques.",
        "It focuses on React, Tailwind, and Shadcn integration.",
        "The importance of responsive design is emphasized.",
      ],
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Article Insights Visualizer</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Input Article</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste your article here..."
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            className="h-40 mb-4"
          />
          <Button onClick={analyzeArticle}>Analyze Article</Button>
        </CardContent>
      </Card>

      {insights && (
        <Tabs defaultValue="keywords" className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          <TabsContent value="keywords">
            <Card>
              <CardHeader>
                <CardTitle>Keyword Network</CardTitle>
              </CardHeader>
              <CardContent>
                <KeywordNetwork keywords={insights.keywords} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <Timeline events={insights.timeline} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="heatmap">
            <Card>
              <CardHeader>
                <CardTitle>Content Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <Heatmap sections={insights.heatmap} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle>Article Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Summary summary={insights.summary} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}