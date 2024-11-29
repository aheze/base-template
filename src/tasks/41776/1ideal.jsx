import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Textarea } from "@/components/ui/textarea";
import {
  Sun,
  Moon,
  Bold,
  Italic,
  Code,
  List,
  Link,
  Image,
  Download,
} from "lucide-react";

// Local Storage key for auto-saving drafts
const LOCAL_STORAGE_KEY = "markdown-previewer-draft";

// Default Markdown content
const defaultMarkdown = `# Welcome to Markdown Previewer

## Subheading Example

Here's some **bold** and *italic* text.

- List item 1
- List item 2

[Visit React](https://reactjs.org)

![React Logo](https://reactjs.org/logo-og.png)

\`\`\`javascript
const code = "This is a code block";
console.log(code);
\`\`\`
`;

export default function App() {
  // State for Markdown content
  const [markdown, setMarkdown] = useState(() => {
    // Load draft from local storage, if available
    const savedDraft = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedDraft ? savedDraft : defaultMarkdown;
  });

  // State for Dark Mode toggle
  const [darkMode, setDarkMode] = useState(false);

  // Save Markdown content to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, markdown);
  }, [markdown]);

  // Function to render Markdown using regex-based parsing
  const renderMarkdown = (text) => {
    return text
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>') // Render H1
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-3">$1</h2>') // Render H2
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mb-2">$1</h3>') // Render H3
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>') // Render bold
      .replace(/\*(.*?)\*/gim, '<em>$1</em>') // Render italic
      .replace(/^- (.*$)/gim, '<li class="list-disc pl-5">$1</li>') // Render list item
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-blue-500 hover:underline">$1</a>') // Render links
      .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" class="my-3 max-w-full h-auto" />') // Render images
      .replace(
        /```([\s\S]+?)```/gim,
        `<pre class="bg-gray-200 dark:bg-gray-800 p-4 rounded-md text-sm overflow-auto"><code>$1</code></pre>` // Render code blocks
      )
      .replace(/\n/g, "<br />"); // Handle newlines
  };

  // Function to download the Markdown content as a .md file
  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "markdown.md";
    link.click();
  };

  // Function to download the rendered Markdown content as an HTML file
  const downloadHTML = () => {
    const blob = new Blob([renderMarkdown(markdown)], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "markdown.html";
    link.click();
  };

  // Toolbar component for inserting Markdown snippets
  const Toolbar = ({ onInsert }) => {
    // Define toolbar buttons for common Markdown elements
    const buttons = [
      { label: "Bold", icon: <Bold size={16} />, insert: "**Bold**" },
      { label: "Italic", icon: <Italic size={16} />, insert: "*Italic*" },
      { label: "List", icon: <List size={16} />, insert: "- List item" },
      { label: "Link", icon: <Link size={16} />, insert: "[Link](https://)" },
      { label: "Image", icon: <Image size={16} />, insert: "![Alt Text](https://)" },
      { label: "Code Block", icon: <Code size={16} />, insert: "```\nCode\n```" },
    ];

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {buttons.map((btn, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onInsert(btn.insert)} // Insert Markdown snippet on button click
            className="flex items-center gap-1"
          >
            {btn.icon}
            <span className="sr-only">{btn.label}</span>
          </Button>
        ))}
      </div>
    );
  };

  // Calculate word count and visualize progress
  const wordCount = markdown.split(/\s+/).length;
  const maxWordCount = 200; // Maximum word count for progress visualization
  const wordCountPercentage = Math.min((wordCount / maxWordCount) * 100, 100);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 to-blue-100 text-black"
      } p-6`}
    >
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Markdown Previewer
          </h1>
          <div className="flex items-center gap-2">
            {/* Toggle for Dark Mode */}
            <Toggle pressed={darkMode} onPressedChange={setDarkMode}>
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            </Toggle>
            {/* Download Buttons */}
            <Button onClick={downloadMarkdown} size="sm" variant="secondary">
              <Download size={16} className="mr-1" /> Markdown
            </Button>
            <Button onClick={downloadHTML} size="sm" variant="secondary">
              <Download size={16} className="mr-1" /> HTML
            </Button>
          </div>
        </div>

        {/* Word Count Visualization */}
        <div className="mb-6">
          <p className="text-sm font-semibold mb-2">
            Word Count: {wordCount} / {maxWordCount}
          </p>
          <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all"
              style={{ width: `${wordCountPercentage}%` }} // Dynamic width for progress bar
            />
          </div>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Markdown Input Section */}
          <Card className="h-[60vh] shadow-lg transition-transform transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Markdown Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Toolbar onInsert={(text) => setMarkdown((prev) => prev + "\n" + text)} />
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)} // Update Markdown content on input
                className="w-full h-[50vh] resize-none bg-gray-100 dark:bg-gray-800 dark:text-gray-200 shadow-inner rounded-lg"
                placeholder="Type your Markdown here..."
              />
            </CardContent>
          </Card>

          {/* Markdown Preview Section */}
          <Card className="h-[60vh] shadow-lg transition-transform transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Markdown Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose dark:prose-invert overflow-y-auto max-h-[50vh]"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }} // Render Markdown as HTML
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
