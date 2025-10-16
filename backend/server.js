
import express from "express";
import cors from "cors";
import client from "./database.js";

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(cors());

//let books = [
  //{ id: 1, title: "Cien años de soledad", author: "Gabriel García Márquez" },
  //{ id: 2, title: "Don Quijote de la Mancha", author: "Miguel de Cervantes" }
//];

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

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});