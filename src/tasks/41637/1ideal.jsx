import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function App() {
  const [goal, setGoal] = useState({ name: "", amount: 0, timeline: 0 });
  const [savedAmount, setSavedAmount] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ category: "", amount: 0 });
  const [categories] = useState(["Food", "Transport", "Leisure", "Shopping", "Others"]);
  const progressChartRef = useRef(null);
  const expenseChartRef = useRef(null);

  const progress = (savedAmount / goal.amount) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setSavedAmount((prev) => Math.min(prev + 10, goal.amount)); // Simulate auto-saving
    }, 5000);
    return () => clearInterval(interval);
  }, [goal.amount]);

  useEffect(() => {
    if (progressChartRef.current) {
      drawProgressChart();
    }
    if (expenseChartRef.current) {
      drawExpenseChart();
    }
  }, [savedAmount, expenses]);

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    setGoal({
      name: e.target.goalName.value,
      amount: parseFloat(e.target.goalAmount.value),
      timeline: parseInt(e.target.goalTimeline.value),
    });
    setSavedAmount(0);
    setExpenses([]);
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (newExpense.category && newExpense.amount > 0) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({ category: "", amount: 0 });
    }
  };

  const drawProgressChart = () => {
    const ctx = progressChartRef.current.getContext("2d");
    const radius = 50;
    const centerX = 75;
    const centerY = 75;
    const endAngle = (progress / 100) * 2 * Math.PI;

    ctx.clearRect(0, 0, 150, 150); // Clear canvas
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, endAngle);
    ctx.strokeStyle = "#4caf50";
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.font = "16px Arial";
    ctx.fillStyle = "#4caf50";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${Math.round(progress)}%`, centerX, centerY);
  };

  const drawExpenseChart = () => {
    const ctx = expenseChartRef.current.getContext("2d");
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const categoryTotals = expenses.reduce((totals, expense) => {
      totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
      return totals;
    }, {});

    const colors = ["#f87171", "#facc15", "#4caf50", "#3b82f6", "#9f7aea"];
    const centerX = 75;
    const centerY = 75;
    const radius = 50;
    let startAngle = 0;

    ctx.clearRect(0, 0, 150, 150); // Clear canvas

    Object.entries(categoryTotals).forEach(([category, amount], index) => {
      const sliceAngle = (amount / totalExpense) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();

      startAngle = endAngle;
    });

    ctx.font = "12px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Expenses", centerX, centerY);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-8">Financial Goal Tracker</h1>

      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle>Set Your Financial Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGoalSubmit} className="space-y-4">
            <Input name="goalName" placeholder="Goal Name (e.g., Vacation)" required />
            <Input name="goalAmount" type="number" placeholder="Target Amount (e.g., 5000)" required />
            <Input name="goalTimeline" type="number" placeholder="Timeline (in weeks)" required />
            <Button type="submit" className="bg-purple-700 hover:bg-purple-800">
              Set Goal
            </Button>
          </form>
        </CardContent>
      </Card>

      {goal.amount > 0 && (
        <>
          <Card className="mb-6 shadow-lg">
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <canvas ref={progressChartRef} width="150" height="150" className="mx-auto mb-4"></canvas>
              <p className="text-sm">
                You’ve saved <span className="font-semibold">${savedAmount.toFixed(2)}</span> out of{" "}
                <span className="font-semibold">${goal.amount.toFixed(2)}</span>.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6 shadow-lg">
            <CardHeader>
              <CardTitle>Log Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleExpenseSubmit} className="space-y-4">
                <select
                  className="w-full p-2 rounded border bg-white text-gray-900"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <Input
                  type="number"
                  placeholder="Amount"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })}
                  required
                />
                <Button type="submit" className="bg-purple-700 hover:bg-purple-800">
                  Add Expense
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mb-6 shadow-lg">
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <canvas ref={expenseChartRef} width="150" height="150" className="mx-auto mb-4"></canvas>
              {expenses.length === 0 && <p>No expenses logged yet.</p>}
            </CardContent>
          </Card>

          <Alert className="mb-6 shadow-lg">
            <AlertTitle>Tip</AlertTitle>
            <AlertDescription>
              {progress < 50
                ? "Focus on cutting unnecessary expenses!"
                : progress < 80
                ? "Automate savings to stay consistent."
                : "Almost there! Avoid impulse purchases."}
            </AlertDescription>
          </Alert>
        </>
      )}
    </div>
  );
}
