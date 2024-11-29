import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SnippetForm = ({ onSubmit, initialValues = {} }) => {
  const [snippet, setSnippet] = useState({ 
    title: '', 
    code: '', 
    language: '', 
    description: '', 
    category: '',
    ...initialValues 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSnippet(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(snippet);
    setSnippet({ title: '', code: '', language: '', description: '', category: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input 
        name="title" 
        value={snippet.title} 
        onChange={handleChange} 
        placeholder="Snippet Title" 
        className="mb-4"
      />
      <Textarea 
        name="code" 
        value={snippet.code} 
        onChange={handleChange} 
        placeholder="Code here..." 
        className="mb-4 h-40"
      />
      <Input 
        name="language" 
        value={snippet.language} 
        onChange={handleChange} 
        placeholder="Language" 
        className="mb-4"
      />
      <Textarea 
        name="description" 
        value={snippet.description} 
        onChange={handleChange} 
        placeholder="Description" 
        className="mb-4 h-24"
      />
      <Input 
        name="category" 
        value={snippet.category} 
        onChange={handleChange} 
        placeholder="Category" 
        className="mb-4"
      />
      <Button type="submit">Save Snippet</Button>
    </form>
  );
};

const SnippetCard = ({ snippet, onDelete, onEdit }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>{snippet.title}</CardTitle>
      <CardDescription>{snippet.language}</CardDescription>
    </CardHeader>
    <CardContent>{snippet.description}</CardContent>
    <CardFooter className="flex justify-between">
      <Button onClick={() => onEdit(snippet)}>Edit</Button>
      <Button onClick={() => onDelete(snippet.id)} variant="destructive">Delete</Button>
    </CardFooter>
  </Card>
);

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Input 
      value={searchTerm} 
      onChange={(e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
      }} 
      placeholder="Search snippets..." 
      className="mb-4"
    />
  );
};

export default function App() {
  const [snippets, setSnippets] = useState(() => {
    const savedSnippets = localStorage.getItem('snippets');
    return savedSnippets ? JSON.parse(savedSnippets) : [];
  });
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('snippets', JSON.stringify(snippets));
  }, [snippets]);

  const addSnippet = (newSnippet) => {
    setSnippets([...snippets, { ...newSnippet, id: Date.now() }]);
  };

  const updateSnippet = (updatedSnippet) => {
    setSnippets(snippets.map(s => s.id === updatedSnippet.id ? updatedSnippet : s));
  };

  const deleteSnippet = (id) => {
    setSnippets(snippets.filter(s => s.id !== id));
  };

  const filteredSnippets = snippets.filter(snippet => 
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snippet.language.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(snippet => !filter || snippet.language === filter);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Code Snippet Manager</h1>
      <SnippetForm onSubmit={addSnippet} />
      <SearchBar onSearch={setSearchTerm} />
      <div className="mb-4">
        <Label>Filter by Language:</Label>
        <select 
          onChange={(e) => setFilter(e.target.value)} 
          value={filter}
          className="mt-2 p-2 border rounded"
        >
          <option value="">All</option>
          {Array.from(new Set(snippets.map(s => s.language))).map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSnippets.map(snippet => (
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