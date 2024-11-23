import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function App() {
  const [goal, setGoal] = useState({ name: "", amount: 0, timeline: 0 });
  const [savedAmount, setSavedAmount] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ category: "", amount: 0 });
  const [extraSavings, setExtraSavings] = useState(0);

  const progress = (savedAmount / goal.amount) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate automatic savings
      setSavedAmount((prev) => Math.min(prev + 10, goal.amount));
    }, 5000);
    return () => clearInterval(interval);
  }, [goal.amount]);

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    setGoal({
      name: e.target.goalName.value,
      amount: parseFloat(e.target.goalAmount.value),
      timeline: parseInt(e.target.goalTimeline.value),
    });
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    setExpenses([...expenses, newExpense]);
    setNewExpense({ category: "", amount: 0 });
  };

  const getTip = () => {
    if (progress < 50) {
      return "Try reducing your dining expenses by 20% to reach your goal faster.";
    } else if (progress < 80) {
      return "You're doing great! Consider automating a portion of your savings.";
    } else {
      return "You're almost there! Keep up the good work!";
    }
  };

  const getProjectedCompletion = () => {
    const weeklySavings = (savedAmount / goal.timeline) * 7;
    const projectedWeeks = (goal.amount - savedAmount) / (weeklySavings + extraSavings);
    return Math.ceil(projectedWeeks / 7);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Financial Goal Tracker</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Set Your Financial Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGoalSubmit} className="space-y-4">
            <Input name="goalName" placeholder="Goal Name" required />
            <Input name="goalAmount" type="number" placeholder="Target Amount" required />
            <Input name="goalTimeline" type="number" placeholder="Timeline (weeks)" required />
            <Button type="submit">Set Goal</Button>
          </form>
        </CardContent>
      </Card>

      {goal.amount > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{goal.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              ${savedAmount.toFixed(2)} / ${goal.amount.toFixed(2)}
            </p>
            {progress >= 50 && <Badge>50% Saved!</Badge>}
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Log Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleExpenseSubmit} className="space-y-4">
            <Input
              placeholder="Category"
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })}
              required
            />
            <Button type="submit">Add Expense</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          {expenses.map((expense, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>{expense.category}</span>
              <span>${expense.amount.toFixed(2)}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Alert className="mb-6">
        <AlertTitle>Savings Tip</AlertTitle>
        <AlertDescription>{getTip()}</AlertDescription>
      </Alert>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Goal Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">Projected completion in {getProjectedCompletion()} weeks</p>
          <p className="mb-2">Simulate extra weekly savings:</p>
          <Slider
            min={0}
            max={100}
            step={10}
            value={[extraSavings]}
            onValueChange={(value) => setExtraSavings(value[0])}
          />
          <p className="mt-2">Extra weekly savings: ${extraSavings}</p>
        </CardContent>
      </Card>
    </div>
  );
}