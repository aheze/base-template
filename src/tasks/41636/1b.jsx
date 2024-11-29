import React, { useState } from 'react';
import { Button, Input, Select, SelectItem, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const conditions = {
  diabetes: { drugs: ['Metformin', 'Insulin'], tips: 'Manage blood sugar through diet and exercise.' },
  hypertension: { drugs: ['ACE inhibitors', 'Beta-blockers'], tips: 'Reduce salt intake and manage stress.' },
  constipation: { drugs: ['Laxatives', 'Fiber supplements'], tips: 'Increase water intake and dietary fiber.' },
  tuberculosis: { drugs: ['Isoniazid', 'Rifampin'], tips: 'Complete the full course of treatment.' },
  sore_throat: { drugs: ['Lozenges', 'NSAIDs'], tips: 'Stay hydrated and rest your voice.' }
};

function DrugInfo({ drug, onClose }) {
  const [info, setInfo] = useState({ dosage: '', sideEffects: '', contraindications: '' });

  // Placeholder for dynamic drug info fetching
  const fetchDrugInfo = () => {
    // Simulate API call with static data
    setInfo({
      dosage: 'Take twice daily',
      sideEffects: 'Possible dizziness',
      contraindications: 'Not for use with alcohol'
    });
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>{drug}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Dosage: {info.dosage}</p>
        <p>Side Effects: {info.sideEffects}</p>
        <p>Contraindications: {info.contraindications}</p>
        <Button onClick={onClose}>Close</Button>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [showDrugInfo, setShowDrugInfo] = useState(false);
  const [currentDrug, setCurrentDrug] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCondition) {
      setShowDrugInfo(true);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Mini Medical Assistant</CardTitle>
          <CardDescription>Enter your symptoms or select a condition.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Select value={selectedCondition} onChange={(e) => setSelectedCondition(e.target.value)}>
              <SelectItem value="">Select a condition</SelectItem>
              {Object.keys(conditions).map(condition => 
                <SelectItem key={condition} value={condition}>{condition.replace('_', ' ')}</SelectItem>
              )}
            </Select>
            <Input 
              type="text" 
              placeholder="Or type your symptoms here" 
              value={symptoms} 
              onChange={(e) => setSymptoms(e.target.value)} 
              className="mt-2"
            />
            <Button type="submit" className="mt-4">Get Advice</Button>
          </form>
          {showDrugInfo && conditions[selectedCondition].drugs.map(drug => 
            <Button key={drug} onClick={() => {setCurrentDrug(drug); setShowDrugInfo(true);}} className="mt-2">
              {drug}
            </Button>
          )}
          {showDrugInfo && <DrugInfo drug={currentDrug} onClose={() => setShowDrugInfo(false)} />}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Disclaimer: This app provides general information only. Always consult with a healthcare professional for medical advice.</p>
        </CardFooter>
      </Card>
    </div>
  );
}