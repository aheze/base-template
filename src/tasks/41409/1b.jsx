import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

const WordCloud = ({ skills }) => (
  <div className="flex flex-wrap gap-2">
    {Object.entries(skills).map(([skill, count]) => (
      <Badge key={skill} variant="secondary" className="text-sm">
        {skill} ({count})
      </Badge>
    ))}
  </div>
);

const ResponsibilityCard = ({ responsibility }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(responsibility);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Responsibility</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{responsibility}</p>
        <Button
          onClick={copyToClipboard}
          variant="outline"
          size="sm"
          className="mt-2"
        >
          {copied ? "Copied!" : "Copy to Clipboard"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default function App() {
  const [jobDescription, setJobDescription] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [analysis, setAnalysis] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setWordCount(jobDescription.trim().split(/\s+/).length);
    setCharCount(jobDescription.length);
  }, [jobDescription]);

  const analyzeJobDescription = () => {
    if (!jobDescription.trim()) {
      setShowAlert(true);
      return;
    }

    // Mock analysis - in a real app, this would be more sophisticated
    const mockAnalysis = {
      skills: {
        "React": 3,
        "JavaScript": 2,
        "TypeScript": 1,
        "CSS": 2,
        "HTML": 1,
        "Node.js": 1,
      },
      experienceLevel: "Mid-Senior",
      responsibilities: [
        "Develop and maintain web applications",
        "Collaborate with cross-functional teams",
        "Optimize application performance",
      ],
      companyCulture: "🚀 Fast-paced and innovative",
      fitScore: 75,
    };

    setAnalysis(mockAnalysis);
  };

  return (
    <div className={`min-h-screen p-4 ${darkMode ? "dark bg-gray-900 text-white" : "bg-white"}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Job Description Analyzer</h1>
          <div className="flex items-center">
            <Label htmlFor="dark-mode" className="mr-2">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
        </div>

        <Textarea
          placeholder="Paste job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full h-40 mb-4"
        />

        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-sm">Words: {wordCount}</span>
            <span className="text-sm ml-4">Characters: {charCount}</span>
          </div>
          <Button onClick={analyzeJobDescription}>Analyze Job Description</Button>
        </div>

        {showAlert && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Job description is required. Please paste a job description and try again.
            </AlertDescription>
          </Alert>
        )}

        {analysis && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <WordCloud skills={analysis.skills} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Experience Level</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">{analysis.experienceLevel}</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                {analysis.responsibilities.map((resp, index) => (
                  <ResponsibilityCard key={index} responsibility={resp} />
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Culture</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{analysis.companyCulture}</p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Fit Score</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={analysis.fitScore} className="w-full" />
                <p className="mt-2">Your fit score: {analysis.fitScore}%</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}