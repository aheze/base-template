import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import Chart from "chart.js/auto";

// Component to render a spending breakdown chart
function SpendingChart({ data }) {
  useEffect(() => {
    const ctx = document.getElementById("spendingChart");
    new Chart(ctx, {
      type: "pie", // Using a pie chart to visualize expenses
      data: {
        labels: Object.keys(data), // Expense categories
        datasets: [
          {
            label: "Expenses",
            data: Object.values(data), // Values for each category
            backgroundColor: [
              "#4CAF50",
              "#FF9800",
              "#2196F3",
              "#F44336",
              "#9C27B0",
            ], // Colors for each slice
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" }, // Positioning legend at the bottom
        },
      },
    });
  }, [data]);

  return <canvas id="spendingChart" className="w-full h-64"></canvas>;
}

// Main Financial Goal Tracker App
export default function App() {
  // States for managing user data
  const [goal, setGoal] = useState({ name: "", target: 0, saved: 0 }); // Goal details
  const [expenses, setExpenses] = useState([]); // List of expenses
  const [spendingData, setSpendingData] = useState({}); // Spending breakdown
  const [sliderValue, setSliderValue] = useState(50); // Slider for savings simulation
  const [reminders, setReminders] = useState(false); // Reminder toggle
  const [tips, setTips] = useState(""); // Personalized savings tips

  // Function to add an expense and update the chart data
  const handleAddExpense = (category, amount) => {
    if (amount > 0) {
      const newExpenses = [...expenses, { category, amount }];
      setExpenses(newExpenses);

      // Update the spending breakdown chart data
      const updatedSpending = { ...spendingData };
      updatedSpending[category] = (updatedSpending[category] || 0) + amount;
      setSpendingData(updatedSpending);
    }
  };

  // Calculate goal progress percentage
  const calculateGoalProgress = () => {
    if (goal.target > 0) {
      return Math.min((goal.saved / goal.target) * 100, 100); // Cap progress at 100%
    }
    return 0;
  };

  // Handle slider changes for savings simulation
  const handleSliderChange = (value) => {
    setSliderValue(value[0]);
  };

  // Provide personalized savings tips based on current progress and slider value
  useEffect(() => {
    if (goal.target > 0) {
      const projectedCompletion =
        goal.saved +
        (sliderValue / 100) * goal.target; // Simulate additional savings

      setTips(
        projectedCompletion >= goal.target
          ? "You’re on track to achieve your goal. Great job!"
          : `Try saving an extra $${((goal.target - goal.saved) / 4).toFixed(
              2
            )} weekly to meet your target.`
      );
    }
  }, [goal, sliderValue]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Financial Goal Tracker */}
      <Card className="max-w-md w-full mb-6">
        <CardHeader>
          <CardTitle>Financial Goal Tracker</CardTitle>
          <CardDescription>Set, track, and achieve your financial goals.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Goal Name (e.g., Vacation)"
            value={goal.name}
            onChange={(e) => setGoal({ ...goal, name: e.target.value })}
            className="mb-4"
          />
          <div className="flex space-x-2">
            <Input
              placeholder="Target Amount ($)"
              type="number"
              value={goal.target}
              onChange={(e) => setGoal({ ...goal, target: parseFloat(e.target.value) })}
            />
            <Input
              placeholder="Saved Amount ($)"
              type="number"
              value={goal.saved}
              onChange={(e) => setGoal({ ...goal, saved: parseFloat(e.target.value) })}
            />
          </div>
          <Progress value={calculateGoalProgress()} className="mt-4" />
          <p className="mt-2 text-center">
            Progress: {calculateGoalProgress().toFixed(2)}%
          </p>
        </CardContent>
      </Card>

      {/* Daily Expense Tracker with Chart */}
      <Card className="max-w-lg w-full mb-6">
        <CardHeader>
          <CardTitle>Daily Expense Tracker</CardTitle>
          <CardDescription>Track and analyze your expenses.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Category"
              onChange={(e) => handleAddExpense(e.target.value, 100)}
            />
            <Button onClick={() => handleAddExpense("Food", 50)}>
              Add Expense
            </Button>
          </div>
          <SpendingChart data={spendingData} />
        </CardContent>
      </Card>

      {/* Personalized Savings Tips */}
      <Card className="max-w-lg w-full mb-6">
        <CardHeader>
          <CardTitle>Personalized Savings Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{tips}</p>
        </CardContent>
      </Card>

      {/* Predictive Insights Section */}
      <Card className="max-w-lg w-full mb-6">
        <CardHeader>
          <CardTitle>Predictive Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            value={[sliderValue]}
            onValueChange={handleSliderChange}
            min={0}
            max={100}
            step={10}
            className="mb-4"
          />
          <p>
            Adjust your savings rate: {sliderValue}% of your target goal.
          </p>
        </CardContent>
      </Card>

      {/* Customizable Reminders */}
      <Card className="max-w-lg w-full mb-6">
        <CardHeader>
          <CardTitle>Reminders</CardTitle>
        </CardHeader>
        <CardContent>
          <Switch
            checked={reminders}
            onCheckedChange={setReminders}
            className="mb-4"
          />
          <p>{reminders ? "Reminders Enabled" : "Reminders Disabled"}</p>
        </CardContent>
      </Card>
    </div>
  );
}
