import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function GoalSetting({ goal, setGoal, progress, setProgress }) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Set Your Financial Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Goal description"
          value={goal.description}
          onChange={(e) => setGoal({ ...goal, description: e.target.value })}
          className="mb-2"
        />
        <Input
          type="number"
          placeholder="Target amount"
          value={goal.target}
          onChange={(e) => setGoal({ ...goal, target: e.target.value })}
          className="mb-2"
        />
        <Input
          type="date"
          value={goal.date}
          onChange={(e) => setGoal({ ...goal, date: e.target.value })}
          className="mb-4"
        />
        <Progress value={progress} className="mb-2" />
        <div className="flex justify-between">
          <span>{progress}% Complete</span>
          {progress >= 50 && <Badge>50% Milestone!</Badge>}
        </div>
      </CardContent>
    </Card>
  );
}

function ExpenseTracker({ expenses, setExpenses }) {
  const [newExpense, setNewExpense] = useState({ category: "", amount: "" });

  const addExpense = () => {
    if (newExpense.category && newExpense.amount) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({ category: "", amount: "" });
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Expense Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Category"
          value={newExpense.category}
          onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
          className="mb-2"
        />
        <Input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          className="mb-2"
        />
        <Button onClick={addExpense}>Add Expense</Button>
        <div className="mt-4">
          {expenses.map((expense, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>{expense.category}</span>
              <span>${expense.amount}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SavingsTips({ progress }) {
  const tips = [
    "Try reducing your dining expenses by 20%",
    "Automate a portion of your savings",
    "Look for free entertainment options in your area",
    "Consider a side hustle to boost your income",
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Savings Tips</CardTitle>
      </CardHeader>
      <CardContent>
        {progress < 50 && (
          <Alert className="mb-4">
            <AlertTitle>You're falling short of your goal</AlertTitle>
            <AlertDescription>Here are some tips to help you catch up:</AlertDescription>
          </Alert>
        )}
        <ul className="list-disc pl-5">
          {tips.map((tip, index) => (
            <li key={index} className="mb-2">{tip}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function PredictiveInsights({ goal, progress }) {
  const [extraSavings, setExtraSavings] = useState(0);
  const weeksLeft = Math.ceil((new Date(goal.date) - new Date()) / (1000 * 60 * 60 * 24 * 7));

  const projectedSavings = (goal.target * progress / 100) + (extraSavings * weeksLeft);
  const projectedProgress = Math.min((projectedSavings / goal.target) * 100, 100);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Predictive Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="block mb-2">Extra weekly savings: ${extraSavings}</label>
          <Slider
            min={0}
            max={200}
            step={10}
            value={[extraSavings]}
            onValueChange={(value) => setExtraSavings(value[0])}
          />
        </div>
        <Progress value={projectedProgress} className="mb-2" />
        <div>Projected progress: {projectedProgress.toFixed(2)}%</div>
        <div>Projected savings: ${projectedSavings.toFixed(2)}</div>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [goal, setGoal] = useState({ description: "", target: "", date: "" });
  const [progress, setProgress] = useState(0);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 1;
        return newProgress > 100 ? 0 : newProgress;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Financial Goal Tracker</h1>
      <GoalSetting goal={goal} setGoal={setGoal} progress={progress} setProgress={setProgress} />
      <ExpenseTracker expenses={expenses} setExpenses={setExpenses} />
      <SavingsTips progress={progress} />
      <PredictiveInsights goal={goal} progress={progress} />
    </div>
  );
}