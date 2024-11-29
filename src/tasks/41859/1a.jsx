import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const TaskItem = ({ task, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-2 mb-2 bg-white rounded-md shadow-sm transition-all duration-300 hover:shadow-md">
      <span className="text-gray-800">{task}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 hover:bg-red-100"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask.trim()]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            To-Do List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <Input
              type="text"
              placeholder="Enter a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTask()}
              className="flex-grow mr-2"
            />
            <Button onClick={addTask}>Add Task</Button>
          </div>
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                onDelete={() => deleteTask(index)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}