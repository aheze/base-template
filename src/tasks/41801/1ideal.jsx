import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Component for the snippet form (Add/Edit Snippets)
const SnippetForm = ({ onSubmit, initialValues = {} }) => {
  const [snippet, setSnippet] = useState({
    title: "",
    code: "",
    language: "",
    description: "",
    category: "",
    ...initialValues,
  });

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSnippet((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(snippet);
    setSnippet({ title: "", code: "", language: "", description: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      {/* Input for Snippet Title */}
      <Input
        name="title"
        value={snippet.title}
        onChange={handleChange}
        placeholder="Snippet Title"
        className="mb-4"
      />
      {/* Textarea for Code */}
      <Textarea
        name="code"
        value={snippet.code}
        onChange={handleChange}
        placeholder="Code here..."
        className="mb-4 h-40 resize-none bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner"
      />
      {/* Input for Programming Language */}
      <Input
        name="language"
        value={snippet.language}
        onChange={handleChange}
        placeholder="Language"
        className="mb-4"
      />
      {/* Textarea for Description */}
      <Textarea
        name="description"
        value={snippet.description}
        onChange={handleChange}
        placeholder="Description"
        className="mb-4 h-24 resize-none bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner"
      />
      {/* Input for Category */}
      <Input
        name="category"
        value={snippet.category}
        onChange={handleChange}
        placeholder="Category"
        className="mb-4"
      />
      {/* Save Button */}
      <Button type="submit" className="bg-blue-500 hover:bg-blue-600 transition-colors">
        Save Snippet
      </Button>
    </form>
  );
};

// Component for displaying individual snippet cards
const SnippetCard = ({ snippet, onDelete, onEdit }) => (
  <Card className="mb-4 shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 bg-gradient-to-r from-gray-100 to-blue-50">
    <CardHeader>
      <CardTitle className="text-xl font-bold text-gray-700">{snippet.title}</CardTitle>
      <CardDescription className="text-sm text-gray-500">{snippet.language}</CardDescription>
    </CardHeader>
    <CardContent className="text-gray-700">{snippet.description}</CardContent>
    <CardFooter className="flex justify-between">
      {/* Edit Button */}
      <Button
        onClick={() => onEdit(snippet)}
        className="text-blue-600 hover:text-blue-800 transition-colors"
      >
        Edit
      </Button>
      {/* Delete Button */}
      <Button
        onClick={() => onDelete(snippet.id)}
        variant="destructive"
        className="text-red-600 hover:text-red-800 transition-colors"
      >
        Delete
      </Button>
    </CardFooter>
  </Card>
);

// Component for the search bar
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Input
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value); // Update search term in parent state
      }}
      placeholder="Search snippets..."
      className="mb-4"
    />
  );
};

// Main Application Component
export default function App() {
  const [snippets, setSnippets] = useState(() => {
    const savedSnippets = localStorage.getItem("snippets");
    return savedSnippets ? JSON.parse(savedSnippets) : [];
  });
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Save snippets to local storage whenever snippets state changes
  useEffect(() => {
    localStorage.setItem("snippets", JSON.stringify(snippets));
  }, [snippets]);

  // Add a new snippet
  const addSnippet = (newSnippet) => {
    setSnippets([...snippets, { ...newSnippet, id: Date.now() }]);
  };

  // Update an existing snippet
  const updateSnippet = (updatedSnippet) => {
    setSnippets(snippets.map((s) => (s.id === updatedSnippet.id ? updatedSnippet : s)));
  };

  // Delete a snippet
  const deleteSnippet = (id) => {
    setSnippets(snippets.filter((s) => s.id !== id));
  };

  // Filter snippets based on search term and selected filter
  const filteredSnippets = snippets
    .filter((snippet) =>
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.language.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((snippet) => !filter || snippet.language === filter);

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Code Snippet Manager
      </h1>
      {/* Form for Adding Snippets */}
      <SnippetForm onSubmit={addSnippet} />
      {/* Search Bar */}
      <SearchBar onSearch={setSearchTerm} />
      {/* Language Filter Dropdown */}
      <div className="mb-4">
        <Label className="block text-sm font-medium">Filter by Language:</Label>
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="mt-2 p-2 border rounded bg-white shadow-sm"
        >
          <option value="">All</option>
          {Array.from(new Set(snippets.map((s) => s.language))).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      {/* Display Snippet Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSnippets.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
            onDelete={deleteSnippet}
            onEdit={updateSnippet}
          />
        ))}
      </div>
    </div>
  );
}
