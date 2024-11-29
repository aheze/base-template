// Importing necessary components and hooks from React and UI library
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Static data for conversion factors and units
const conversionData = {
  length: [
    { unit: "Meters", factor: 1 },
    { unit: "Feet", factor: 3.28084 },
    { unit: "Kilometers", factor: 0.001 },
    { unit: "Miles", factor: 0.000621371 },
  ],
  weight: [
    { unit: "Kilograms", factor: 1 },
    { unit: "Pounds", factor: 2.20462 },
    { unit: "Grams", factor: 1000 },
    { unit: "Ounces", factor: 35.274 },
  ],
  temperature: [
    { unit: "Celsius", factor: 1 },
    { unit: "Fahrenheit", factor: 1.8 },
    { unit: "Kelvin", factor: 1 },
  ],
  currency: [
    { unit: "USD", factor: 1 },
    { unit: "EUR", factor: 0.85 },
    { unit: "GBP", factor: 0.73 },
    { unit: "JPY", factor: 110.14 },
  ],
};

// Component for unit conversion logic
const UnitConverter = ({ category }) => {
  // State to manage selected units, input value, and conversion result
  const [fromUnit, setFromUnit] = useState(conversionData[category][0].unit);
  const [toUnit, setToUnit] = useState(conversionData[category][1].unit);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  // Function to handle conversion based on selected units and input value
  const handleConvert = () => {
    const fromFactor = conversionData[category].find((item) => item.unit === fromUnit).factor;
    const toFactor = conversionData[category].find((item) => item.unit === toUnit).factor;

    let convertedValue;

    // Special handling for temperature conversions
    if (category === "temperature") {
      if (fromUnit === "Celsius" && toUnit === "Fahrenheit") {
        convertedValue = (parseFloat(inputValue) * 9) / 5 + 32;
      } else if (fromUnit === "Fahrenheit" && toUnit === "Celsius") {
        convertedValue = ((parseFloat(inputValue) - 32) * 5) / 9;
      } else if (fromUnit === "Celsius" && toUnit === "Kelvin") {
        convertedValue = parseFloat(inputValue) + 273.15;
      } else if (fromUnit === "Kelvin" && toUnit === "Celsius") {
        convertedValue = parseFloat(inputValue) - 273.15;
      } else if (fromUnit === "Fahrenheit" && toUnit === "Kelvin") {
        convertedValue = ((parseFloat(inputValue) - 32) * 5) / 9 + 273.15;
      } else if (fromUnit === "Kelvin" && toUnit === "Fahrenheit") {
        convertedValue = ((parseFloat(inputValue) - 273.15) * 9) / 5 + 32;
      } else {
        convertedValue = parseFloat(inputValue);
      }
    } else {
      // General conversion formula for other categories
      convertedValue = (parseFloat(inputValue) * toFactor) / fromFactor;
    }

    // Update result state
    setResult(convertedValue.toFixed(4));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {category.charAt(0).toUpperCase() + category.slice(1)} Converter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Dropdowns for selecting "From" and "To" units */}
          <div className="flex space-x-2">
            <Select onValueChange={setFromUnit} defaultValue={fromUnit}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                {conversionData[category].map((item) => (
                  <SelectItem key={item.unit} value={item.unit}>
                    {item.unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setToUnit} defaultValue={toUnit}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent>
                {conversionData[category].map((item) => (
                  <SelectItem key={item.unit} value={item.unit}>
                    {item.unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Input field for entering value */}
          <Input
            type="number"
            placeholder="Enter value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {/* Button to trigger conversion */}
          <Button onClick={handleConvert} className="w-full">
            Convert
          </Button>
          {/* Display conversion result */}
          {result && (
            <div className="text-center">
              <p className="text-lg font-semibold">
                Result: {result} {toUnit}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Component for displaying conversion history items
const HistoryItem = ({ fromValue, fromUnit, toValue, toUnit, category }) => (
  <div className="flex justify-between items-center py-2 border-b">
    <span>
      {fromValue} {fromUnit} to {toValue} {toUnit}
    </span>
    <span className="text-sm text-gray-500">{category}</span>
  </div>
);

// Main application component
export default function App() {
  const [activeTab, setActiveTab] = useState("length");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Function to add conversions to history
  const addToHistory = (fromValue, fromUnit, toValue, toUnit, category) => {
    setHistory((prevHistory) => [
      { fromValue, fromUnit, toValue, toUnit, category },
      ...prevHistory.slice(0, 4), // Limit to last 5 items
    ]);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* App Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Unit Converter App</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </div>
        {/* Tabs for switching between conversion categories */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-4 sm:grid-cols-2">
            {Object.keys(conversionData).map((category) => (
              <TabsTrigger key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.keys(conversionData).map((category) => (
            <TabsContent key={category} value={category}>
              <UnitConverter category={category} />
            </TabsContent>
          ))}
        </Tabs>
        {/* Conversion History */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Conversion History</CardTitle>
          </CardHeader>
          <CardContent>
            {history.length > 0 ? (
              history.map((item, index) => (
                <HistoryItem key={index} {...item} />
              ))
            ) : (
              <p className="text-center text-gray-500">
                No conversion history yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
