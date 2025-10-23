import express from "express";
import cors from "cors";
import session from "express-session";
import bcrypt from "bcrypt";
import client from "./database.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

<<<<<<< Updated upstream
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve static files in the server
app.use(express.static(path.join(__dirname, "../frontend")));

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//config sessions
=======
app.use(express.json());
app.use(
  cors({ origin: "https://booklist-7603.onrender.com", credentials: true })
);
app.set("trust proxy", 1);
//config sessions using https sites
>>>>>>> Stashed changes
app.use(
  session({
    secret: process.env.secret, //enviromental variable
    resave: false,
    saveUninitialized: false,
    cookie: {
<<<<<<< Updated upstream
      secure: false,
      httpOnly: true,
      sameSite: "lax",
=======
      //If you use localhost use secure: false,
      secure: true,
      httpOnly: true,
      //If you use localhost use samesite: lax,
      sameSite: "none",
>>>>>>> Stashed changes
    },
  })
);

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1;",
      [username]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Username or password incorrect" });
    }
    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: "User or password incorrect" });
    }
    //save data in session
    req.session.userId = user.id;
    req.session.username = user.username;
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error to login", error);
    res.status(500).json({ error: "Error in server" });
  }
});

function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "unauthorized" });
  }
  next();
}

app.get("/", (req, res) => {
  res.send("API books working");
});

app.get("/api/books", requireLogin, async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM books;");
    res.json(result.rows);
  } catch (error) {
    console.error("Error to get books", error);
    res.status(500).json({ error: "Error to get books" });
  }
});

app.post("/api/books", requireLogin, async (req, res) => {
  try {
    const { title, author } = req.body;
    await client.query("INSERT INTO books (title,author) VALUES ($1, $2);", [
      title,
      author,
    ]);
    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    console.error("Error adding book: ", error);
    res.status(500).json({ error: "Error adding book" });
  }
});

app.delete("/api/books/:id", requireLogin, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await client.query("DELETE FROM books WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting book" });
  }
});

app.delete("/api/books", requireLogin, async (req, res) => {
  try {
    await client.query("DELETE FROM books;");
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting all books" });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "session closed" });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`);
});
