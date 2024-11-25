// Import React and UI components
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function App() {
  const [name, setName] = useState(""); // User's name
  const [dob, setDob] = useState(""); // User's date of birth
  const [gender, setGender] = useState(""); // User's gender
  const [message, setMessage] = useState(""); // Birthday message
  const [daysUntilBirthday, setDaysUntilBirthday] = useState(null); // Days until next birthday
  const [showCountdown, setShowCountdown] = useState(false); // Countdown visibility
  const [theme, setTheme] = useState("pastel"); // UI theme

  // Calculate the number of days until the next birthday and set a message
  const calculateBirthday = () => {
    const today = new Date();
    const birthDate = new Date(dob);

    // Validate DOB
    if (birthDate > today || isNaN(birthDate)) {
      setMessage("Please enter a valid date of birth.");
      return;
    }

    // Adjust birthDate to the current year, or next year if already passed
    birthDate.setFullYear(today.getFullYear());
    if (birthDate < today) {
      birthDate.setFullYear(today.getFullYear() + 1);
    }

    const daysLeft = Math.ceil(
      (birthDate - today) / (1000 * 60 * 60 * 24) // Convert milliseconds to days
    );

    setDaysUntilBirthday(daysLeft);

    // Set a special message if it's the user's birthday
    if (daysLeft === 0) {
      const genderMessage =
        gender === "male"
          ? `Happy Birthday, ${name}! Here’s to a year full of adventures and success! 🎉`
          : gender === "female"
          ? `Happy Birthday, ${name}! May your day be as wonderful and radiant as you are! 🎂`
          : `Happy Birthday, ${name}! Have a fantastic and magical day ahead! 🎈`;

      setMessage(genderMessage);
    } else {
      setMessage(
        `Just ${daysLeft} days until your birthday, ${name}! Time to start the countdown! 🎊`
      );
    }
    setShowCountdown(true);
  };

  // Render a visual countdown with bouncing dots
  const renderCountdown = () => {
    if (daysUntilBirthday === null || daysUntilBirthday === 0) return null;

    return (
      <div className="text-center mt-6">
        <p className="text-2xl font-bold text-blue-600 animate-bounce">
          {daysUntilBirthday} days left!
        </p>
        <div className="flex justify-center mt-4">
          {Array.from({ length: daysUntilBirthday }).map((_, index) => (
            <div
              key={index}
              className="h-4 w-4 bg-blue-400 rounded-full mx-1 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  };

  // Handle theme selection
  const handleThemeChange = (newTheme) => setTheme(newTheme);

  // Render a section with fun birthday facts
  const renderBirthdayFacts = () => (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-gray-700">Did You Know?</h3>
      <p className="text-gray-600 mt-2">
        Famous people born on your birthday include Galileo Galilei, Susan B.
        Anthony, and Chris Farley!
      </p>
    </div>
  );

  return (
    <div
      className={`min-h-screen ${
        theme === "pastel"
          ? "bg-gradient-to-r from-pink-100 to-purple-100"
          : theme === "vibrant"
          ? "bg-gradient-to-r from-yellow-200 to-orange-400"
          : "bg-gray-800"
      } text-gray-900 p-6`}
    >
      {/* Header Section */}
      <header className="text-center mb-6">
        <h1 className="text-5xl font-extrabold text-blue-600 animate-pulse">
          Wish Me Birthday 🎉
        </h1>
        <p className="text-lg text-gray-700">
          Celebrate your special day with personalized wishes and fun!
        </p>
      </header>

      {/* Input Section */}
      <Card className="max-w-xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Enter Your Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border rounded-md focus:ring-blue-400 focus:border-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="date"
              className="w-full p-3 border rounded-md focus:ring-blue-400 focus:border-blue-400"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <select
              className="w-full p-3 border rounded-md focus:ring-blue-400 focus:border-blue-400"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Prefer Not to Say</option>
            </select>
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
              onClick={calculateBirthday}
            >
              Generate My Wish 🎂
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      {message && (
        <Card className="max-w-xl mx-auto mt-6 shadow-lg">
          <CardHeader>
            <CardTitle>🎁 Your Birthday Wish</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-800">{message}</p>
            {renderCountdown()}
            {renderBirthdayFacts()}
          </CardContent>
        </Card>
      )}

      {/* Theme Customization */}
      <div className="text-center mt-10">
        <h3 className="text-lg font-bold mb-4">Customize Your Experience</h3>
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-pink-300 text-white rounded-full shadow-md hover:bg-pink-400"
            onClick={() => handleThemeChange("pastel")}
          >
            Pastel
          </button>
          <button
            className="px-4 py-2 bg-yellow-400 text-white rounded-full shadow-md hover:bg-yellow-500"
            onClick={() => handleThemeChange("vibrant")}
          >
            Vibrant
          </button>
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-800"
            onClick={() => handleThemeChange("dark")}
          >
            Dark
          </button>
        </div>
      </div>
    </div>
  );
}
