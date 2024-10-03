import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const initialCategories = ["Food", "Luxury", "Transport", "Health"];

const App = () => {
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState(initialCategories);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const handleAddTransaction = (type) => {
    const validIncome = parseFloat(income);
    const validExpense = parseFloat(expense);

    if (type === "income") {
      if (isNaN(validIncome) || validIncome <= 0) {
        alert("Please enter a valid income amount.");
        return;
      }

      const currentIncomeTransaction = transactions.find(t => t.type === "income");
      if (currentIncomeTransaction) {
        const updatedTransactions = transactions.map((transaction) =>
          transaction.type === "income"
            ? { ...transaction, amount: currentIncomeTransaction.amount + validIncome, description }
            : transaction
        );
        setTransactions(updatedTransactions);
        setBalance((prev) => prev + validIncome);
      } else {
        setTransactions((prev) => [
          ...prev,
          { type, amount: validIncome, description, category: "" },
        ]);
        setBalance(validIncome);
      }

      setIncome("");
      setDescription("");
    } else {
      if (isNaN(validExpense) || validExpense <= 0) {
        alert("Please enter a valid expense amount.");
        return;
      }
      if (balance === 0 && transactions.filter(t => t.type === "income").length === 0) {
        alert("Balance is zero. Please add income before adding expenses.");
        return;
      }
      if (!category) {
        alert("Please select a category for the expense.");
        return;
      }
      setTransactions((prev) => [
        ...prev,
        { type, amount: validExpense, description, category },
      ]);
      setExpense("");
      setDescription("");
      setBalance((prev) => prev - validExpense);
      if (validExpense > balance) {
        alert("Warning: Expense exceeds available balance.");
      }
    }
  };

  const handleRemoveTransaction = (index) => {
    const { amount, type } = transactions[index];
    if (type === "income") {
      setTransactions(transactions.filter((_, i) => i !== index));
      setBalance((prev) => prev - amount);
    } else {
      setTransactions(transactions.filter((_, i) => i !== index));
      setBalance((prev) => prev + amount);
    }
    if (index === editIndex) {
      setEditIndex(null);
      setEditAmount("");
    }
  };

  const handleEditTransaction = (index) => {
    const { amount } = transactions[index];
    setEditIndex(index);
    setEditAmount(amount);
  };

  const saveEditTransaction = () => {
    if (editIndex === null) return;

    const updatedTransactions = [...transactions];
    const { amount: oldAmount, type } = updatedTransactions[editIndex];
    const newAmount = parseFloat(editAmount);

    if (type === "income") {
      setBalance((prev) => prev - oldAmount + newAmount);
    } else {
      setBalance((prev) => prev + oldAmount - newAmount);
      if (newAmount > balance) {
        alert("Warning: Expense exceeds available balance.");
      }
    }

    updatedTransactions[editIndex].amount = newAmount;
    setTransactions(updatedTransactions);
    setEditIndex(null);
    setEditAmount("");
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      alert("Please enter a category.");
      return;
    }
    if (categories.some(cat => cat.toLowerCase() === newCategory.toLowerCase())) {
      alert("Category already exists.");
      setNewCategory("");
      return;
    }
    setCategories([...categories, newCategory]);
    setNewCategory("");
    setCategory("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardContent>
          <CardTitle className="text-center">Budget Tracker</CardTitle>
          <CardDescription className="text-center">
            Track your income and expenses
          </CardDescription>
          <div className="flex flex-col space-y-6 mt-4">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                required
              />
              <Button onClick={() => handleAddTransaction("income")}>
                Add Income
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Expense"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
                required
              />
            </div>
            {expense && (
              <>
                <Select onValueChange={setCategory} value={category}>
                  <SelectTrigger>
                    <span>{category || "Select Category"}</span>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat, index) => (
                      <SelectItem key={index} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <form onSubmit={handleAddCategory} className="flex space-x-2">
                  <Input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New Category"
                  />
                  <Button type="submit">Add Category</Button>
                </form>
                <Input
                  type="text"
                  placeholder="Description (Optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={() => handleAddTransaction("expense")}>
                  Add Expense
                </Button>
              </>
            )}
            <h2 className="font-bold mt-4">Income Transactions</h2>
            <ul className="space-y-2">
              {transactions
                .filter((t) => t.type === "income")
                .map((transaction, index) => (
                  <li key={index} className="flex justify-between">
                    <span>
                      Income: ${transaction.amount} {transaction.description}
                    </span>
                    <div className="flex space-x-2">
                      <Button onClick={() => handleEditTransaction(index)}>
                        Edit
                      </Button>
                      <Button onClick={() => handleRemoveTransaction(index)}>
                        Remove
                      </Button>
                    </div>
                  </li>
                ))}
            </ul>
            <h2 className="font-bold mt-4">Expense Transactions</h2>
            <ul className="space-y-2">
              {transactions
                .filter((t) => t.type === "expense")
                .map((transaction, index) => (
                  <li key={index} className="flex justify-between">
                    <span>
                      Expense: ${transaction.amount} {transaction.description} ({transaction.category})
                    </span>
                    <div className="flex space-x-2">
                      <Button onClick={() => handleEditTransaction(index + transactions.filter(t => t.type === "income").length)}>
                        Edit
                      </Button>
                      <Button onClick={() => handleRemoveTransaction(index + transactions.filter(t => t.type === "income").length)}>
                        Remove
                      </Button>
                    </div>
                  </li>
                ))}
            </ul>
            {editIndex !== null && (
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  placeholder="Edit Amount"
                />
                <Button onClick={saveEditTransaction}>
                  Save Edit
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="font-bold text-center">
            Total Balance: ${balance.toFixed(2)}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;