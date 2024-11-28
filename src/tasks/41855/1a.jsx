import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const conversionRates = {
  length: {
    'meters': 1,
    'feet': 3.28084,
    'kilometers': 0.001,
    'miles': 0.000621371
  },
  weight: {
    'kilograms': 1,
    'pounds': 2.20462,
    'grams': 1000,
    'ounces': 35.274
  },
  temperature: {
    'celsius': { toFahrenheit: (v) => v * 9/5 + 32, toKelvin: (v) => v + 273.15 },
    'fahrenheit': { toCelsius: (v) => (v - 32) * 5/9, toKelvin: (v) => (v - 32) * 5/9 + 273.15 },
    'kelvin': { toCelsius: (v) => v - 273.15, toFahrenheit: (v) => (v - 273.15) * 9/5 + 32 }
  },
  currency: {
    'usd': 1,
    'eur': 0.85,
    'gbp': 0.72,
    'jpy': 110.41
  }
};

function UnitConverter({ category }) {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState(Object.keys(conversionRates[category])[0]);
  const [toUnit, setToUnit] = useState(Object.keys(conversionRates[category])[1]);
  const [result, setResult] = useState('');

  const convert = () => {
    if (!value) return setResult('');
    const baseValue = parseFloat(value) / conversionRates[category][fromUnit];
    let convertedValue;
    if (category === 'temperature') {
      convertedValue = conversionRates[category][fromUnit]['to' + toUnit.charAt(0).toUpperCase() + toUnit.slice(1)](baseValue);
    } else {
      convertedValue = baseValue * conversionRates[category][toUnit];
    }
    setResult(convertedValue.toFixed(2));
  };

  return (
    <Card className="sm:w-[300px] mx-auto">
      <CardHeader>
        <CardTitle>{category.charAt(0).toUpperCase() + category.slice(1)} Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input 
          type="number" 
          placeholder="Enter value" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
        />
        <div className="flex space-x-4">
          <Select onValueChange={setFromUnit}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="From" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(conversionRates[category]).map(unit => 
                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
              )}
            </SelectContent>
          </Select>
          <Select onValueChange={setToUnit}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="To" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(conversionRates[category]).map(unit => 
                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={convert}>Convert</Button>
        {result && <p>Result: {result} {toUnit}</p>}
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('length');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Select onValueChange={setActiveCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {['length', 'weight', 'temperature', 'currency'].map(cat => 
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      <UnitConverter category={activeCategory} />
    </div>
  );
}