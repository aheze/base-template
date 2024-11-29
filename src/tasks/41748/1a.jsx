import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Mock data source for elements, replace with actual API or JSON file in real scenario
const elementsData = [
  { number: 1, name: 'Hydrogen', symbol: 'H', mass: 1.008, category: 'non-metal' },
  { number: 2, name: 'Helium', symbol: 'He', mass: 4.0026, category: 'noble-gas' },
  // ... add more elements here or fetch from an API
];

function ElementBox({ element, onClick }) {
  return (
    <div onClick={() => onClick(element)} className="cursor-pointer border p-2 text-center hover:bg-gray-100 transition-colors">
      <div className="text-xs">{element.number}</div>
      <div className="text-lg font-bold">{element.symbol}</div>
      <div className="text-xs">{element.name}</div>
    </div>
  );
}

function SearchBar({ onSearch }) {
  return (
    <Input 
      placeholder="Search by name, symbol, or number..." 
      onChange={(e) => onSearch(e.target.value.toLowerCase())} 
      className="mb-4"
    />
  );
}

function FilterButtons({ onFilter }) {
  const categories = ['all', 'metal', 'non-metal', 'noble-gas']; // Add more categories as needed
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map(category => (
        <Button key={category} onClick={() => onFilter(category)} variant={category === 'all' ? 'default' : 'outline'}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Button>
      ))}
    </div>
  );
}

function DetailsModal({ element, onClose }) {
  if (!element) return null;

  return (
    <Dialog open={!!element} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{element.name} ({element.symbol})</DialogTitle>
          <DialogDescription>
            Atomic Number: {element.number}, Mass: {element.mass}
          </DialogDescription>
        </DialogHeader>
        <CardContent>
          {/* Add more details here */}
        </CardContent>
      </DialogContent>
    </Dialog>
  );
}

export default function App() {
  const [elements, setElements] = useState(elementsData);
  const [filteredElements, setFilteredElements] = useState(elementsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const results = elements.filter(element => 
      element.name.toLowerCase().includes(searchTerm) ||
      element.symbol.toLowerCase().includes(searchTerm) ||
      element.number.toString().includes(searchTerm)
    );
    setFilteredElements(filter === 'all' ? results : results.filter(e => e.category === filter));
  }, [searchTerm, elements, filter]);

  return (
    <div className="p-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Interactive Periodic Table</h1>
      <SearchBar onSearch={setSearchTerm} />
      <FilterButtons onFilter={setFilter} />
      <div className="grid grid-cols-18 gap-1 sm:grid-cols-18">
        {filteredElements.map(element => (
          <ElementBox key={element.number} element={element} onClick={setSelectedElement} />
        ))}
      </div>
      <DetailsModal element={selectedElement} onClose={() => setSelectedElement(null)} />
    </div>
  );
}