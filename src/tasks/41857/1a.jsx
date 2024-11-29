import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEFAULT_COLOR = "#3b82f6";

function ColorPreview({ color }) {
  return (
    <div
      className="w-32 h-32 rounded-full mx-auto mb-4 transition-all duration-300 ease-in-out"
      style={{ backgroundColor: color }}
    ></div>
  );
}

function ColorValues({ hex, rgb }) {
  return (
    <div className="text-center">
      <p className="text-lg font-semibold mb-2">HEX: {hex}</p>
      <p className="text-lg font-semibold">
        RGB: {rgb.r}, {rgb.g}, {rgb.b}
      </p>
    </div>
  );
}

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

export default function App() {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [rgb, setRgb] = useState(hexToRgb(DEFAULT_COLOR));

  useEffect(() => {
    const newRgb = hexToRgb(color);
    if (newRgb) {
      setRgb(newRgb);
    }
  }, [color]);

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleReset = () => {
    setColor(DEFAULT_COLOR);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Color Picker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <ColorPreview color={color} />
            <div className="flex justify-center">
              <Label htmlFor="colorPicker" className="sr-only">
                Pick a color
              </Label>
              <Input
                id="colorPicker"
                type="color"
                value={color}
                onChange={handleColorChange}
                className="w-24 h-10 p-1 rounded cursor-pointer"
              />
            </div>
            <ColorValues hex={color} rgb={rgb} />
            <Button
              onClick={handleReset}
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}