import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function App() {
  return (
    <div className="container mx-auto p-4 sm:p-6">
      <Header />
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="convertor">Unit Converter</TabsTrigger>
        </TabsList>
        <TabsContent value="overview"><Overview /></TabsContent>
        <TabsContent value="examples"><Examples /></TabsContent>
        <TabsContent value="calculator"><Calculator /></TabsContent>
        <TabsContent value="convertor"><UnitConverter /></TabsContent>
      </Tabs>
    </div>
  );
}

function Header() {
  return <h1 className="text-3xl font-bold text-center mb-6">Pythagorean Theorem Calculator</h1>;
}

function Overview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p>The Pythagorean theorem states that in a right-angled triangle, the square of the length of the hypotenuse (c) is equal to the sum of the squares of the lengths of the other two sides (a and b): <b>a² + b² = c²</b>.</p>
        <p>Proof and further explanation can be detailed here with diagrams or mathematical steps.</p>
      </CardContent>
    </Card>
  );
}

function Examples() {
  // Here you would include examples with diagrams
  return <div>Examples with diagrams will be shown here.</div>;
}

function Calculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [history, setHistory] = useState([]);

  const calculate = (type) => {
    let result;
    if (type === 'side') {
      result = Math.sqrt(Math.pow(c, 2) - Math.pow(b || a, 2));
    } else {
      result = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }
    setHistory([...history, {a, b, c: type === 'side' ? result : c}]);
    // Reset fields or update accordingly
  };

  return (
    <Card>
      <CardContent>
        <Input type="number" placeholder="Side a" value={a} onChange={(e) => setA(e.target.value)} />
        <Input type="number" placeholder="Side b" value={b} onChange={(e) => setB(e.target.value)} />
        <Input type="number" placeholder="Hypotenuse c" value={c} onChange={(e) => setC(e.target.value)} />
        <Button onClick={() => calculate('hypotenuse')}>Calculate Hypotenuse</Button>
        <Button onClick={() => calculate('side')}>Calculate Side</Button>
        <div>
          <h3>History:</h3>
          {history.map((entry, index) => (
            <div key={index}>{`a=${entry.a}, b=${entry.b}, c=${entry.c}`}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function UnitConverter() {
  const units = ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd', 'mi', 'nm', 'ly'];
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('m');
  const [result, setResult] = useState('');

  const convert = () => {
    // Conversion logic here, simplified for example
    let conversionRate = 1; // Placeholder for actual conversion rates
    setResult((value * conversionRate).toFixed(2) + ' ' + toUnit);
  };

  return (
    <Card>
      <CardContent>
        <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value" />
        <Select onValueChange={setFromUnit}>
          <SelectTrigger><SelectValue placeholder="From" /></SelectTrigger>
          <SelectContent>
            {units.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select onValueChange={setToUnit}>
          <SelectTrigger><SelectValue placeholder="To" /></SelectTrigger>
          <SelectContent>
            {units.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button onClick={convert}>Convert</Button>
        {result && <p>Result: {result}</p>}
      </CardContent>
    </Card>
  );
}

export default App;