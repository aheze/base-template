import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const NoteItem = ({ note, onDelete }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>{note.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="mb-2">{note.body}</p>
      <div className="flex flex-wrap gap-2">
        {note.tags.map((tag, index) => (
          <Badge key={index} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
      <Button
        variant="destructive"
        className="mt-4"
        onClick={() => onDelete(note.id)}
      >
        Delete
      </Button>
    </CardContent>
  </Card>
);

const NoteList = ({ notes, onDelete }) => (
  <div className="space-y-4">
    {notes.map((note) => (
      <NoteItem key={note.id} note={note} onDelete={onDelete} />
    ))}
  </div>
);

const AddNoteForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      onAdd({
        id: Date.now(),
        title,
        body,
        tags: tags.split(",").map((tag) => tag.trim()),
      });
      setTitle("");
      setBody("");
      setTags("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Note body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Input
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <Button type="submit">Add Note</Button>
    </form>
  );
};

const SearchBar = ({ onSearch }) => (
  <Input
    placeholder="Search notes..."
    onChange={(e) => onSearch(e.target.value)}
    className="mb-4"
  />
);

export default function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm) ||
      note.body.toLowerCase().includes(searchTerm) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Notes App</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Note</h2>
          <AddNoteForm onAdd={addNote} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Notes</h2>
          <SearchBar onSearch={handleSearch} />
          <NoteList notes={filteredNotes} onDelete={deleteNote} />
        </div>
      </div>
    </div>
  );
}