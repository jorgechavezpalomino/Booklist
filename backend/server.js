
import express from "express";
import cors from "cors";
import client from "./database.js";

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API de libros funcionando");
});

app.get("/api/books", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM books;");
    res.json(result.rows);
  } catch (error) {
    console.error("Error to get books", error);
    res.status(500).json({error: "Error to get books"});
  }
});

app.post("/api/books", async(req, res) => {
  try {
    const{title, author} = req.body;
    const result = await client.query(
      "INSERT INTO books (title,author) VALUES ($1, $2);",[title,author]
    );
    res.status(201).json({message: "Book added successfully"});
  } catch (error) {
    console.error("Error adding book: ", error);
    res.status(500).json({error: "Error adding book"});
  }
});

app.delete("/api/books/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await client.query("DELETE FROM books WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({error: "Book not found"});
    }
    res.sendStatus(204);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Error deleting book"});
  }

});

app.delete("/api/books", async (req, res) => {
  try {
    const result = await client.query("DELETE FROM books;");
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Error deleting all books"})
  }
  
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});