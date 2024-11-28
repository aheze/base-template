// Importing necessary components and hooks
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Component for text input field
const TextInput = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <Label htmlFor="text-input" className="block mb-2 text-sm font-medium">
        Enter your text:
      </Label>
      <Input
        id="text-input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Type or paste your text here"
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

// Component to display reversed text
const ReversedOutput = ({ text }) => {
  return (
    <div className="mb-4">
      <Label htmlFor="reversed-output" className="block mb-2 text-sm font-medium">
        Reversed text:
      </Label>
      <div
        id="reversed-output"
        className="w-full p-2 bg-gray-100 border rounded-md min-h-[40px] transition-all duration-300 ease-in-out"
      >
        {text}
      </div>
    </div>
  );
};

// Button component to trigger text reversal
const ReverseButton = ({ onClick, disabled }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
    >
      Reverse Text
    </Button>
  );
};

// Main Application Component
export default function App() {
  // State to track input text, reversed text, and real-time reversal mode
  const [inputText, setInputText] = useState("");
  const [reversedText, setReversedText] = useState("");
  const [isRealTimeReverse, setIsRealTimeReverse] = useState(false);

  // Handle input text changes
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Function to reverse the text
  const reverseText = () => {
    if (inputText.trim() !== "") {
      setReversedText(inputText.split("").reverse().join(""));
    }
  };

  // Automatically reverse the text in real-time if the mode is enabled
  useEffect(() => {
    if (isRealTimeReverse) {
      reverseText();
    }
  }, [inputText, isRealTimeReverse]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Text Reverser</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Input field for entering text */}
          <TextInput value={inputText} onChange={handleInputChange} />
          {/* Output field for reversed text */}
          <ReversedOutput text={reversedText} />
          {/* Checkbox to enable real-time text reversal */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="realtime-reverse"
              checked={isRealTimeReverse}
              onChange={() => setIsRealTimeReverse(!isRealTimeReverse)}
              className="mr-2"
            />
            <Label htmlFor="realtime-reverse" className="text-sm">
              Real-time reversal
            </Label>
          </div>
          {/* Button to manually reverse the text */}
          <ReverseButton onClick={reverseText} disabled={inputText.trim() === ""} />
        </CardContent>
      </Card>
    </div>
  );
}