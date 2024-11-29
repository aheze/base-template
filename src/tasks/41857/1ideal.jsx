// Importing necessary components and hooks
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Function to convert HEX color to RGB format
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Component to display the color in both HEX and RGB formats
function ColorDisplay({ color }) {
  const rgb = hexToRgb(color); // Convert HEX to RGB
  const rgbString = rgb ? `RGB(${rgb.r}, ${rgb.g}, ${rgb.b})` : 'Invalid Color';

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Display a circular color preview with animation */}
      <div
        style={{ backgroundColor: color }}
        className="w-40 h-40 rounded-full border-4 border-gray-300 shadow-xl transition-all duration-500 animate-spin-slow hover:scale-110"
      ></div>
      {/* Display HEX and RGB values */}
      <p className="text-xl font-bold text-gray-700">HEX: {color}</p>
      <p className="text-md text-gray-500">{rgbString}</p>
    </div>
  );
}

// Component to handle color input and reset functionality
function ColorPicker() {
  const [color, setColor] = useState('#ffffff'); // Tracks the selected color

  // Update color state when a new color is selected
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  // Reset color to the default white
  const resetColor = () => {
    setColor('#ffffff');
  };

  return (
    <Card className="max-w-lg mx-auto p-6 bg-gradient-to-r from-blue-50 via-white to-blue-100 shadow-lg hover:shadow-2xl transition-shadow">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-extrabold text-blue-600">
          Color Picker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Color input field */}
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="w-full h-14 cursor-pointer rounded-md shadow-md hover:scale-105 transition-all"
        />
        {/* Display the selected color */}
        <ColorDisplay color={color} />
        {/* Button to reset the color */}
        <Button
          onClick={resetColor}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          Reset
        </Button>
      </CardContent>
    </Card>
  );
}

// Main Application Component
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-6">
      <ColorPicker />
    </div>
  );
}