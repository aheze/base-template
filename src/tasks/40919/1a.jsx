import React, { useState, useEffect } from 'react';
import { Button, Input, Select, SelectItem, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { PlusIcon, MinusIcon, EditIcon } from "@radix-ui/react-icons";

function BudgetTracker() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('food');
  const [categories, setCategories] = useState(['food', 'luxury', 'transport', 'health']);
  const [balance, setBalance] = useState(0);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const totalIncome = parseFloat(income) || 0;
    const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    setBalance(totalIncome - totalExpenses);
  }, [income, expenses]);

  const handleAddExpense = () => {
    if (!description || !category || !expenses.some(exp => exp.amount)) return;
    const amount = editIndex > -1 ? expenses[editIndex].amount : '';
    const newExpense = { description, category, amount: amount || 0 };
    
    if (editIndex > -1) {
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = newExpense;
      setExpenses(updatedExpenses);
      setEditIndex(-1);
    } else {
      setExpenses([...expenses, newExpense]);
    }
    setDescription('');
  };

  const handleRemoveExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleEditExpense = (index) => {
    const expenseToEdit = expenses[index];
    setDescription(expenseToEdit.description);
    setCategory(expenseToEdit.category);
    setEditIndex(index);
  };

  const handleIncomeChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setIncome(value);
  };

  const handleExpenseAmountChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    const updatedExpenses = [...expenses];
    updatedExpenses[index].amount = value;
    setExpenses(updatedExpenses);
  };

  return (
    <div className="p-4 max-w-lg mx-auto sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Budget Tracker</CardTitle>
          <CardDescription>Track your income and expenses.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Input 
              type="text" 
              placeholder="Enter Income" 
              value={income}
              onChange={handleIncomeChange}
              className="mb-4"
            />
            <Input 
              type="text" 
              placeholder="Description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Select value={category} onValueChange={setCategory}>
              {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
            </Select>
            <Button onClick={handleAddExpense}>
              {editIndex > -1 ? <EditIcon /> : <PlusIcon />} {editIndex > -1 ? 'Edit' : 'Add'} Expense
            </Button>
          </div>
          <div className="mt-4 space-y-2">
            {expenses.map((exp, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{exp.description} - {exp.category}</span>
                <div>
                  <Input 
                    type="text" 
                    value={exp.amount}
                    onChange={(e) => handleExpenseAmountChange(e, index)}
                    className="w-20 mr-2"
                  />
                  <Button variant="outline" size="icon" onClick={() => handleEditExpense(index)}>
                    <EditIcon />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleRemoveExpense(index)}>
                    <MinusIcon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xl font-bold">Balance: ${balance.toFixed(2)}</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function App() {
  return <BudgetTracker />;
}