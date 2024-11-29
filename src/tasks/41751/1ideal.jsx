import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Helper function to generate random passwords
const generatePassword = (length, options) => {
  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    special: "!@#$%^&*()_+-=[]{}|;:',.<>?/",
  };

  let availableChars = "";
  if (options.uppercase) availableChars += charSets.uppercase;
  if (options.lowercase) availableChars += charSets.lowercase;
  if (options.numbers) availableChars += charSets.numbers;
  if (options.special) availableChars += charSets.special;

  if (!availableChars) return ""; // Return empty if no options selected

  let password = "";
  for (let i = 0; i < length; i++) {
    password += availableChars[Math.floor(Math.random() * availableChars.length)];
  }
  return password;
};

// Helper function to calculate password strength
const calculateStrength = (length, options) => {
  const activeOptions = Object.values(options).filter(Boolean).length;
  if (length < 8 || activeOptions < 2) return "Weak";
  if (length >= 12 && activeOptions >= 3) return "Strong";
  return "Medium";
};

// Subcomponent for Password Options
const PasswordOptions = ({ length, setLength, options, setOptions, error }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
      Password Options
    </h2>
    <div className="mb-6">
      <label className="block mb-2 text-gray-600 dark:text-gray-400 font-medium">
        Password Length (8-64):
      </label>
      <input
        type="number"
        min="8"
        max="64"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
      />
    </div>
    <div className="mb-6">
      <label className="block mb-2 text-gray-600 dark:text-gray-400 font-medium">
        Character Types:
      </label>
      {["uppercase", "lowercase", "numbers", "special"].map((type) => (
        <div key={type} className="flex items-center mb-3">
          <input
            type="checkbox"
            checked={options[type]}
            onChange={() =>
              setOptions((prev) => ({ ...prev, [type]: !prev[type] }))
            }
            className="mr-3"
          />
          <label className="text-gray-600 dark:text-gray-400 font-medium">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        </div>
      ))}
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

// Subcomponent for Password Display and Strength Meter
const PasswordDisplay = ({ password, onCopy, strength }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
      Generated Password
    </h2>
    <Card className="bg-gradient-to-r from-blue-200 to-purple-300 dark:from-gray-800 dark:to-gray-700">
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="truncate font-mono text-lg text-gray-800 dark:text-gray-200">
            {password || "Your password will appear here"}
          </span>
          {password && (
            <button
              onClick={onCopy}
              className="ml-4 px-4 py-2 text-sm text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Copy
            </button>
          )}
        </div>
      </CardContent>
    </Card>
    {/* Password Strength Meter */}
    {password && (
      <div className="mt-4">
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          Strength: <strong>{strength}</strong>
        </p>
        <div className="relative h-3 w-full bg-gray-300 dark:bg-gray-600 rounded-full">
          <div
            className={`absolute top-0 left-0 h-3 rounded-full ${
              strength === "Weak"
                ? "bg-red-500 w-1/4"
                : strength === "Medium"
                ? "bg-yellow-500 w-1/2"
                : "bg-green-500 w-full"
            }`}
          ></div>
        </div>
      </div>
    )}
  </div>
);

// Main App Component
const App = () => {
  const [length, setLength] = useState(12); // Default password length
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: false,
  });
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Handle password generation
  const handleGenerate = () => {
    if (length < 8 || length > 64) {
      setError("Password length must be between 8 and 64 characters.");
      return;
    }
    if (!Object.values(options).includes(true)) {
      setError("Please select at least one character type.");
      return;
    }
    setError("");
    const newPassword = generatePassword(length, options);
    setPassword(newPassword);
    setStrength(calculateStrength(length, options));
  };

  // Handle password copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark" : ""
      } bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6 sm:p-12`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400">
          Secure Password Generator
        </h1>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow-md hover:opacity-90 transition"
        >
        {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
      <Card className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-gray-700 dark:text-gray-200">
            Generate a Secure Password
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Customize your password preferences below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Password Options */}
          <PasswordOptions
            length={length}
            setLength={setLength}
            options={options}
            setOptions={setOptions}
            error={error}
          />
          {/* Password Display */}
          <PasswordDisplay
            password={password}
            onCopy={handleCopy}
            strength={strength}
          />
        </CardContent>
        <CardFooter className="flex justify-center">
          <button
            onClick={handleGenerate}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg rounded-lg shadow-md hover:opacity-90 transition"
          >
            Generate Password
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;
