import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const units = ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd', 'mi', 'nm', 'ly'];

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Pythagorean Theorem Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="convertor">Unit Convertor</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Overview />
            </TabsContent>
            <TabsContent value="examples">
              <Examples />
            </TabsContent>
            <TabsContent value="calculator">
              <Calculator />
            </TabsContent>
            <TabsContent value="convertor">
              <UnitConvertor />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function Overview() {
  return (
    <div>
      <p>The Pythagorean theorem states that in a right-angled triangle, the square of the length of the hypotenuse (c) is equal to the sum of squares of the lengths of the other two sides (a and b):</p>
      <p className="text-center mt-2">c² = a² + b²</p>
      <p className="mt-4">This theorem can be used to find the length of any side of a right triangle if the lengths of the other two sides are known.</p>
    </div>
  );
}

function Examples() {
  return (
    <div>
      <p>Example 1: If a = 3 and b = 4, then c = √(3² + 4²) = 5.</p>
      <p>Example 2: If c = 13 and a = 5, then b = √(13² - 5²) ≈ 12.</p>
      {/* More examples can be added here with diagrams */}
    </div>
  );
}

function Calculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [history, setHistory] = useState([]);
  const [calcType, setCalcType] = useState('side');

  const calculate = () => {
    if (calcType === 'side') {
      if (a && b) {
        const result = Math.sqrt(Math.pow(Number(a), 2) + Math.pow(Number(b), 2));
        setC(result.toFixed(2));
        setHistory([...history, `c = ${result.toFixed(2)} when a = ${a}, b = ${b}`]);
      }
    } else {
      if (a && c) {
        const result = Math.sqrt(Math.pow(Number(c), 2) - Math.pow(Number(a), 2));
        setB(result.toFixed(2));
        setHistory([...history, `b = ${result.toFixed(2)} when a = ${a}, c = ${c}`]);
      }
    }
  };

  const reset = () => {
    setA(''); setB(''); setC('');
  };

  return (
    <div>
      <div className="mb-4">
        <Button variant={calcType === 'side' ? 'default' : 'outline'} onClick={() => setCalcType('side')}>Calculate Hypotenuse</Button>
        <Button variant={calcType === 'hypotenuse' ? 'default' : 'outline'} onClick={() => setCalcType('hypotenuse')}>Calculate Side</Button>
      </div>
      <Input type="number" placeholder="Side a" value={a} onChange={(e) => setA(e.target.value)} className="mb-2" />
      {calcType === 'side' ? 
        <Input type="number" placeholder="Side b" value={b} onChange={(e) => setB(e.target.value)} className="mb-2" /> :
        <Input type="number" placeholder="Hypotenuse c" value={c} onChange={(e) => setC(e.target.value)} className="mb-2" />
      }
      <Button onClick={calculate}>Calculate</Button>
      <Button onClick={reset} className="ml-2">Reset</Button>
      {calcType === 'side' && c && <p>Hypotenuse c: {c}</p>}
      {calcType === 'hypotenuse' && b && <p>Side b: {b}</p>}
      <div className="mt-4">
        <h3>History:</h3>
        {history.map((entry, index) => <p key={index}>{entry}</p>)}
      </div>
    </div>
  );
}

function UnitConvertor() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('m');
  const [result, setResult] = useState('');
  const [convHistory, setConvHistory] = useState([]);

  const convert = () => {
    const conversionFactors = {
      'mm': 0.001, 'cm': 0.01, 'm': 1, 'km': 1000, 'in': 0.0254, 
      'ft': 0.3048, 'yd': 0.9144, 'mi': 1609.34, 'nm': 1852, 'ly': 9.461e+15
    };
    const resultValue = (value * conversionFactors[fromUnit]) / conversionFactors[toUnit];
    setResult(resultValue.toFixed(4));
    setConvHistory([...convHistory, `${value} ${fromUnit} = ${resultValue.toFixed(4)} ${toUnit}`]);
  };

  const reset = () => {
    setValue(''); setResult(''); setFromUnit('m'); setToUnit('m');
  };

  return (
    <div>
      <Input type="number" placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)} className="mb-2" />
      <div className="flex space-x-2 mb-2">
        <Select value={fromUnit} onValueChange={setFromUnit}>
          {units.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
        </Select>
        <Select value={toUnit} onValueChange={setToUnit}>
          {units.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
        </Select>
      </div>
      <Button onClick={convert}>Convert</Button>
      <Button onClick={reset} className="ml-2">Reset</Button>
      {result && <p>Result: {result} {toUnit}</p>}
      <div className="mt-4">
        <h3>Conversion History:</h3>
        {convHistory.map((entry, index) => <p key={index}>{entry}</p>)}
      </div>
    </div>
  );
}

export default App;