import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const predefinedCategories = [
  { name: "Rent", color: "bg-blue-500" },
  { name: "Food", color: "bg-green-500" },
  { name: "Transport", color: "bg-yellow-500" },
  { name: "Entertainment", color: "bg-red-500" },
  { name: "Healthcare", color: "bg-purple-500" },
  { name: "Miscellaneous", color: "bg-gray-500" },
];

const currencyRates = {
  USD: 1,
  EUR: 0.85,
  INR: 75,
};

export default function App() {
  const [currency, setCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [categories, setCategories] = useState(predefinedCategories);
  const [expenses, setExpenses] = useState({});
  const [monthlyBudget, setMonthlyBudget] = useState(1000);
  const [customCategory, setCustomCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [savingsGoal, setSavingsGoal] = useState(200);
  const [showDarkMode, setShowDarkMode] = useState(false);

  useEffect(() => {
    setExchangeRate(currencyRates[currency]);
  }, [currency]);

  const handleAddExpense = () => {
    if (!selectedCategory || !expenseAmount) return;
    const amountInUSD = parseFloat(expenseAmount) / exchangeRate;
    setExpenses((prev) => ({
      ...prev,
      [selectedCategory]: (prev[selectedCategory] || 0) + amountInUSD,
    }));
    setExpenseAmount("");
    setSelectedCategory("");
  };

  const handleAddCategory = () => {
    if (!customCategory) return;
    setCategories((prev) => [
      ...prev,
      { name: customCategory, color: "bg-indigo-500" },
    ]);
    setCustomCategory("");
  };

  const exportExpenses = () => {
    const csvRows = [
      ["Category", "Amount"],
      ...Object.entries(expenses).map(([cat, amt]) => [
        cat,
        (amt * exchangeRate).toFixed(2),
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
  const remainingBudget = monthlyBudget - totalExpenses;
  const progressBarWidth = (category) =>
    ((expenses[category] || 0) / monthlyBudget) * 100;

  const spendingAlert = remainingBudget < 0 ? "You have exceeded your budget!" : "";

  return (
    <div
      className={`min-h-screen ${
        showDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      } p-6`}
    >
      <header className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-blue-600">
          Global Expense Tracker
        </h1>
        <p className="text-gray-600">
          Track your expenses and savings goals effectively.
        </p>
        <Button
          className="mt-4 bg-blue-500 text-white"
          onClick={() => setShowDarkMode(!showDarkMode)}
        >
          Toggle {showDarkMode ? "Light" : "Dark"} Mode
        </Button>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">
        {/* Currency and Budget Section */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Currency</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {Object.keys(currencyRates).map((cur) => (
                    <option key={cur} value={cur}>
                      {cur}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Monthly Budget ({currency})
                </label>
                <Input
                  type="number"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Savings Goal ({currency})
                </label>
                <Input
                  type="number"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Add an Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <Input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder={`Amount in ${currency}`}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddExpense} className="bg-blue-500 text-white">
              Add Expense
            </Button>
          </CardFooter>
        </Card>

        {/* Expense Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            {categories.map((cat) => (
              <div key={cat.name} className="mb-4">
                <div className="flex justify-between items-center">
                  <span>{cat.name}</span>
                  <span>
                    {((expenses[cat.name] || 0) * exchangeRate).toFixed(2)} {currency}
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-4 rounded-full">
                  <div
                    style={{
                      width: `${progressBarWidth(cat.name)}%`,
                    }}
                    className={`${cat.color} h-full rounded-full`}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">
              Total Spent: {(totalExpenses * exchangeRate).toFixed(2)} {currency}
            </p>
            <p className="text-sm text-red-500">{spendingAlert}</p>
            <Button onClick={exportExpenses} className="mt-2 bg-green-500 text-white">
              Export to CSV
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
