import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Expanded exchange rates data with 50 currencies
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
  INR: { name: "Indian Rupee", rate: 74.15 },
  RUB: { name: "Russian Ruble", rate: 73.65 },
  HKD: { name: "Hong Kong Dollar", rate: 7.78 },
  SGD: { name: "Singapore Dollar", rate: 1.36 },
  ZAR: { name: "South African Rand", rate: 14.55 },
  BRL: { name: "Brazilian Real", rate: 5.25 },
  MXN: { name: "Mexican Peso", rate: 19.95 },
  NOK: { name: "Norwegian Krone", rate: 8.89 },
  KRW: { name: "South Korean Won", rate: 1165.5 },
  THB: { name: "Thai Baht", rate: 33.25 },
  PHP: { name: "Philippine Peso", rate: 50.75 },
  PLN: { name: "Polish Zloty", rate: 3.85 },
  TRY: { name: "Turkish Lira", rate: 8.55 },
  MYR: { name: "Malaysian Ringgit", rate: 4.15 },
  IDR: { name: "Indonesian Rupiah", rate: 14350 },
  HUF: { name: "Hungarian Forint", rate: 303.65 },
  CZK: { name: "Czech Koruna", rate: 21.75 },
  AED: { name: "UAE Dirham", rate: 3.67 },
  SAR: { name: "Saudi Riyal", rate: 3.75 },
  KWD: { name: "Kuwaiti Dinar", rate: 0.3 },
  BDT: { name: "Bangladeshi Taka", rate: 85.15 },
  PKR: { name: "Pakistani Rupee", rate: 167.15 },
  DKK: { name: "Danish Krone", rate: 6.4 },
  ISK: { name: "Icelandic Krona", rate: 125.55 },
  CLP: { name: "Chilean Peso", rate: 785.75 },
  COP: { name: "Colombian Peso", rate: 3800 },
  ARS: { name: "Argentine Peso", rate: 97.5 },
  TWD: { name: "Taiwan Dollar", rate: 27.75 },
  NGN: { name: "Nigerian Naira", rate: 411.25 },
  GHS: { name: "Ghanaian Cedi", rate: 5.85 },
  EGP: { name: "Egyptian Pound", rate: 15.65 },
  MAD: { name: "Moroccan Dirham", rate: 9.15 },
  VND: { name: "Vietnamese Dong", rate: 23050 },
  ILS: { name: "Israeli Shekel", rate: 3.25 },
  QAR: { name: "Qatari Riyal", rate: 3.64 },
  OMR: { name: "Omani Rial", rate: 0.38 },
  KES: { name: "Kenyan Shilling", rate: 109.25 },
};

// Component for currency selection
const CurrencySelector = ({ value, onChange, label }) => (
  <div className="mb-4">
    <Label>{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full border-gray-300 rounded-md shadow-sm">
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

// Conversion form component
const ConversionForm = ({ amount, setAmount, convertedAmount, baseCurrency, targetCurrency }) => (
  <div className="mb-4">
    <Label>Amount</Label>
    <Input
      type="number"
      min="0"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      placeholder="Enter amount"
      className="w-full border-gray-300 rounded-md shadow-inner"
    />
    <p className="mt-3 text-lg font-semibold text-blue-600">
      {amount} {baseCurrency} = {convertedAmount.toFixed(2)} {targetCurrency}
    </p>
  </div>
);

// Main application component
export default function App() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [amount, setAmount] = useState("1");
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Calculate the conversion amount
  useEffect(() => {
    const baseRate = exchangeRates[baseCurrency]?.rate || 1;
    const targetRate = exchangeRates[targetCurrency]?.rate || 1;
    const result = (parseFloat(amount) / baseRate) * targetRate;
    setConvertedAmount(result);
  }, [baseCurrency, targetCurrency, amount]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex items-center justify-center">
      <Card className="w-full max-w-lg shadow-xl rounded-lg transform hover:scale-105 transition duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Currency Converter</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Currency selection dropdowns */}
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
          {/* Conversion form */}
          <ConversionForm
            amount={amount}
            setAmount={setAmount}
            convertedAmount={convertedAmount}
            baseCurrency={baseCurrency}
            targetCurrency={targetCurrency}
          />
        </CardContent>
      </Card>
    </div>
  );
}