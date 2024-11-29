import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip } from "@/components/ui/tooltip";

function JobAnalyzer() {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const analyzeJob = () => {
    if (!jobDescription.trim()) {
      alert('Job description is required!');
      return;
    }
    // Placeholder for analysis logic
    const skills = jobDescription.match(/\b(\w+(?: \w+)*)\b/g) || [];
    const uniqueSkills = [...new Set(skills)].slice(0, 10);
    setAnalysis({
      skills: uniqueSkills,
      experience: jobDescription.match(/(entry-level|\d+\+? years?)/i) || ['Not specified'],
      responsibilities: jobDescription.match(/(?:- |\d+\. )(.*?)(?=\n- |\n\d+\. |\n\n|$)/g) || ['No responsibilities listed'],
      culture: jobDescription.includes('fun') ? 'Casual' : 'Formal',
      fitScore: Math.floor(Math.random() * 101) // Random for demo
    });
  };

  const WordCloud = ({ words }) => (
    <div className="flex flex-wrap justify-center gap-2">
      {words.map((word, idx) => (
        <span key={idx} className="text-xl" style={{ fontSize: `${1.5 + Math.random()}em` }}>{word}</span>
      ))}
    </div>
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen bg-gray-100 dark:bg-gray-900 p-4`}>
      <button 
        className="mb-4 float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Job Description Analyzer</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="jobDescription">Paste Job Description:</Label>
          <Input 
            id="jobDescription" 
            as="textarea" 
            value={jobDescription} 
            onChange={(e) => setJobDescription(e.target.value)} 
            placeholder="Paste your job description here..."
            className="h-40 mb-2"
          />
          <p>Characters: {jobDescription.length}</p>
          <Button onClick={analyzeJob}>Analyze Job Description</Button>
        </CardContent>
      </Card>

      {analysis && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <WordCloud words={analysis.skills} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Experience Level</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{analysis.experience[0]}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Key Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              {analysis.responsibilities.map((resp, idx) => (
                <div key={idx} className="mb-2">
                  <p>{resp}</p>
                  <Tooltip content="Copy to clipboard">
                    <Button variant="outline" onClick={() => copyToClipboard(resp)}>Copy</Button>
                  </Tooltip>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Company Culture</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{analysis.culture === 'Casual' ? '🎉 Casual' : '💼 Formal'}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Fit Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{analysis.fitScore}%</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return <JobAnalyzer />;
}