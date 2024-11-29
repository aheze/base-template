import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const InitialsDisplay = ({ initials }) => (
  <div className="flex items-center justify-center w-24 h-24 bg-primary text-primary-foreground rounded-full text-4xl font-bold animate-fade-in">
    {initials}
  </div>
);

const ErrorMessage = ({ message }) => (
  <Alert variant="destructive" className="mt-4">
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

export default function App() {
  const [fullName, setFullName] = useState("");
  const [initials, setInitials] = useState("");
  const [error, setError] = useState("");

  const generateInitials = () => {
    setError("");
    if (!fullName.trim()) {
      setError("Please enter a valid name");
      setInitials("");
      return;
    }

    const names = fullName.trim().split(/\s+/);
    const generatedInitials = names
      .map((name) => name[0])
      .join("")
      .toUpperCase();

    setInitials(generatedInitials);
  };

  const resetForm = () => {
    setFullName("");
    setInitials("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Name Initials Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full"
            />
            <div className="flex space-x-2">
              <Button onClick={generateInitials} className="flex-1">
                Generate Initials
              </Button>
              <Button onClick={resetForm} variant="outline" className="flex-1">
                Reset
              </Button>
            </div>
            {initials && (
              <div className="flex justify-center mt-6">
                <InitialsDisplay initials={initials} />
              </div>
            )}
            {error && <ErrorMessage message={error} />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}