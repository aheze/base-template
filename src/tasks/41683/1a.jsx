import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Mock data for currency exchange rates
const mockExchangeRates = {
  USD: 1,
  EUR: 0.85,
  INR: 74.5,
};

const categories = [
  { name: 'Rent', color: 'bg-blue-500' },
  { name: 'Food', color: 'bg-green-500' },
  { name: 'Transport', color: 'bg-yellow-500' },
  // Add more categories here...
];

function App() {
  const [currency, setCurrency] = useState('USD');
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0].name);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = expenses.reduce((sum, expense) => 
      sum + expense.amount * (mockExchangeRates[expense.currency] / mockExchangeRates[currency]), 0);
    setTotal(newTotal);
  }, [expenses, currency]);

  const addExpense = () => {
    if (amount && category) {
      setExpenses([...expenses, { amount: parseFloat(amount), category, currency }]);
      setAmount('');
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Global Monthly Expense Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="INR">INR</SelectItem>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
            </div>
            <div className="col-span-2">
              <Label htmlFor="category">Category</Label>
              <Select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map(cat => <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>)}
              </Select>
            </div>
          </div>
          <Button onClick={addExpense}>Add Expense</Button>
          
          <div className="mt-4">
            <h2 className="text-lg font-bold">Total Expenses: {total.toFixed(2)} {currency}</h2>
            <div className="mt-2 space-y-2">
              {categories.map(cat => {
                const catTotal = expenses.filter(exp => exp.category === cat.name).reduce((sum, exp) => 
                  sum + exp.amount * (mockExchangeRates[exp.currency] / mockExchangeRates[currency]), 0);
                return (
                  <div key={cat.name} className="flex items-center">
                    <div className={`w-4 h-4 mr-2 ${cat.color}`}></div>
                    <span>{cat.name}: {catTotal.toFixed(2)} {currency}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;