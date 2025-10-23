const loginForm = document.getElementById("loginForm");
const apiUrl = "http://localhost:3000/login";

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    await res.json();
    if (res.ok) {
      window.location.href = "books.html";
    } else {
      alert("Invalid username or password");
    }
  } catch (error) {
    console.error("Error: ", error);
    alert("Error logging in ");
  }
});
