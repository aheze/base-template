import React, { useState, useEffect } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Input, Button, Switch, Alert, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";

const medicalTerms = [
  { term: "Hypertension", definition: "High blood pressure, which can lead to heart disease." },
  { term: "Antibiotics", definition: "Drugs used to treat bacterial infections." },
  // More terms can be added here
];

const healthTips = [
  "Stay hydrated by drinking at least 8 glasses of water daily.",
  "Regular exercise can significantly reduce the risk of chronic diseases."
  // More tips can be added here
];

function MedicalDictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [foundTerm, setFoundTerm] = useState(null);

  const handleSearch = () => {
    const result = medicalTerms.find(term => term.term.toLowerCase() === searchTerm.toLowerCase());
    setFoundTerm(result || { term: 'Not Found', definition: 'No definition available.' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Dictionary</CardTitle>
      </CardHeader>
      <CardContent>
        <Input 
          placeholder="Search for a medical term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <Button onClick={handleSearch}>Search</Button>
        {foundTerm && (
          <div className="mt-4">
            <h3>{foundTerm.term}</h3>
            <p>{foundTerm.definition}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SymptomChecker() {
  const [open, setOpen] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Symptom Checker</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Symptom Checker</DialogTitle>
          <DialogDescription>
            Enter your symptoms. Remember, this is for educational purposes only.
          </DialogDescription>
        </DialogHeader>
        <Input 
          placeholder="Enter symptoms separated by commas"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="mb-4"
        />
        <Button onClick={() => setOpen(false)}>Check</Button>
      </DialogContent>
    </Dialog>
  );
}

function HealthCalculators() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // Convert cm to m
    const w = parseFloat(weight);
    if (h && w) {
      setBMI((w / (h * h)).toFixed(2));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Input 
          type="number" 
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="mb-2"
        />
        <Input 
          type="number" 
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="mb-4"
        />
        <Button onClick={calculateBMI}>Calculate BMI</Button>
        {bmi && <p className="mt-2">Your BMI is: {bmi}</p>}
      </CardContent>
    </Card>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % healthTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("min-h-screen p-4 sm:p-8", darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900")}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">MediLearn</h1>
        <Switch checked={darkMode} onCheckedChange={() => setDarkMode(!darkMode)}>Dark Mode</Switch>
      </div>
      
      <MedicalDictionary />
      
      <div className="mt-4">
        <SymptomChecker />
      </div>

      <div className="mt-4">
        <HealthCalculators />
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Daily Health Tip</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{healthTips[currentTipIndex]}</p>
        </CardContent>
      </Card>

      <Alert className="mt-4">
        <Alert.Title>Disclaimer</Alert.Title>
        <Alert.Description>
          This app is for educational purposes only. It does not provide medical advice.
        </Alert.Description>
      </Alert>
    </div>
  );
}

export default App;