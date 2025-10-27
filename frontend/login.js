const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

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

  apiUrl = `${baseUrl}/login`;
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

async function handleLoginForm(e) {
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
}

async function init() {
  await loadConfig();
  loginForm.addEventListener("submit", handleLoginForm);
}

init();
