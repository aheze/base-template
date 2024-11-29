import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const languages = ["JavaScript", "Python", "Java", "C++", "Ruby", "Other"];

const SnippetForm = ({ onSave, editingSnippet, onCancel }) => {
  const [title, setTitle] = useState(editingSnippet?.title || "");
  const [code, setCode] = useState(editingSnippet?.code || "");
  const [language, setLanguage] = useState(editingSnippet?.language || "");
  const [description, setDescription] = useState(editingSnippet?.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: editingSnippet?.id || Date.now(), title, code, language, description });
    setTitle("");
    setCode("");
    setLanguage("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Snippet Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Code Snippet"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        className="font-mono"
      />
      <Select value={language} onValueChange={setLanguage} required>
        <SelectTrigger>
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex space-x-2">
        <Button type="submit">{editingSnippet ? "Update" : "Save"} Snippet</Button>
        {editingSnippet && <Button onClick={onCancel} variant="outline">Cancel</Button>}
      </div>
    </form>
  );
};

const SnippetCard = ({ snippet, onEdit, onDelete }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{snippet.title}</CardTitle>
        <CardDescription>{snippet.language}</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
          <code>{snippet.code}</code>
        </pre>
        <p className="mt-2">{snippet.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => onEdit(snippet)} variant="outline">Edit</Button>
        <Button onClick={() => onDelete(snippet.id)} variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
  );
};

const SearchBar = ({ onSearch, onFilterChange }) => {
  return (
    <div className="flex space-x-2 mb-4">
      <Input
        placeholder="Search snippets..."
        onChange={(e) => onSearch(e.target.value)}
        className="flex-grow"
      />
      <Select onValueChange={onFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Languages</SelectItem>
          {languages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default function App() {
  const [snippets, setSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [editingSnippet, setEditingSnippet] = useState(null);

  useEffect(() => {
    const savedSnippets = JSON.parse(localStorage.getItem("snippets") || "[]");
    setSnippets(savedSnippets);
  }, []);

  useEffect(() => {
    localStorage.setItem("snippets", JSON.stringify(snippets));
  }, [snippets]);

  const handleSaveSnippet = (snippet) => {
    if (editingSnippet) {
      setSnippets(snippets.map((s) => (s.id === snippet.id ? snippet : s)));
      setEditingSnippet(null);
    } else {
      setSnippets([...snippets, snippet]);
    }
  };

  const handleDeleteSnippet = (id) => {
    setSnippets(snippets.filter((snippet) => snippet.id !== id));
  };

  const handleEditSnippet = (snippet) => {
    setEditingSnippet(snippet);
  };

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = filterLanguage ? snippet.language === filterLanguage : true;
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Code Snippet Manager</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New Snippet</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSnippet ? "Edit Snippet" : "Add New Snippet"}</DialogTitle>
          </DialogHeader>
          <SnippetForm
            onSave={(snippet) => {
              handleSaveSnippet(snippet);
              setEditingSnippet(null);
            }}
            editingSnippet={editingSnippet}
            onCancel={() => setEditingSnippet(null)}
          />
        </DialogContent>
      </Dialog>
      <SearchBar
        onSearch={setSearchTerm}
        onFilterChange={setFilterLanguage}
      />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredSnippets.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
            onEdit={handleEditSnippet}
            onDelete={handleDeleteSnippet}
          />
        ))}
      </div>
    </div>
  );
}