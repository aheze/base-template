import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const periodicTableData = [
  { symbol: "H", name: "Hydrogen", number: 1, category: "Non-metal" },
  { symbol: "He", name: "Helium", number: 2, category: "Noble Gas" },
  { symbol: "Li", name: "Lithium", number: 3, category: "Alkali Metal" },
  { symbol: "Be", name: "Beryllium", number: 4, category: "Alkaline Earth Metal" },
  { symbol: "B", name: "Boron", number: 5, category: "Metalloid" },
  { symbol: "C", name: "Carbon", number: 6, category: "Non-metal" },
  { symbol: "N", name: "Nitrogen", number: 7, category: "Non-metal" },
  { symbol: "O", name: "Oxygen", number: 8, category: "Non-metal" },
  { symbol: "F", name: "Fluorine", number: 9, category: "Halogen" },
  { symbol: "Ne", name: "Neon", number: 10, category: "Noble Gas" },
  // Add more elements as needed
];

const ElementBox = ({ element, onClick }) => (
  <Button
    className="w-16 h-16 m-1 flex flex-col items-center justify-center text-xs"
    onClick={() => onClick(element)}
  >
    <span className="font-bold">{element.symbol}</span>
    <span>{element.number}</span>
  </Button>
);

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-4">
      <Input
        type="text"
        placeholder="Search elements..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

const FilterSelect = ({ onFilter }) => (
  <Select onValueChange={onFilter}>
    <SelectTrigger className="w-[180px] mb-4">
      <SelectValue placeholder="Filter by category" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All</SelectItem>
      <SelectItem value="Non-metal">Non-metal</SelectItem>
      <SelectItem value="Noble Gas">Noble Gas</SelectItem>
      <SelectItem value="Alkali Metal">Alkali Metal</SelectItem>
      <SelectItem value="Alkaline Earth Metal">Alkaline Earth Metal</SelectItem>
      <SelectItem value="Metalloid">Metalloid</SelectItem>
      <SelectItem value="Halogen">Halogen</SelectItem>
    </SelectContent>
  </Select>
);

const ElementDetails = ({ element, onClose }) => (
  <Dialog open={!!element} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{element?.name}</DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <p><strong>Symbol:</strong> {element?.symbol}</p>
        <p><strong>Atomic Number:</strong> {element?.number}</p>
        <p><strong>Category:</strong> {element?.category}</p>
        {/* Add more details as needed */}
      </div>
    </DialogContent>
  </Dialog>
);

const PeriodicTable = ({ elements, onElementClick }) => (
  <div className="grid grid-cols-10 gap-1 sm:grid-cols-18">
    {elements.map((element) => (
      <ElementBox key={element.symbol} element={element} onClick={onElementClick} />
    ))}
  </div>
);

export default function App() {
  const [elements, setElements] = useState(periodicTableData);
  const [selectedElement, setSelectedElement] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Simulating API call or JSON file loading
    setElements(periodicTableData);
  }, []);

  const handleSearch = (query) => {
    const filtered = periodicTableData.filter(
      (element) =>
        element.name.toLowerCase().includes(query.toLowerCase()) ||
        element.symbol.toLowerCase().includes(query.toLowerCase()) ||
        element.number.toString().includes(query)
    );
    setElements(filtered);
  };

  const handleFilter = (category) => {
    setFilter(category);
    if (category === "all") {
      setElements(periodicTableData);
    } else {
      const filtered = periodicTableData.filter(
        (element) => element.category === category
      );
      setElements(filtered);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4">Periodic Table</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchBar onSearch={handleSearch} />
          <FilterSelect onFilter={handleFilter} />
          <PeriodicTable elements={elements} onElementClick={setSelectedElement} />
          <ElementDetails element={selectedElement} onClose={() => setSelectedElement(null)} />
        </CardContent>
      </Card>
    </div>
  );
}