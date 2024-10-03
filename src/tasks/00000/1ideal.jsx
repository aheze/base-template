import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FruitSelector = () => {
  const [selectedFruit, setSelectedFruit] = useState('');

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Fruit Selector 1ideal</CardTitle>
          <CardDescription>Choose your favorite fruit from the options below.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Selected fruit: {selectedFruit || 'no selection'}</p>
          <Select onValueChange={(value) => setSelectedFruit(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Apple">Apple</SelectItem>
              <SelectItem value="Banana">Banana</SelectItem>
              <SelectItem value="Strawberry">Strawberry</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
};

export default FruitSelector;