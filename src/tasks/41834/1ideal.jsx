import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const App = () => {
  // State for managing notes, search query, and new note form
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newNote, setNewNote] = useState({ title: "", body: "", tags: "" });

  // Load notes from local storage when the app initializes
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  // Save notes to local storage whenever the notes array changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Function to add a new note
  const addNote = () => {
    if (!newNote.title || !newNote.body) return; // Validate required fields
    const tagsArray = newNote.tags.split(",").map((tag) => tag.trim()); // Convert tags string to array
    const newNoteData = { ...newNote, tags: tagsArray, id: Date.now() }; // Create note object
    setNotes([newNoteData, ...notes]); // Add the new note to state
    setNewNote({ title: "", body: "", tags: "" }); // Reset the form
  };

  // Filter notes based on the search query
  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.body.toLowerCase().includes(query) ||
      note.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Notes Application
      </h1>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search notes by title, body, or tags..."
          className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* Add Note Form */}
      <div className="bg-white p-4 rounded-md shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add a New Note</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <textarea
            placeholder="Body"
            className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            value={newNote.body}
            onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newNote.tags}
            onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600 transition"
            onClick={addNote}
          >
            Add Note
          </button>
        </div>
      </div>
      {/* Notes List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <Card key={note.id} className="shadow-lg">
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <CardDescription>
                  Tags: {note.tags.join(", ") || "No tags"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{note.body}</p>
              </CardContent>
              <CardFooter>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() =>
                    setNotes(notes.filter((existingNote) => existingNote.id !== note.id))
                  }
                >
                  Delete
                </button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            {searchQuery
              ? "No notes found matching your search."
              : "No notes available. Add some notes to get started!"}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
