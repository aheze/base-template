// Importing required libraries and UI components
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsDown, ThumbsUp, Bookmark, Shuffle } from "lucide-react";

// Categories and joke types
const categories = ["Animals", "Technology", "Puns", "Dad Jokes", "Random"];
const jokeTypes = ["Short", "Pun", "Anecdote"];

// Emoji map for categories
const emojiMap = {
  Animals: "🐶",
  Technology: "💻",
  Puns: "😂",
  "Dad Jokes": "👨‍🦳",
  Random: "🎲",
};

// Joke dataset
const jokesDataset = {
  Animals: ["Why don’t skeletons fight each other? They don’t have the guts. 🦴"],
  Technology: ["Why was the computer cold? It left its Windows open. 🖥️"],
  Puns: ["I’m reading a book about anti-gravity. It’s impossible to put down. 😄"],
  "Dad Jokes": ["What do you call fake spaghetti? An impasta! 🍝"],
  Random: ["Why did the scarecrow win an award? He was outstanding in his field. 🌾"],
};

// Function to fetch a random joke
const getRandomJoke = (category) => {
  const jokes = jokesDataset[category] || jokesDataset["Random"];
  return jokes[Math.floor(Math.random() * jokes.length)];
};

// JokeCard component
const JokeCard = ({ joke, emoji, onSave, onRate }) => (
  <Card className="w-full max-w-md mx-auto shadow-lg rounded-lg">
    <CardHeader>
      <CardTitle className="text-center text-2xl">{emoji} Joke</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-lg text-center">{joke}</p>
      <div className="flex justify-between mt-4">
        <div>
          <Button variant="outline" size="icon" onClick={() => onRate(true)}>
            <ThumbsUp className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => onRate(false)} className="ml-2">
            <ThumbsDown className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="icon" onClick={onSave}>
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

// CreateJoke component
const CreateJoke = ({ onSave }) => {
  const [joke, setJoke] = useState("");

  const handleSave = () => {
    if (!joke.trim()) return;
    onSave(joke);
    setJoke("");
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Create Your Own Joke</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Type your joke here..."
          value={joke}
          onChange={(e) => setJoke(e.target.value)}
          className="mb-4"
        />
        <Button className="w-full" onClick={handleSave}>
          Save Joke
        </Button>
      </CardContent>
    </Card>
  );
};

// Main App component
export default function App() {
  const [category, setCategory] = useState("Random");
  const [jokeType, setJokeType] = useState("Short");
  const [currentJoke, setCurrentJoke] = useState("");
  const [savedJokes, setSavedJokes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("generate");

  useEffect(() => {
    document.body.className = darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100";
  }, [darkMode]);

  const generateJoke = () => {
    setCurrentJoke(getRandomJoke(category));
  };

  const saveJoke = (joke) => {
    setSavedJokes([...savedJokes, joke]);
  };

  const rateJoke = (liked) => {
    console.log(`User ${liked ? "liked" : "disliked"} the joke`);
  };

  const shuffleJoke = () => {
    setCategory("Random");
    setJokeType(jokeTypes[Math.floor(Math.random() * jokeTypes.length)]);
    generateJoke();
  };

  return (
    <div className={`min-h-screen p-4 ${darkMode ? "dark" : ""}`}>
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center">Joke Generator 🤣</h1>
          <div className="flex items-center">
            <span className="mr-2">Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate Joke</TabsTrigger>
            <TabsTrigger value="create">Create Joke</TabsTrigger>
          </TabsList>
          <TabsContent value="generate">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-4">
                <Button onClick={generateJoke}>Generate Joke</Button>
                <Button variant="outline" onClick={shuffleJoke}>
                  <Shuffle className="h-4 w-4 mr-2" />
                  Shuffle
                </Button>
              </div>
              {currentJoke && (
                <JokeCard
                  joke={currentJoke}
                  emoji={emojiMap[category]}
                  onSave={() => saveJoke(currentJoke)}
                  onRate={rateJoke}
                />
              )}
            </div>
          </TabsContent>
          <TabsContent value="create">
            <CreateJoke onSave={saveJoke} />
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Saved Jokes</h2>
          {savedJokes.length > 0 ? (
            <div className="space-y-4">
              {savedJokes.map((joke, index) => (
                <Card key={index} className="shadow-md">
                  <CardContent className="pt-6">{joke}</CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p>No saved jokes yet. Start saving your favorites!</p>
          )}
        </div>
      </div>
    </div>
  );
}
