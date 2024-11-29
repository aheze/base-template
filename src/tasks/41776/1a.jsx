import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  const downloadMarkdown = () => {
    const element = document.createElement('a');
    const file = new Blob([markdown], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = "markdown.md";
    document.body.appendChild(element); 
    element.click();
  };

  const downloadHTML = () => {
    const htmlContent = document.getElementById('preview').innerHTML;
    const element = document.createElement('a');
    const file = new Blob([htmlContent], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = "preview.html";
    document.body.appendChild(element); 
    element.click();
  };

  return (
    <div className={`flex flex-col sm:flex-row h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <Card className="w-full sm:w-1/2 m-4 overflow-y-auto">
        <CardHeader>
          <CardTitle>Markdown Input</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            value={markdown} 
            onChange={handleMarkdownChange} 
            className="h-full min-h-[300px] resize-none"
            placeholder="Type your markdown here..."
          />
        </CardContent>
        <CardContent className="flex justify-between items-center">
          <Button onClick={downloadMarkdown}>Download Markdown</Button>
          <Switch 
            checked={isDarkMode} 
            onCheckedChange={setIsDarkMode}
            className="ml-auto"
          >
            Dark Mode
          </Switch>
        </CardContent>
      </Card>

      <Card className="w-full sm:w-1/2 m-4 overflow-y-auto">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent id="preview" className="prose max-w-none">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </CardContent>
        <CardContent>
          <Button onClick={downloadHTML}>Download HTML</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default function App() {
  return <MarkdownPreviewer />;
}