// Importing necessary components and hooks
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

// Array of emojis to be used in the app
const emojis = [
  "😊", "😂", "🥳", "😎", "❤️", "💡", "🍕", "🌟", "🚀", "🐶",
  "🦄", "🎉", "🏆", "📚", "🎵", "🔥", "🌈", "🛠️", "🌍", "🕊️",
  "✨", "🛩️", "🧠", "🐾", "🖌️", "🎮", "🍩", "🌼", "🎨", "🌺"
];

// Component to display a single selected emoji with bounce animation
const EmojiDisplay = ({ emoji }) => (
  <div className="text-8xl sm:text-9xl md:text-10xl lg:text-11xl animate-bounce">
    {emoji}
  </div>
);

// Component to display a grid of emojis with pulse animation
const EmojiGrid = ({ emojis }) => (
  <div className="grid grid-cols-3 gap-4 p-4">
    {emojis.map((emoji, index) => (
      <div key={index} className="text-4xl sm:text-5xl md:text-6xl animate-pulse">
        {emoji}
      </div>
    ))}
  </div>
);

// Main Application Component
export default function App() {
  // State for selected single emoji, multiple emojis, and emoji count for the grid
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [multipleEmojis, setMultipleEmojis] = useState([]);
  const [emojiCount, setEmojiCount] = useState(1);

  // Function to pick a random emoji
  const pickRandomEmoji = useCallback(() => {
    if (emojis.length === 0) {
      console.error("Emoji array is empty");
      return;
    }
    const randomIndex = Math.floor(Math.random() * emojis.length);
    setSelectedEmoji(emojis[randomIndex]);
  }, []);

  // Function to pick multiple random emojis based on the emoji count
  const pickMultipleEmojis = useCallback(() => {
    if (emojis.length === 0) {
      console.error("Emoji array is empty");
      return;
    }
    const selectedEmojis = [];
    for (let i = 0; i < emojiCount; i++) {
      const randomIndex = Math.floor(Math.random() * emojis.length);
      selectedEmojis.push(emojis[randomIndex]);
    }
    setMultipleEmojis(selectedEmojis);
  }, [emojiCount]);

  // Function to reset the selected emoji and multiple emojis
  const resetEmoji = useCallback(() => {
    setSelectedEmoji("");
    setMultipleEmojis([]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Random Emoji Picker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Display a single selected emoji */}
          {selectedEmoji && <EmojiDisplay emoji={selectedEmoji} />}
          {/* Display multiple emojis in a grid */}
          {multipleEmojis.length > 0 && <EmojiGrid emojis={multipleEmojis} />}
          {/* Slider to select the number of emojis to pick */}
          <div className="space-y-2">
            <label htmlFor="emoji-count" className="text-sm font-medium">
              Number of Emojis: {emojiCount}
            </label>
            <Slider
              id="emoji-count"
              min={1}
              max={9}
              step={1}
              value={[emojiCount]}
              onValueChange={(value) => setEmojiCount(value[0])}
              className="w-full"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="flex space-x-2 w-full">
            {/* Button to pick a random emoji */}
            <Button
              onClick={pickRandomEmoji}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              Pick Random Emoji
            </Button>
            {/* Button to pick multiple emojis */}
            <Button
              onClick={pickMultipleEmojis}
              className="flex-1 bg-green-500 hover:bg-green-600"
            >
              Pick Multiple Emojis
            </Button>
          </div>
          {/* Button to reset emoji selection */}
          <Button
            onClick={resetEmoji}
            className="w-full bg-red-500 hover:bg-red-600"
          >
            Reset
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
