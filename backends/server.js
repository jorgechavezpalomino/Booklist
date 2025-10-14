
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 3000;


app.use(express.json());

app.use(cors());


let books = [
  { id: 1, title: "Cien años de soledad", author: "Gabriel García Márquez" },
  { id: 2, title: "Don Quijote de la Mancha", author: "Miguel de Cervantes" }
];

app.get("/", (req, res) => {
  res.send("API de libros funcionando");
});

app.get("/api/books", (req, res) => {
  res.json(books);
});


function getNextId() {
  if (books.length > 0) {
    return books[books.length - 1].id + 1;
  } else {
    return 1;
  }
}

app.post("/api/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({message: "Missing tittle or author"})
  }

  const newBook = {
    id: getNextId(),
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
})

function getBookId(req) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return null;
  } else {
    return id;
  }
}

app.delete("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books.splice(index, 1);
  res.json({ message: "Book deleted successfully" });
});

app.delete("/api/books", (req, res) => {
  books = [];
  res.json({ message: "All books deleted", ok: true });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});