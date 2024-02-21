import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 7070;

let notes = [];
let nextId = 1;

app.use(cors());
app.use(bodyParser.json());

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.post("/notes", (req, res) => {
  const newNote = { ...req.body, id: nextId++ };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.delete("/notes/:id", (req, res) => {
  const noteId = Number(req.params.id);
  notes = notes.filter((note) => note.id !== noteId);
  res.status(200).json({ message: "Note deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
