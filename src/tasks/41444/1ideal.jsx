import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function App() {
  const [article, setArticle] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [hierarchicalMap, setHierarchicalMap] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [annotations, setAnnotations] = useState({});
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [summary, setSummary] = useState("");

  const processArticle = () => {
    if (!article.trim()) return;

    const generatedKeywords = extractKeywords(article);
    const generatedHierarchicalMap = generateHierarchicalMap(article);
    const generatedTimeline = detectTimeline(article);
    const generatedSummary = summarizeArticle(article);

    setKeywords(generatedKeywords);
    setHierarchicalMap(generatedHierarchicalMap);
    setTimeline(generatedTimeline);
    setSummary(generatedSummary);
  };

  const extractKeywords = (text) => {
    const words = text.toLowerCase().split(/\s+/);
    const frequency = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
  };

  const generateHierarchicalMap = (text) => {
    const sections = text.split("\n").filter((line) => line.trim().length > 0);
    return sections.map((section, index) => ({
      id: index,
      title: section.split(":")[0] || `Section ${index + 1}`,
      content: section,
    }));
  };

  const detectTimeline = (text) => {
    const regex = /\b\d{4}\b/g;
    const matches = text.match(regex) || [];
    return matches.map((year, index) => ({
      id: index,
      year,
      event: `Event related to ${year}`,
    }));
  };

  const summarizeArticle = (text) => {
    const sentences = text.split(". ");
    return sentences.slice(0, 3).join(". ") + ".";
  };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    setSelectedEvent(null);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setSelectedNode(null);
  };

  const handleAddAnnotation = (sectionId, annotationText) => {
    setAnnotations((prev) => ({
      ...prev,
      [sectionId]: annotationText,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 text-gray-900 flex flex-col p-6">
      <header className="text-center mb-6">
        <h1 className="text-5xl font-extrabold mb-2 text-blue-600 animate-pulse">
          Article Insights Visualizer
        </h1>
        <p className="text-gray-700">
          Transform articles into structured, interactive visualizations.
        </p>
      </header>

      {/* Article Input Section */}
      <Card className="mb-6 max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-500">Upload or Paste Article</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="8"
            placeholder="Paste your article here..."
            value={article}
            onChange={(e) => setArticle(e.target.value)}
          />
        </CardContent>
        <div className="text-center p-4">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
            onClick={processArticle}
          >
            Analyze Article
          </button>
        </div>
      </Card>

      {/* Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Keywords */}
        <Card className="shadow-md hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-blue-600">Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="text-sm px-3 py-1 bg-blue-200 rounded-full text-blue-900 hover:bg-blue-300 transition transform hover:scale-105 shadow-md"
                >
                  {keyword}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hierarchical Map */}
        <Card className="shadow-md hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-blue-600">Hierarchical Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {hierarchicalMap.map((node) => (
                <div
                  key={node.id}
                  className={`p-2 border rounded-md cursor-pointer transition-transform transform hover:scale-105 ${
                    selectedNode?.id === node.id
                      ? "bg-blue-200 border-blue-500 animate-bounce"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleNodeClick(node)}
                >
                  {node.title}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="shadow-md hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-blue-600">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {timeline.map((event) => (
                <div
                  key={event.id}
                  className={`relative p-2 rounded-md shadow-md transition transform hover:scale-105 mb-2 cursor-pointer ${
                    selectedEvent?.id === event.id
                      ? "bg-blue-300 animate-pulse"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => handleEventClick(event)}
                >
                  <strong className="text-blue-500">{event.year}:</strong>{" "}
                  {event.event}
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-400"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="shadow-md hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-blue-600">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg animate-fade-in">{summary}</p>
          </CardContent>
        </Card>
      </div>

      {/* Selected Node or Event */}
      {(selectedNode || selectedEvent) && (
        <Card className="mt-6 max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-500">
              {selectedNode
                ? "Selected Node Details"
                : "Selected Event Details"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedNode && (
              <>
                <h3 className="font-semibold text-lg">{selectedNode.title}</h3>
                <p>{selectedNode.content}</p>
                <textarea
                  className="w-full mt-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows="3"
                  placeholder="Add your annotation here..."
                  onBlur={(e) =>
                    handleAddAnnotation(selectedNode.id, e.target.value)
                  }
                />
                {annotations[selectedNode.id] && (
                  <div className="mt-2 text-sm text-blue-500">
                    Annotation: {annotations[selectedNode.id]}
                  </div>
                )}
              </>
            )}
            {selectedEvent && (
              <>
                <h3 className="font-semibold text-lg">{selectedEvent.year}</h3>
                <p>{selectedEvent.event}</p>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
