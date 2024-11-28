import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

function Counter() {
  const [count, setCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
  const reset = () => setCount(0);

  return (
    <div className="flex justify-center items-center h-screen bg-background dark:bg-slate-900 transition-colors duration-300">
      <Card className="w-full max-w-sm p-6 shadow-lg dark:shadow-slate-700">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center mb-4">
            Counter App
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-6xl font-extrabold text-center mb-6 text-primary dark:text-primary-400">
            {count}
          </div>
          <div className="flex justify-center space-x-4 mb-4">
            <Button onClick={increment} variant="outline" className="hover:scale-105 transition-transform">
              +
            </Button>
            <Button onClick={decrement} variant="outline" className="hover:scale-105 transition-transform">
              –
            </Button>
          </div>
          <Button onClick={reset} className="w-full hover:bg-destructive-600 transition-colors">
            Reset
          </Button>
        </CardContent>
        <div className="mt-4 flex justify-end">
          <Switch 
            checked={isDarkMode} 
            onCheckedChange={setIsDarkMode}
            className="scale-150"
          />
          <span className="ml-2 text-sm">Dark Mode</span>
        </div>
      </Card>
    </div>
  );
}

export default function App() {
  return <Counter />;
}