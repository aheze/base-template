import React, { useState } from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription,
  Input, Button, Select, SelectItem, Label
} from "@/components/ui";

const categories = ["Food", "Luxury", "Transportation", "Housing", "Entertainment", "Other"];

function BudgetApp() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    const newExpense = {
      amount: parseFloat(e.target.expense.value),
      description: description,
      category: category
    };

    if (editIndex !== null) {
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = newExpense;
      setExpenses(updatedExpenses);
      setEditIndex(null);
    } else {
      setExpenses([...expenses, newExpense]);
    }

    // Reset form
    setDescription('');
    setCategory(categories[0]);
  };

  const validateInput = () => {
    if (!income || isNaN(parseFloat(income))) {
      alert('Please enter a valid income.');
      return false;
    }
    return true;
  };

  const handleEdit = (index) => {
    const expenseToEdit = expenses[index];
    setDescription(expenseToEdit.description);
    setCategory(expenseToEdit.category);
    setEditIndex(index);
  };

  const handleRemove = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = parseFloat(income) - totalExpenses;

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Set Income</CardTitle>
        </CardHeader>
        <CardContent>
          <Input 
            type="number" 
            value={income} 
            onChange={(e) => setIncome(e.target.value)} 
            placeholder="Enter your income" 
            className="mb-2"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input 
              name="expense" 
              type="number" 
              placeholder="Expense Amount" 
              className="mb-2"
              required
            />
            <Input 
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Description" 
              className="mb-2"
            />
            <Select value={category} onChange={(value) => setCategory(value)}>
              {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
            </Select>
            <Button type="submit" className="mt-2">
              {editIndex !== null ? 'Update Expense' : 'Add Expense'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-4">
        <h2 className="text-xl font-bold">Expenses</h2>
        {expenses.map((expense, index) => (
          <Card key={index} className="my-2">
            <CardContent>
              <p><strong>Amount:</strong> ${expense.amount}</p>
              <p><strong>Description:</strong> {expense.description}</p>
              <p><strong>Category:</strong> {expense.category}</p>
              <Button variant="outline" size="sm" onClick={() => handleEdit(index)}>Edit</Button>
              <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleRemove(index)}>Remove</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <CardContent>
          <CardTitle>Summary</CardTitle>
          <p><strong>Total Income:</strong> ${income}</p>
          <p><strong>Total Expenses:</strong> ${totalExpenses.toFixed(2)}</p>
          <p><strong>Balance:</strong> ${balance.toFixed(2)}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function App() {
  return <BudgetApp />;
}