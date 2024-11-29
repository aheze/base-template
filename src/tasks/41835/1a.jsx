import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function TextReverser() {
  const [text, setText] = useState('');
  const [reversedText, setReversedText] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(text.trim().length > 0);
  }, [text]);

  const reverseText = () => {
    if (isValid) {
      setReversedText(text.split('').reverse().join(''));
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (e.target.value.trim()) {
      setReversedText(e.target.value.split('').reverse().join(''));
    } else {
      setReversedText('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8 w-full min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Text Reverser</CardTitle>
        </CardHeader>
        <CardContent>
          <Input 
            placeholder="Type or paste your text here..." 
            value={text}
            onChange={handleTextChange}
            className="mb-4"
          />
          <Button 
            onClick={reverseText} 
            disabled={!isValid}
            className="mb-4 w-full"
          >
            Reverse Text
          </Button>
          {reversedText && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg transition-all duration-300 ease-in-out animate-fade">
              <p className="text-lg font-semibold">Reversed Text:</p>
              <p className="break-words">{reversedText}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function App() {
  return (
    <div className="font-sans">
      <TextReverser />
    </div>
  );
}