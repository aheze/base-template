import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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

export default function App() {
  const [inputText, setInputText] = useState("");
  const [reversedText, setReversedText] = useState("");
  const [isRealTimeReverse, setIsRealTimeReverse] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const reverseText = () => {
    if (inputText.trim() !== "") {
      setReversedText(inputText.split("").reverse().join(""));
    }
  };

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
          <TextInput value={inputText} onChange={handleInputChange} />
          <ReversedOutput text={reversedText} />
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
          <ReverseButton onClick={reverseText} disabled={inputText.trim() === ""} />
        </CardContent>
      </Card>
    </div>
  );
}