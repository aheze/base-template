import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock dataset of 50 periodic elements
const periodicTableData = [
  { atomicNumber: 1, symbol: "H", name: "Hydrogen", atomicMass: 1.008, category: "non-metal", electronConfig: "1s1" },
  { atomicNumber: 2, symbol: "He", name: "Helium", atomicMass: 4.0026, category: "noble gas", electronConfig: "1s2" },
  { atomicNumber: 3, symbol: "Li", name: "Lithium", atomicMass: 6.94, category: "alkali metal", electronConfig: "[He] 2s1" },
  { atomicNumber: 4, symbol: "Be", name: "Beryllium", atomicMass: 9.0122, category: "alkaline earth metal", electronConfig: "[He] 2s2" },
  { atomicNumber: 5, symbol: "B", name: "Boron", atomicMass: 10.81, category: "metalloid", electronConfig: "[He] 2s2 2p1" },
  { atomicNumber: 6, symbol: "C", name: "Carbon", atomicMass: 12.011, category: "non-metal", electronConfig: "[He] 2s2 2p2" },
  { atomicNumber: 7, symbol: "N", name: "Nitrogen", atomicMass: 14.007, category: "non-metal", electronConfig: "[He] 2s2 2p3" },
  { atomicNumber: 8, symbol: "O", name: "Oxygen", atomicMass: 15.999, category: "non-metal", electronConfig: "[He] 2s2 2p4" },
  { atomicNumber: 9, symbol: "F", name: "Fluorine", atomicMass: 18.998, category: "halogen", electronConfig: "[He] 2s2 2p5" },
  { atomicNumber: 10, symbol: "Ne", name: "Neon", atomicMass: 20.180, category: "noble gas", electronConfig: "[He] 2s2 2p6" },
  // Add 40 more elements here...
];

// Reusable component to display a single element
const ElementBox = ({ element, onClick }) => (
  <button
    className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center border rounded-md bg-gradient-to-br from-indigo-100 to-indigo-200 hover:from-indigo-200 hover:to-indigo-300 text-sm font-semibold shadow-md transform hover:scale-105 transition"
    onClick={() => onClick(element)}
  >
    {element.symbol}
  </button>
);

// Modal to show details of a selected element
const DetailsModal = ({ element, onClose }) => {
  if (!element) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96 transform transition duration-300 scale-105">
        <Card>
          <CardHeader>
            <CardTitle>{element.name}</CardTitle>
            <CardDescription>Atomic Number: {element.atomicNumber}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Symbol: {element.symbol}</p>
            <p>Atomic Mass: {element.atomicMass}</p>
            <p>Electron Configuration: {element.electronConfig}</p>
            <p>Category: {element.category}</p>
            {/* Simulated chart with atomic mass */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-1">Atomic Mass Visualization:</p>
              <div className="relative bg-gray-200 rounded-full h-4">
                <div
                  className="absolute top-0 left-0 h-4 rounded-full bg-indigo-500"
                  style={{
                    width: `${(element.atomicMass / 300) * 100}%`,
                    transition: "width 0.5s ease",
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <button className="text-indigo-500 hover:underline" onClick={onClose}>
              Close
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

// PeriodicTable grid layout
const PeriodicTable = ({ elements, onElementClick }) => (
  <div className="grid grid-cols-10 gap-2 sm:gap-4 mt-6">
    {elements.map((element) => (
      <ElementBox key={element.atomicNumber} element={element} onClick={onElementClick} />
    ))}
  </div>
);

// Search bar for filtering elements
const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <div className="mb-6">
    <input
      type="text"
      placeholder="Search by name, symbol, or atomic number..."
      className="w-full p-3 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
);

// Main application component
const App = () => {
  const [selectedElement, setSelectedElement] = useState(null); // State for selected element
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Filter elements based on the search query
  const filteredElements = periodicTableData.filter(
    (el) =>
      el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.atomicNumber.toString().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-600 mb-6">
        Interactive Periodic Table
      </h1>
      {/* Search bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* Periodic table */}
      <PeriodicTable elements={filteredElements} onElementClick={setSelectedElement} />
      {/* Modal to display element details */}
      <DetailsModal element={selectedElement} onClose={() => setSelectedElement(null)} />
    </div>
  );
};

export default App;
