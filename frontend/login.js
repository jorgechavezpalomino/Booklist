const loginForm = document.getElementById("loginForm");
const hostname = window.location.hostname;
const isLocal = hostname === "localhost";

if (isLocal) {
  apiUrl = "http://localhost:3000/login";
} else {
  apiUrl = "https://booklist-server-mcu0.onrender.com/login";
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

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (res.ok) {
      window.location.href = "books.html";
    } else {
      showMessage("Invalid username or password");
    }
  } catch (error) {
    console.error("Error: ", error);
    showMessage("Error logging in");
  } finally {
    loginForm.reset();
  }
});
