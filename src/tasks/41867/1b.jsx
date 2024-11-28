import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const CounterButton = ({ onClick, children }) => (
  <Button
    onClick={onClick}
    className="w-16 h-16 text-2xl font-bold transition-transform hover:scale-105 active:scale-95"
  >
    {children}
  </Button>
);

export default function App() {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));
  const reset = () => setCount(0);

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
              Counter App
            </CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {darkMode ? "Dark" : "Light"}
              </span>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
              {count}
            </div>
            <div className="flex space-x-4">
              <CounterButton onClick={decrement}>-</CounterButton>
              <CounterButton onClick={increment}>+</CounterButton>
            </div>
            <Button
              onClick={reset}
              variant="outline"
              className="w-32 transition-colors hover:bg-red-100 dark:hover:bg-red-900"
            >
              Reset
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}