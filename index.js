import express from 'express';
import cors from 'cors';

const notes = [];

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  const note = notes.find((note) => note.id === id);

  if (!note) res.status(404).end();
  res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

app.post('/api/notes', (req, res) => {
  const { content, important } = req.body;

  if (!content) {
    return res.status(400).json({
      error: 'note content is missing',
    });
  }

  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);

  const newNote = {
    id: maxId + 1,
    content,
    important: important !== undefined ? important : false,
    date: new Date().toISOString(),
  };

  notes = [...notes, newNote];

  res.status(201).json(newNote);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
