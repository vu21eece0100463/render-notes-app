
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Temporary storage
let notes = [];
let nextId = 1;

// API: Get all notes
app.get("/api/notes", (req, res) => {
    res.json(notes);
});

// API: Add a note
app.post("/api/notes", (req, res) => {
    const { text } = req.body;

    if (!text || !text.trim()) {
        return res.status(400).json({
            message: "Please enter a note"
        });
    }

    const newNote = {
        id: nextId++,
        text: text.trim(),
        createdAt: new Date().toISOString()
    };

    notes.push(newNote);

    res.status(201).json({
        message: "Note added successfully",
        note: newNote
    });
});

// API: Delete a note
app.delete("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id);

    const existingNote = notes.find(note => note.id === id);

    if (!existingNote) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    notes = notes.filter(note => note.id !== id);

    res.json({
        message: "Note deleted successfully"
    });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

