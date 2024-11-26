import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";

const PasswordOptions = ({ length, setLength, options, setOptions }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Password Length: {length}</label>
        <Slider
          value={[length]}
          onValueChange={([value]) => setLength(value)}
          max={64}
          min={8}
          step={1}
          className="mt-2"
        />
      </div>
      {Object.entries(options).map(([key, value]) => (
        <div key={key} className="flex items-center space-x-2">
          <Checkbox
            id={key}
            checked={value}
            onCheckedChange={(checked) => setOptions({ ...options, [key]: checked })}
          />
          <label htmlFor={key} className="text-sm font-medium capitalize">
            {key}
          </label>
        </div>
      ))}
    </div>
  );
};

const PasswordDisplay = ({ password, copyToClipboard }) => {
  return (
    <div className="flex items-center space-x-2">
      <Input value={password} readOnly className="flex-grow" />
      <Button onClick={copyToClipboard}>Copy</Button>
    </div>
  );
};

const PasswordStrengthIndicator = ({ strength }) => {
  const getColor = () => {
    if (strength < 3) return "bg-red-500";
    if (strength < 5) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="mt-4">
      <div className="text-sm font-medium mb-1">Password Strength</div>
      <div className="h-2 w-full bg-gray-200 rounded-full">
        <div
          className={`h-full rounded-full ${getColor()}`}
          style={{ width: `${(strength / 6) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default function App() {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const generatePassword = () => {
    const charset = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    };

    const selectedOptions = Object.entries(options).filter(([, value]) => value);

    if (selectedOptions.length === 0) {
      setError("Please select at least one character type");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const [option] = selectedOptions[Math.floor(Math.random() * selectedOptions.length)];
      generatedPassword += charset[option].charAt(Math.floor(Math.random() * charset[option].length));
    }

    setPassword(generatedPassword);
    setError("");
    setHistory([generatedPassword, ...history.slice(0, 4)]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  const calculateStrength = () => {
    let strength = 0;
    if (password.length >= 12) strength += 2;
    else if (password.length >= 8) strength += 1;
    if (options.uppercase) strength += 1;
    if (options.lowercase) strength += 1;
    if (options.numbers) strength += 1;
    if (options.symbols) strength += 1;
    return strength;
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"}`}>
      <div className="container mx-auto px-4 py-8">
        <Card className={`w-full max-w-md mx-auto ${darkMode ? "bg-gray-800" : ""}`}>
          <CardHeader>
            <CardTitle>Random Password Generator</CardTitle>
            <CardDescription>Generate secure passwords with ease</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <PasswordOptions length={length} setLength={setLength} options={options} setOptions={setOptions} />
            <Button onClick={generatePassword} className="w-full">
              Generate Password
            </Button>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {password && (
              <>
                <PasswordDisplay password={password} copyToClipboard={copyToClipboard} />
                <PasswordStrengthIndicator strength={calculateStrength()} />
              </>
            )}
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <div className="w-full">
              <h3 className="text-sm font-medium mb-2">Password History</h3>
              <ul className="space-y-1">
                {history.map((pass, index) => (
                  <li key={index} className="text-sm truncate">
                    {pass}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              <label htmlFor="dark-mode" className="text-sm font-medium">
                Dark Mode
              </label>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}