// Importing necessary components and hooks
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

// Stopwatch component to manage the stopwatch functionality
function Stopwatch() {
  // State for tracking elapsed time and stopwatch running state
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  // Effect to manage the interval for updating time
  useEffect(() => {
    let interval;
    if (running) {
      // Increment time every second when running
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!running) {
      // Clear interval when stopwatch is stopped
      clearInterval(interval);
    }
    // Cleanup interval when component unmounts or running state changes
    return () => clearInterval(interval);
  }, [running]);

  // Function to toggle the start/stop state
  const startStop = useCallback(() => {
    setRunning(!running);
  }, [running]);

  // Function to reset the stopwatch
  const reset = useCallback(() => {
    setRunning(false);
    setTime(0);
  }, []);

  // Helper function to format time as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0'); // Format minutes
    const seconds = (time % 60).toString().padStart(2, '0'); // Format seconds
    return `${minutes}:${seconds}`;
  };

  return (
    <Card className="sm:w-96 w-full mx-auto mt-10 shadow-lg">
      {/* Header Section */}
      <CardHeader className="text-center">
        <h1 className="text-4xl font-bold">Stopwatch</h1>
      </CardHeader>
      {/* Display Section */}
      <CardContent className="text-center">
        <div className="text-5xl mb-4 font-mono">{formatTime(time)}</div>
      </CardContent>
      {/* Controls Section */}
      <CardFooter className="flex justify-center space-x-4">
        {/* Start/Stop Button */}
        <Button onClick={startStop} variant={running ? "destructive" : "success"}>
          {running ? 'Stop' : 'Start'}
        </Button>
        {/* Reset Button */}
        <Button onClick={reset} variant="secondary">
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}

// Main Application Component
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Stopwatch />
    </div>
  );
}
