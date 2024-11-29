import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Predefined exchange rates relative to USD
const exchangeRates = {
  "USD": { "name": "US Dollar", "rate": 1 },
  "EUR": { "name": "Euro", "rate": 0.85 },
  "GBP": { "name": "British Pound", "rate": 0.72 },
  "JPY": { "name": "Japanese Yen", "rate": 110.45 },
  "INR": { "name": "Indian Rupee", "rate": 74.50 },
  // Add more currencies as needed
};

function CurrencySelector({ value, onChange, currencies }) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Currency" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(currencies).map(key => (
          <SelectItem key={key} value={key}>{currencies[key].name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ConversionForm({ currencies }) {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (amount > 0 && fromCurrency && toCurrency) {
      const convertedAmount = (amount / currencies[fromCurrency].rate) * currencies[toCurrency].rate;
      setResult(convertedAmount.toFixed(2));
    } else {
      setResult(null);
    }
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="flex flex-col space-y-4">
      <Input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))} 
        placeholder="Enter amount"
      />
      <div className="flex justify-between space-x-4">
        <CurrencySelector 
          value={fromCurrency} 
          onChange={setFromCurrency} 
          currencies={currencies}
        />
        <CurrencySelector 
          value={toCurrency} 
          onChange={setToCurrency} 
          currencies={currencies}
        />
      </div>
    </div>
  );
}

function ResultDisplay({ result }) {
  return (
    <div className="mt-4 text-xl">
      {result ? `Result: ${result}` : 'Enter values to convert'}
    </div>
  );
}

export default function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Currency Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ConversionForm currencies={exchangeRates} />
          <ResultDisplay result={result} />
        </CardContent>
      </Card>
    </div>
  );
}