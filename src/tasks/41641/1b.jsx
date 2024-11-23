import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const categories = ['Animals', 'Technology', 'Puns', 'Dad Jokes', 'Random'];
const jokeTypes = ['Short', 'Puns', 'Anecdotes'];

const fetchJoke = async (category, type) => {
  // Placeholder for API call
  return {
    content: `This is a ${type.toLowerCase()} joke about ${category.toLowerCase()}.`,
    category,
    type,
    rating: 0,
  };
};

function JokeCard({ joke, onRate, onSave }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{joke.category}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{joke.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => onRate(joke, 1)} variant="outline">👍</Button>
        <Button onClick={() => onRate(joke, -1)} variant="outline">👎</Button>
        <Button onClick={() => onSave(joke)}>Save</Button>
      </CardFooter>
    </Card>
  );
}

function App() {
  const [jokes, setJokes] = useState([]);
  const [savedJokes, setSavedJokes] = useState([]);
  const [currentJoke, setCurrentJoke] = useState(null);
  const [category, setCategory] = useState('Random');
  const [jokeType, setJokeType] = useState('Short');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userJoke, setUserJoke] = useState('');

  useEffect(() => {
    // Load saved jokes from localStorage
    const storedJokes = JSON.parse(localStorage.getItem('savedJokes') || '[]');
    setSavedJokes(storedJokes);
  }, []);

  const generateJoke = async () => {
    const joke = await fetchJoke(category, jokeType);
    setCurrentJoke(joke);
    setJokes(prev => [...prev, joke]);
  };

  const rateJoke = (joke, rating) => {
    const updatedJokes = jokes.map(j => 
      j === joke ? { ...j, rating: j.rating + rating } : j
    );
    setJokes(updatedJokes);
  };

  const saveJoke = (joke) => {
    const newSavedJokes = [...savedJokes, { ...joke, saved: true }];
    setSavedJokes(newSavedJokes);
    localStorage.setItem('savedJokes', JSON.stringify(newSavedJokes));
  };

  const createJoke = () => {
    const newJoke = {
      content: userJoke,
      category: 'User Created',
      type: 'Custom',
      rating: 0,
    };
    setJokes(prev => [...prev, newJoke]);
    setUserJoke('');
  };

  return (
    <div className={cn("min-h-screen p-4", isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900")}>
      <div className="max-w-2xl mx-auto">
        <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} className="mb-4 float-right">Dark Mode</Switch>
        <h1 className="text-3xl font-bold mb-6">Joke Generator</h1>
        
        <div className="mb-4">
          <label className="block mb-2">Category:</label>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className="p-2 w-full border rounded">
            {categories.map(cat => <option key={cat}>{cat}</option>)}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Joke Type:</label>
          <select onChange={(e) => setJokeType(e.target.value)} value={jokeType} className="p-2 w-full border rounded">
            {jokeTypes.map(type => <option key={type}>{type}</option>)}
          </select>
        </div>

        <Button onClick={generateJoke} className="mb-4 w-full">Generate Joke</Button>
        <Button onClick={() => generateJoke()} variant="secondary" className="mb-4 w-full">Random Shuffle</Button>

        <div className="mb-4">
          <Input 
            type="text" 
            placeholder="Type your joke here..." 
            value={userJoke} 
            onChange={(e) => setUserJoke(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && createJoke()}
          />
          <Button onClick={createJoke} className="mt-2 w-full">Create Your Own Joke</Button>
        </div>

        {currentJoke && <JokeCard joke={currentJoke} onRate={rateJoke} onSave={saveJoke} />}

        <h2 className="text-2xl font-semibold mt-8 mb-4">Saved Jokes</h2>
        {savedJokes.map((joke, index) => (
          <JokeCard key={index} joke={joke} onRate={rateJoke} onSave={() => {}} />
        ))}
      </div>
    </div>
  );
}

export default App;