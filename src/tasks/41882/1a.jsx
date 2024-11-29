import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Moon } from "lucide-react";

const ThemeToggler = ({ theme, toggleTheme }) => {
  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 dark:text-gray-400" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
      />
      <Moon className="h-4 w-4 text-gray-400 dark:text-white" />
    </div>
  );
};

const ThemeCard = ({ theme }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Current Theme: {theme}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300">
          This card demonstrates the current theme. The background and text colors
          change based on the selected theme.
        </p>
      </CardContent>
    </Card>
  );
};

const SettingsPanel = ({ theme, setTheme }) => {
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader>
        <CardTitle>Theme Settings</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <Button
          variant={theme === "light" ? "default" : "outline"}
          onClick={() => handleThemeChange("light")}
        >
          Light
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "outline"}
          onClick={() => handleThemeChange("dark")}
        >
          Dark
        </Button>
        <Button
          variant={theme === "system" ? "default" : "outline"}
          onClick={() => handleThemeChange("system")}
        >
          System
        </Button>
      </CardContent>
    </Card>
  );
};

export default function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Theme Toggler App
          </h1>
          <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
        </header>
        <main className="flex flex-col items-center space-y-4">
          <ThemeCard theme={theme} />
          <SettingsPanel theme={theme} setTheme={setTheme} />
        </main>
      </div>
    </div>
  );
}