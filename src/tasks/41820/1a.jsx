import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const TimerDisplay = ({ time }) => (
  <div className="text-6xl font-bold text-center mb-8">{formatTime(time)}</div>
);

const ControlButton = ({ onClick, disabled, children }) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    className="w-full sm:w-auto px-8 py-2 text-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    {children}
  </Button>
);

export default function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Stopwatch App
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TimerDisplay time={time} />
          <div className="flex flex-col sm:flex-row gap-4">
            <ControlButton onClick={handleStart} disabled={isRunning}>
              Start
            </ControlButton>
            <ControlButton onClick={handleStop} disabled={!isRunning}>
              Stop
            </ControlButton>
            <ControlButton onClick={handleReset}>Reset</ControlButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}