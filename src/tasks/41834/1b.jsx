import React, { useState, useEffect, useReducer } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Initial state for notes
const initialNotes = JSON.parse(localStorage.getItem('notes') || '[]');

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      const newNotes = [...state, action.payload];
      localStorage.setItem('notes', JSON.stringify(newNotes));
      return newNotes;
    case 'DELETE_NOTE':
      const updatedNotes = state.filter(note => note.id !== action.payload);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      return updatedNotes;
    default:
      return state;
  }
};

function NoteItem({ note, dispatch }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{note.body}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {note.tags.map(tag => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <Button onClick={() => dispatch({ type: 'DELETE_NOTE', payload: note.id })} variant="destructive">
        Delete
      </Button>
    </Card>
  );
}

function AddNoteForm({ dispatch }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      dispatch({
        type: 'ADD_NOTE',
        payload: {
          id: Date.now(),
          title,
          body,
          tags: tags.split(',').map(t => t.trim()).filter(t => t),
        }
      });
      setTitle('');
      setBody('');
      setTags('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="body">Body</Label>
        <Input id="body" value={body} onChange={e => setBody(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input id="tags" value={tags} onChange={e => setTags(e.target.value)} />
      </div>
      <Button type="submit">Add Note</Button>
    </form>
  );
}

function SearchBar({ onSearch }) {
  return (
    <div className="mb-4">
      <Input 
        type="text" 
        placeholder="Search notes..." 
        onChange={(e) => onSearch(e.target.value)} 
      />
    </div>
  );
}

function NoteList({ notes, dispatch }) {
  return (
    <div>
      {notes.map(note => (
        <NoteItem key={note.id} note={note} dispatch={dispatch} />
      ))}
    </div>
  );
}

export default function App() {
  const [notes, dispatch] = useReducer(notesReducer, initialNotes);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) {
      savedNotes.forEach(note => dispatch({ type: 'ADD_NOTE', payload: note }));
    }
  }, []);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.body.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Notes App</h1>
      <SearchBar onSearch={setSearchTerm} />
      <AddNoteForm dispatch={dispatch} />
      <NoteList notes={filteredNotes} dispatch={dispatch} />
    </div>
  );
}