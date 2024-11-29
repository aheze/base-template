import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function ColorDisplay({ color }) {
  const rgb = hexToRgb(color);
  const rgbString = rgb ? `RGB(${rgb.r}, ${rgb.g}, ${rgb.b})` : 'Invalid Color';

  return (
    <div className="flex flex-col items-center space-y-4">
      <div 
        style={{ backgroundColor: color }} 
        className="w-40 h-40 rounded-full border-2 border-gray-300 shadow-lg transition-all duration-300"
      ></div>
      <p className="text-lg font-semibold">HEX: {color}</p>
      <p className="text-sm text-gray-600">{rgbString}</p>
    </div>
  );
}

function ColorPicker() {
  const [color, setColor] = useState('#ffffff');

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const resetColor = () => {
    setColor('#ffffff');
  };

  return (
    <Card className="max-w-md mx-auto sm:max-w-lg">
      <CardHeader>
        <CardTitle>Color Picker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <input 
          type="color" 
          value={color}
          onChange={handleColorChange}
          className="w-full h-12 cursor-pointer"
        />
        <ColorDisplay color={color} />
        <Button onClick={resetColor} className="w-full">Reset</Button>
      </CardContent>
    </Card>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <ColorPicker />
    </div>
  );
}