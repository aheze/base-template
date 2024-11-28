import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";

function Task({ task, onDelete }) {
  return (
    <Card className="mb-4 transition-all duration-300 transform hover:scale-105">
      <CardHeader>
        <CardTitle>{task.text}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button variant="destructive" size="icon" onClick={() => onDelete(task.id)}>
          <Trash className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { id: Date.now(), text: taskInput.trim() }]);
      setTaskInput('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 flex flex-col items-center">
      <div className="max-w-lg w-full">
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>My To-Do List</CardTitle>
            <CardDescription>Add and manage your tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input 
                value={taskInput} 
                onChange={e => setTaskInput(e.target.value)} 
                placeholder="Enter a new task"
                className="flex-grow"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') addTask();
                }}
              />
              <Button onClick={addTask}>Add Task</Button>
            </div>
          </CardContent>
        </Card>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 p-4">No tasks yet. Add one!</p>
        ) : (
          tasks.map(task => (
            <Task key={task.id} task={task} onDelete={deleteTask} />
          ))
        )}
      </div>

      {/* Mobile responsiveness check */}
      <div className="sm:hidden mt-4 text-sm text-gray-600">
        This app is responsive. Try it on a mobile device!
      </div>
    </div>
  );
}