// Importing necessary components and hooks from React and UI library
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

// Reusable button component for increment and decrement actions
const CounterButton = ({ onClick, children }) => (
  <Button
    onClick={onClick}
    className="w-16 h-16 text-2xl font-bold transition-transform hover:scale-105 active:scale-95"
  >
    {children}
  </Button>
);

export default function App() {
  // State for counter value
  const [count, setCount] = useState(0);
  // State for dark mode toggle
  const [darkMode, setDarkMode] = useState(false);

  // Effect to apply dark mode class to the body when toggled
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  // Function to increment the counter
  const increment = () => setCount((prev) => prev + 1);
  // Function to decrement the counter, ensuring it doesn't go below 0
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));
  // Function to reset the counter to 0
  const reset = () => setCount(0);

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Main Card for the Counter App */}
        <Card className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
          {/* Header Section */}
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
              Counter App
            </CardTitle>
            {/* Dark Mode Toggle */}
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

          {/* Content Section */}
          <CardContent className="flex flex-col items-center space-y-6">
            {/* Display the counter value */}
            <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
              {count}
            </div>
            {/* Buttons for increment and decrement */}
            <div className="flex space-x-4">
              <CounterButton onClick={decrement}>-</CounterButton>
              <CounterButton onClick={increment}>+</CounterButton>
            </div>
            {/* Reset button */}
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
