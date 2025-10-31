const addForm = document.getElementById("addForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const message = document.getElementById("message");
const booksList = document.getElementById("booksList");
const resetButton = document.getElementById("resetButton");
const logoutButton = document.getElementById("logoutButton");

let baseUrl;
let apiUrl;

async function loadConfig() {
  const res = await fetch("config.json");
  const config = await res.json();

  const hostname = window.location.hostname;
  const isLocal = hostname === "localhost";

  if (isLocal) {
    baseUrl = `http://localhost:${config.PORT}`;
  } else {
    baseUrl = config.BACKEND_PROD;
  }
  apiUrl = `${baseUrl}/api/books`;
}

function showMessage(text, isError = false) {
  message.textContent = text;
  if (isError) {
    message.className = "error";
  } else {
    message.className = "ok";
  }

  setTimeout(() => {
    message.className = "hidden";
    message.textContent = "";
  }, 3000);
}

async function handleLoadBooks() {
  booksList.innerHTML = ""; // clean
  try {
    const res = await fetch(apiUrl, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Error in response");
    }

    const books = await res.json();

    if (!books.length) {
      booksList.innerHTML = "<li>There are no books yet</li>";
      return;
    }

    booksList.innerHTML = books
      .map(
        (b) =>
          "<li>" +
          "<span><strong>" +
          b.title +
          "</strong> — " +
          b.author +
          "</span>" +
          '<span><button class="deleteButton" data-id="' +
          b.id +
          '">Delete</button></span>' +
          "</li>"
      )
      .join("");
  } catch (error) {
    console.error(error);
    booksList.innerHTML = "<li>Error loading books</li>";
    showMessage("Error loading book: " + error.message, true);
  }
}

async function handleAddForm(e) {
  e.preventDefault();
  const newBook = {
    title: titleInput.value.trim(),
    author: authorInput.value.trim(),
  };

  if (!newBook.title || !newBook.author) {
    showMessage("Complete title and author fields", true);
    return;
  }

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Error adding the book");
    }

    showMessage("Book added correctly");
    addForm.reset();
    handleLoadBooks();
  } catch (error) {
    showMessage("Error: " + error.message, true);
  }
}

async function handleLogoutButton(e) {
  try {
    const res = await fetch(`${baseUrl}/logout`, {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      window.location.href = "index.html";
    }
  } catch (error) {
    showMessage("Error to log out " + error.message, true);
  }
}

async function handleResetButton(e) {
  if (!confirm("¿Are you sure to delete all books?")) return;

  try {
    const res = await fetch(apiUrl, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Error deleting books");
    }

    showMessage("Book list deleted");
    handleLoadBooks();
  } catch (error) {
    showMessage("Error: " + error.message, true);
  }
}

async function handleBooksList(e) {
  if (e.target.classList.contains("deleteButton")) {
    const id = e.target.dataset.id;
    if (!confirm("Are you sure to delete this book?")) {
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Error to try delete the book");
      }
      showMessage("The book was deleted correctly");
      handleLoadBooks();
    } catch (error) {
      showMessage("Error to deleted the book: " + error.message, true);
    }
  }
}

function setupEventListeners() {
  addForm.addEventListener("submit", handleAddForm);
  logoutButton.addEventListener("click", handleLogoutButton);
  resetButton.addEventListener("click", handleResetButton);
  booksList.addEventListener("click", handleBooksList);
}

async function init() {
  await loadConfig();
  setupEventListeners();
  handleLoadBooks();
}

init();
