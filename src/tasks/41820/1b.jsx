import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const startStop = useCallback(() => {
    setRunning(!running);
  }, [running]);

  const reset = useCallback(() => {
    setRunning(false);
    setTime(0);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <Card className="sm:w-96 w-full mx-auto mt-10 shadow-lg">
      <CardHeader className="text-center">
        <h1 className="text-4xl font-bold">Stopwatch</h1>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-5xl mb-4 font-mono">{formatTime(time)}</div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        <Button onClick={startStop} variant={running ? "destructive" : "success"}>
          {running ? 'Stop' : 'Start'}
        </Button>
        <Button onClick={reset} variant="secondary">
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Stopwatch />
    </div>
  );
}