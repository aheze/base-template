import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

function App() {
  const [goal, setGoal] = useState({ name: '', amount: 0, timeline: '' });
  const [saved, setSaved] = useState(0);
  const [expenses, setExpenses] = useState([]);

  const handleGoalChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const addExpense = (category, amount) => {
    setExpenses([...expenses, { category, amount }]);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const progress = Math.min((saved / goal.amount) * 100, 100);

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Set Your Financial Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <Input 
            name="name" 
            value={goal.name} 
            onChange={handleGoalChange} 
            placeholder="Goal Name" 
            className="mb-2"
          />
          <Input 
            name="amount" 
            type="number" 
            value={goal.amount} 
            onChange={handleGoalChange} 
            placeholder="Target Amount ($)" 
            className="mb-2"
          />
          <Input 
            name="timeline" 
            type="date" 
            value={goal.timeline} 
            onChange={handleGoalChange} 
            placeholder="Timeline" 
          />
        </CardContent>
        <CardFooter>
          <Progress value={progress} className="w-full"/>
          <p className="text-center mt-2">{`${progress.toFixed(2)}% saved`}</p>
        </CardFooter>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Track Your Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Category" className="mb-2" />
          <Input type="number" placeholder="Amount ($)" className="mb-2" />
          <Button onClick={() => addExpense('New', 0)}>Add Expense</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Savings Simulator</CardTitle>
        </CardHeader>
        <CardContent>
          <Slider defaultValue={[50]} max={200} step={10} onValueChange={(value) => setSaved(saved + value[0])} />
          <p className="mt-2">Adjust weekly savings: ${saved}</p>
        </CardContent>
      </Card>

      {/* Placeholder for future features like insights, reminders, etc. */}
    </div>
  );
}

export default App;