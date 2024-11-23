import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

function App() {
  const [goal, setGoal] = useState({ amount: 5000, saved: 0, timeline: 12 });
  const [expenses, setExpenses] = useState([]);
  const [tips, setTips] = useState([]);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const savedPercentage = (goal.saved / goal.amount) * 100;
    if (savedPercentage >= 50 && savedPercentage < 100) {
      setTips([...tips, "Great job! You've hit the halfway mark. Keep going!"]);
    }
    // Simple forecast logic
    const remainingWeeks = goal.timeline * 4 - (goal.saved / (goal.amount / (goal.timeline * 4)));
    setForecast(remainingWeeks > 0 ? `You might need ${remainingWeeks} more weeks at this rate.` : "You're on track!");
  }, [goal]);

  const addExpense = (category, amount) => {
    setExpenses([...expenses, { category, amount }]);
    setGoal({...goal, saved: goal.saved - amount});
  };

  const updateSavings = (newAmount) => {
    setGoal({...goal, saved: newAmount});
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Financial Goal</CardTitle>
          <CardDescription>Set and track your savings goal.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input 
            type="number" 
            placeholder="Goal Amount" 
            value={goal.amount} 
            onChange={e => setGoal({...goal, amount: Number(e.target.value)})} 
          />
          <Input 
            type="number" 
            placeholder="Timeline (months)" 
            value={goal.timeline} 
            onChange={e => setGoal({...goal, timeline: Number(e.target.value)})} 
          />
          <Progress value={(goal.saved / goal.amount) * 100} className="mt-4"/>
          {goal.saved >= goal.amount * 0.5 && <Badge className="mt-2">50% Saved!</Badge>}
        </CardContent>
        <CardFooter>
          <Button onClick={() => updateSavings(goal.saved + 100)}>Add Savings</Button>
        </CardFooter>
      </Card>

      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          {expenses.map((exp, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>{exp.category}</span>
              <span>${exp.amount}</span>
            </div>
          ))}
          <Input 
            type="text" 
            placeholder="Category" 
            onBlur={e => addExpense(e.target.value, 0)} 
          />
          <Input 
            type="number" 
            placeholder="Amount" 
            onBlur={e => addExpense("", Number(e.target.value))} 
          />
        </CardContent>
      </Card>

      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Savings Tips</CardTitle>
        </CardHeader>
        <CardContent>
          {tips.map((tip, idx) => <p key={idx}>{tip}</p>)}
        </CardContent>
      </Card>

      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{forecast}</p>
          <Slider 
            defaultValue={[0]} 
            max={100} 
            onValueChange={(val) => updateSavings(goal.saved + val[0])} 
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;