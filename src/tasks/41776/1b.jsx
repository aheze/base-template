import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun, Download, Bold, Italic, List, Link, Image, Code } from "lucide-react";

const defaultMarkdown = `# Welcome to Markdown Previewer

## This is a subheading

Here's some **bold** and *italic* text.

- List item 1
- List item 2

[Link to Google](https://www.google.com)

![React Logo](https://reactjs.org/logo-og.png)

\`\`\`
const code = "This is a code block";
console.log(code);
\`\`\`
`;

function MarkdownPreview({ markdown }) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    // Simple Markdown to HTML conversion (for demonstration purposes)
    const convertedHtml = markdown
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-2">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-2">$2</h2>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\n- (.*)/gim, '<ul class="list-disc pl-5 mb-2"><li>$1</li></ul>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-blue-500 hover:underline">$1</a>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" class="max-w-full h-auto">')
      .replace(/```([\s\S]*?)```/gim, '<pre class="bg-gray-100 p-2 rounded"><code>$1</code></pre>')
      .replace(/\n/gim, '<br>');
    setHtml(convertedHtml);
  }, [markdown]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function Toolbar({ onInsert }) {
  const buttons = [
    { icon: <Bold size={16} />, text: "**Bold**" },
    { icon: <Italic size={16} />, text: "*Italic*" },
    { icon: <List size={16} />, text: "- List item" },
    { icon: <Link size={16} />, text: "[Link](http://)" },
    { icon: <Image size={16} />, text: "![Alt](http://)" },
    { icon: <Code size={16} />, text: "`Code`" },
  ];

  return (
    <div className="flex space-x-2 mb-2">
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onInsert(button.text)}
        >
          {button.icon}
        </Button>
      ))}
    </div>
  );
}

export default function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [darkMode, setDarkMode] = useState(false);

  const handleInsert = (text) => {
    setMarkdown((prev) => prev + text);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = "markdown.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={`min-h-screen p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Markdown Previewer</h1>
          <div className="flex items-center space-x-2">
            <Toggle
              pressed={darkMode}
              onPressedChange={setDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Moon size={16} /> : <Sun size={16} />}
            </Toggle>
            <Button onClick={handleDownload} size="sm">
              <Download size={16} className="mr-2" /> Download
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Markdown Input</CardTitle>
            </CardHeader>
            <CardContent>
              <Toolbar onInsert={handleInsert} />
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-[60vh] resize-none"
                placeholder="Type your Markdown here..."
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">
                <MarkdownPreview markdown={markdown} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}