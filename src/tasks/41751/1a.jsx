import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const PasswordOptions = ({ length, setLength, options, setOption }) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Password Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="password-length">Password Length</Label>
            <Slider value={[length]} onValueChange={(value) => setLength(value[0])} max={64} min={8} step={1} className="mt-2" />
            <Input 
              id="password-length" 
              type="number" 
              value={length} 
              onChange={(e) => setLength(Math.max(8, Math.min(64, Number(e.target.value))))} 
              className="mt-2 w-full"
            />
          </div>
          <div>
            {['uppercase', 'lowercase', 'numbers', 'special'].map(type => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={type} checked={options[type]} onCheckedChange={() => setOption(type, !options[type])} />
                <label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PasswordDisplay = ({ password, error }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Input value={password || ""} readOnly className="text-center" error={!!error} />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
};

const GenerateButton = ({ onGenerate, disabled }) => (
  <Button onClick={onGenerate} disabled={disabled}>Generate Password</Button>
);

function generatePassword(length, options) {
  const charset = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    special: '!@#$%^&*()_+~`|}{[]:;?><,./-='
  };
  let characters = '';
  for (let type in options) {
    if (options[type]) characters += charset[type];
  }
  if (!characters) return { password: '', error: 'Please select at least one character type.' };

  let password = '';
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return { password, error: '' };
}

export default function App() {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: false
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = useCallback(() => {
    const result = generatePassword(length, options);
    setPassword(result.password);
    setError(result.error);
  }, [length, options]);

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        alert("Password copied to clipboard!");
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  };

  const isGenerateDisabled = !Object.values(options).some(Boolean);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-8">
      <Card className="w-full max-w-lg">
        <CardTitle className="text-center mb-4">Random Password Generator</CardTitle>
        <PasswordOptions length={length} setLength={setLength} options={options} setOption={(type, val) => setOptions(prev => ({...prev, [type]: val}))} />
        <PasswordDisplay password={password} error={error} />
        <CardFooter className="flex justify-between">
          <GenerateButton onGenerate={handleGenerate} disabled={isGenerateDisabled} />
          <Button onClick={handleCopy} disabled={!password}>Copy</Button>
        </CardFooter>
      </Card>
    </div>
  );
}