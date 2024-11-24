import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Simulated exchange rates and country data
const exchangeRates = {
  USD: 1,
  EUR: 0.85,
  INR: 75,
};

const countryData = {
  USA: { currency: "USD", averageRent: 1500 },
  Germany: { currency: "EUR", averageRent: 1000 },
  India: { currency: "INR", averageRent: 20000 },
};

const categories = [
  "Rent",
  "Food",
  "Transport",
  "Entertainment",
  "Healthcare",
  "Miscellaneous",
];

function ExpenseForm({ onAddExpense, currency }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && category) {
      onAddExpense({ amount: parseFloat(amount), category });
      setAmount("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder={`Amount in ${currency}`}
      />
      <Select value={category} onValueChange={setCategory}>
        {categories.map((cat) => (
          <Select.Option key={cat} value={cat}>
            {cat}
          </Select.Option>
        ))}
      </Select>
      <Button type="submit">Add Expense</Button>
    </form>
  );
}

function ExpenseSummary({ expenses, budget, currency }) {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const percentageSpent = (totalExpenses / budget) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Total Spent: {totalExpenses.toFixed(2)} {currency}</p>
        <p>Budget: {budget.toFixed(2)} {currency}</p>
        <Progress value={percentageSpent} className="mt-2" />
        {percentageSpent > 90 && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              You've spent over 90% of your budget!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

function ExpenseChart({ expenses }) {
  // Simplified chart representation
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        {categories.map((category) => {
          const amount = expenses
            .filter((exp) => exp.category === category)
            .reduce((sum, exp) => sum + exp.amount, 0);
          return (
            <div key={category} className="mb-2">
              <p>{category}: {amount.toFixed(2)}</p>
              <Progress value={(amount / expenses.reduce((sum, exp) => sum + exp.amount, 0)) * 100} />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [country, setCountry] = useState("USA");
  const [currency, setCurrency] = useState("USD");
  const [budget, setBudget] = useState(5000);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const countryInfo = countryData[country];
    setCurrency(countryInfo.currency);
    setBudget(countryInfo.averageRent * 3); // Simple budget estimation
  }, [country]);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Global Monthly Expense Tracker</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={country} onValueChange={setCountry}>
            {Object.keys(countryData).map((c) => (
              <Select.Option key={c} value={c}>
                {c}
              </Select.Option>
            ))}
          </Select>
          <p className="mt-2">Currency: {currency}</p>
          <Input
            type="number"
            value={budget}
            onChange={(e) => setBudget(parseFloat(e.target.value))}
            placeholder="Set monthly budget"
            className="mt-2"
          />
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseForm onAddExpense={handleAddExpense} currency={currency} />
        </CardContent>
      </Card>

      <ExpenseSummary expenses={expenses} budget={budget} currency={currency} />
      
      <ExpenseChart expenses={expenses} />
    </div>
  );
}