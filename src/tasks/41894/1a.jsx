import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transition } from '@headlessui/react';

const emojis = [
  '😊', '😂', '🥳', '😎', '❤️', '💡', '🍕', '🌟', '🚀', '🐶', '🦄', '🎉', '🏆', '📚', '🎵', '🔥', '🌈', '🛠️', '🌍', '🕊️', '✨', '🛩️', '🧠', '🐾', '🖌️', '🎮', '🍩', '🌼'
];

function EmojiDisplay({ emoji }) {
  return (
    <Transition
      appear={true}
      show={emoji !== ''}
      enter="transition-opacity duration-700"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="text-9xl sm:text-6xl">{emoji}</div>
    </Transition>
  );
}

function EmojiPicker() {
  const [emoji, setEmoji] = useState('');
  const [multiEmojis, setMultiEmojis] = useState([]);

  const pickEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    setEmoji(emojis[randomIndex]);
    setMultiEmojis(prev => [...prev, emojis[randomIndex]].slice(-5)); // Keep only the last 5
  };

  const resetEmojis = () => {
    setEmoji('');
    setMultiEmojis([]);
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-4">
      <CardHeader>
        <CardTitle className="text-center">Random Emoji Picker</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <EmojiDisplay emoji={emoji} />
        <div className="flex flex-wrap justify-center gap-2">
          {multiEmojis.map((e, idx) => (
            <div key={idx} className="text-4xl">{e}</div>
          ))}
        </div>
        <Button onClick={pickEmoji} variant="outline">Pick Random Emoji</Button>
        {emoji && (
          <Button onClick={resetEmojis} className="mt-2" variant="secondary">Reset</Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <EmojiPicker />
    </div>
  );
}