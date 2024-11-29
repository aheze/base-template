import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

function ThemeToggler() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage for theme preference or use system setting
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background dark:bg-background-dark transition-colors duration-300">
      <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-slate-800">
        <Switch
          checked={isDarkMode}
          onCheckedChange={toggleTheme}
          className="mb-4"
        />
        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </label>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Switch between themes to see the magic happen!
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen font-sans text-sm sm:text-base bg-white dark:bg-slate-900 transition-colors duration-300">
      <ThemeToggler />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Theme Toggler App</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This app demonstrates dynamic theme switching with React, TailwindCSS, and Shadcn UI. Enjoy the seamless transition between light and dark themes!
          </p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Refresh Page
          </Button>
        </div>
      </div>
    </div>
  );
}