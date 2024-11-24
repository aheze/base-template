import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const conditions = [
  "Diabetes", "Cardiac Issues", "Hypertension", "Anxiety/Stress", 
  "Sleep Disorders", "Arthritis", "Asthma/Respiratory Issues"
];

const App = () => {
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [customCondition, setCustomCondition] = useState('');
  const [medications, setMedications] = useState([]);
  const [dietPlan, setDietPlan] = useState('');

  useEffect(() => {
    // This is a placeholder. In a real app, fetch from API or database
    const fetchRecommendations = () => {
      if (selectedConditions.includes('Diabetes')) {
        setMedications(prev => [...prev, { name: 'Metformin', dosage: '500mg daily', sideEffects: 'Nausea, Diarrhea' }]);
        setDietPlan("Low-carb meals, high in fiber vegetables.");
      }
      // Add more conditions here...
    };
    fetchRecommendations();
  }, [selectedConditions]);

  const handleConditionChange = (condition) => {
    setSelectedConditions(prev => 
      prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
    );
  };

  const addCustomCondition = () => {
    if (customCondition && !selectedConditions.includes(customCondition)) {
      setSelectedConditions(prev => [...prev, customCondition]);
      setCustomCondition('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Health Companion</CardTitle>
          <CardDescription>Manage your health conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conditions.map(condition => (
              <Label key={condition} className="flex items-center">
                <Checkbox 
                  checked={selectedConditions.includes(condition)} 
                  onCheckedChange={() => handleConditionChange(condition)} 
                />
                <span className="ml-2">{condition}</span>
              </Label>
            ))}
            <Input 
              placeholder="Add custom condition" 
              value={customCondition}
              onChange={(e) => setCustomCondition(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomCondition()}
            />
            <Button onClick={addCustomCondition}>Add</Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => alert('Recommendations generated!')}>Get Recommendations</Button>
        </CardFooter>
      </Card>

      {medications.length > 0 && (
        <Card className="max-w-lg mx-auto mt-4">
          <CardHeader>
            <CardTitle>Medication Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            {medications.map((med, index) => (
              <div key={index} className="mb-2">
                <p><strong>{med.name}</strong> - {med.dosage}</p>
                <small>Side Effects: {med.sideEffects}</small>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {dietPlan && (
        <Card className="max-w-lg mx-auto mt-4">
          <CardHeader>
            <CardTitle>Diet Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{dietPlan}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default App;