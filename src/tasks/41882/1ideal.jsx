// Importing necessary modules and components
import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Moon } from "lucide-react";

// Component to toggle between themes
const ThemeToggler = ({ theme, toggleTheme }) => {
  return (
    <div className="flex items-center space-x-2">
      {/* Sun icon for light theme */}
      <Sun className="h-4 w-4 dark:text-gray-400 text-yellow-500 transition-all" />
      {/* Switch to toggle theme */}
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
        className="scale-125"
      />
      {/* Moon icon for dark theme */}
      <Moon className="h-4 w-4 text-gray-400 dark:text-white transition-all" />
    </div>
  );
};

// Component to display the current theme
const ThemeCard = ({ theme }) => {
  return (
    <Card className="w-full max-w-md shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          Current Theme:{" "}
          <span
            className={`${
              theme === "dark" ? "text-purple-400" : "text-blue-600"
            }`}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300">
          This card dynamically reflects the selected theme. Observe how the
          text and background adjust based on your choice.
        </p>
      </CardContent>
    </Card>
  );
};

// Component to manage theme settings
const SettingsPanel = ({ theme, setTheme }) => {
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme); // Update theme state
    localStorage.setItem("theme", newTheme); // Persist theme in localStorage
  };

  return (
    <Card className="w-full max-w-md mt-4 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Theme Settings</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-3">
        {/* Buttons for Light, Dark, and System themes */}
        <Button
          variant={theme === "light" ? "default" : "outline"}
          onClick={() => handleThemeChange("light")}
          className="hover:scale-105 transition-transform"
        >
          Light
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "outline"}
          onClick={() => handleThemeChange("dark")}
          className="hover:scale-105 transition-transform"
        >
          Dark
        </Button>
        <Button
          variant={theme === "system" ? "default" : "outline"}
          onClick={() => handleThemeChange("system")}
          className="hover:scale-105 transition-transform"
        >
          System
        </Button>
      </CardContent>
    </Card>
  );
};

// Main App component
export default function App() {
  const [theme, setTheme] = useState("light"); // State to track the current theme

  // Retrieve theme from localStorage or system preference on load
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  // Apply theme classes to the document element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          {/* App title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Theme Toggler App
          </h1>
          {/* Theme toggler switch */}
          <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
        </header>
        <main className="flex flex-col items-center space-y-6">
          {/* Display current theme */}
          <ThemeCard theme={theme} />
          {/* Theme settings panel */}
          <SettingsPanel theme={theme} setTheme={setTheme} />
        </main>
      </div>
    </div>
  );
}
