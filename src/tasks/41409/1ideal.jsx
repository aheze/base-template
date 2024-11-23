import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function App() {
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResults, setAnalysisResults] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(false);

  const analyzeJobDescription = () => {
    if (!jobDescription.trim()) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }

    setError(false);

    // Simulated analysis
    const skills = extractSkills(jobDescription);
    const experienceLevel = detectExperienceLevel(jobDescription);
    const responsibilities = extractResponsibilities(jobDescription);
    const companyCulture = analyzeCompanyCulture(jobDescription);
    const fitScore = calculateFitScore(jobDescription);

    setAnalysisResults({
      skills,
      experienceLevel,
      responsibilities,
      companyCulture,
      fitScore,
    });
  };

  const extractSkills = (text) => {
    const keywords = [
      "JavaScript",
      "React",
      "Node.js",
      "Leadership",
      "Teamwork",
      "CSS",
    ];
    const frequency = keywords.reduce((acc, skill) => {
      const count = (text.match(new RegExp(skill, "gi")) || []).length;
      if (count) acc.push({ skill, count });
      return acc;
    }, []);
    return frequency;
  };

  const detectExperienceLevel = (text) => {
    if (text.includes("entry-level")) return "Entry Level";
    if (text.includes("5+ years") || text.includes("senior")) return "Senior Level";
    if (text.includes("mid-level") || text.includes("3+ years"))
      return "Mid Level";
    return "Not Specified";
  };

  const extractResponsibilities = (text) => {
    const sentences = text.match(/[^.!?]+[.!?]/g) || [];
    return sentences.slice(0, 3); 
  };

  const analyzeCompanyCulture = (text) => {
    if (text.includes("collaborative") || text.includes("fun")) {
      return { emoji: "🎉", description: "Fun and Collaborative" };
    }
    if (text.includes("technical") || text.includes("innovative")) {
      return { emoji: "💻", description: "Technical and Innovative" };
    }
    return { emoji: "🏢", description: "Formal and Results-Driven" };
  };

  const calculateFitScore = () => Math.floor(Math.random() * 41) + 60;

  const exportResults = () => {
    const content = `Skills:\n${analysisResults.skills
      .map((s) => `${s.skill}: ${s.count} times`)
      .join("\n")}\n
Experience Level: ${analysisResults.experienceLevel}\n
Responsibilities:\n${analysisResults.responsibilities.join("\n")}\n
Company Culture: ${analysisResults.companyCulture.description}\n
Fit Score: ${analysisResults.fitScore}%`;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "job_analysis.txt";
    link.click();
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold">Job Description Analyzer</h1>
        <p className="text-gray-600">
          Gain insights from job descriptions and tailor your resume.
        </p>
      </header>

      <main className="space-y-6">
        <div className="space-y-4">
          <textarea
            className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            rows="6"
            placeholder="Paste your job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <p className="text-gray-500">
              Characters: {jobDescription.length} | Words:{" "}
              {jobDescription.split(/\s+/).filter(Boolean).length}
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition-transform transform hover:scale-105"
              onClick={analyzeJobDescription}
            >
              Analyze Job Description
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-center">
            Please provide a job description to analyze.
          </div>
        )}

        {analysisResults && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
            {/* Skills Word Cloud */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Word Cloud</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysisResults.skills.map(({ skill, count }) => (
                    <span
                      key={skill}
                      className="cursor-pointer transition-all hover:scale-110"
                      style={{
                        fontSize: `${12 + count * 5}px`,
                        color: `hsl(${count * 30}, 70%, 50%)`,
                        fontWeight: count > 2 ? "bold" : "normal",
                      }}
                      title={`Frequency: ${count}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience Level */}
            <Card>
              <CardHeader>
                <CardTitle>Experience Level</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{analysisResults.experienceLevel}</p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Key Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                {analysisResults.responsibilities.map((resp, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-2 border rounded-md"
                  >
                    <p>{resp}</p>
                    <button
                      className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
                      onClick={() => navigator.clipboard.writeText(resp)}
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Company Culture */}
            <Card>
              <CardHeader>
                <CardTitle>Company Culture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl">
                  {analysisResults.companyCulture.emoji}{" "}
                  {analysisResults.companyCulture.description}
                </p>
              </CardContent>
            </Card>

            {/* Fit Score */}
            <Card>
              <CardHeader>
                <CardTitle>Fit Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className={`text-4xl font-bold ${
                    analysisResults.fitScore > 80
                      ? "text-green-500"
                      : analysisResults.fitScore > 60
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {analysisResults.fitScore}%
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {analysisResults && (
          <div className="text-center">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition"
              onClick={exportResults}
            >
              Export Results
            </button>
          </div>
        )}
      </main>

      <footer className="text-center mt-8">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md shadow hover:bg-gray-700 transition"
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </footer>
    </div>
  );
}
