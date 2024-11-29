import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Static exchange rates data
const exchangeRates = {
  USD: { name: "US Dollar", rate: 1 },
  EUR: { name: "Euro", rate: 0.85 },
  GBP: { name: "British Pound", rate: 0.73 },
  JPY: { name: "Japanese Yen", rate: 110.14 },
  AUD: { name: "Australian Dollar", rate: 1.35 },
  CAD: { name: "Canadian Dollar", rate: 1.25 },
  CHF: { name: "Swiss Franc", rate: 0.92 },
  CNY: { name: "Chinese Yuan", rate: 6.47 },
  SEK: { name: "Swedish Krona", rate: 8.63 },
  NZD: { name: "New Zealand Dollar", rate: 1.44 },
  // Add more currencies as needed
};

const CurrencySelector = ({ value, onChange, label }) => (
  <div className="mb-4">
    <Label htmlFor={label}>{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(exchangeRates).map(([code, { name }]) => (
          <SelectItem key={code} value={code}>
            {code} - {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const ConversionForm = ({ baseCurrency, targetCurrency, amount, setAmount, convertedAmount }) => (
  <div className="mb-4">
    <Label htmlFor="amount">Amount</Label>
    <Input
      type="number"
      id="amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      min="0"
      step="0.01"
      className="w-full"
    />
    <p className="mt-2">
      {amount} {baseCurrency} = {convertedAmount.toFixed(2)} {targetCurrency}
    </p>
  </div>
);

const ResultDisplay = ({ baseCurrency, targetCurrency, amount, convertedAmount }) => (
  <div className="text-lg font-semibold">
    {amount} {baseCurrency} = {convertedAmount.toFixed(2)} {targetCurrency}
  </div>
);

export default function App() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [amount, setAmount] = useState("1");
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    if (baseCurrency && targetCurrency && amount) {
      const baseRate = exchangeRates[baseCurrency].rate;
      const targetRate = exchangeRates[targetCurrency].rate;
      const result = (parseFloat(amount) / baseRate) * targetRate;
      setConvertedAmount(result);
    }
  }, [baseCurrency, targetCurrency, amount]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Currency Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <CurrencySelector
            value={baseCurrency}
            onChange={setBaseCurrency}
            label="From Currency"
          />
          <CurrencySelector
            value={targetCurrency}
            onChange={setTargetCurrency}
            label="To Currency"
          />
          <ConversionForm
            baseCurrency={baseCurrency}
            targetCurrency={targetCurrency}
            amount={amount}
            setAmount={setAmount}
            convertedAmount={convertedAmount}
          />
          <ResultDisplay
            baseCurrency={baseCurrency}
            targetCurrency={targetCurrency}
            amount={amount}
            convertedAmount={convertedAmount}
          />
        </CardContent>
      </Card>
    </div>
  );
}