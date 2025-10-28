# BookList
```
BookList is a simple web application to manage your book collection. It features user authentication, CRUD operations for books, and session management. The backend uses Node.js, Express, and PostgreSQL, while the frontend uses **HTML, CSS, and JavaScript.
```
## Test
You can test the web app here https://booklist-7603.onrender.com

## Features

- User login with session management
- Add, view, delete individual books
- Reset the entire book list
- Local and production-ready configuration

## Project Structure

- frontend/
  - index.html # Login page
  - books.html # Main book list page
  - stylesLogin.css # Login page styles
  - styles.css # Book list styles
  - login.js # Login page script
  - script.js # Book list script
  - config.json # Frontend configuration

- backend/
  - server.js # Express server
  - database.js # PostgreSQL connection
  - package.json # Dependencies and scripts
  - .env # Environment variables

## Installation

1. **Clone the repository:**
```
git clone https://github.com/jorgechavezpalomino/Booklist
cd booklist
```

2. **Install backend dependencies:**

```
cd backend
npm install
```

3. **Create .env file in backend/ folder and add these variables:**
- The local port number you will use to run the frontend if you use one. If you don't especified a port the app will use 3000 as default. For example

```
PORT=3000
```

- The URL of the service where you will serve the frontend if you use one to run in production. For example

```
FRONTEND_URL=https://your-production-frontend-url
```

- The URL of you database conection string. If you use postgres you can use the following URL format to create it:

```
DATABASE_URL=postgresql://<USER>:<PASSWORD>@<HOST>/<DATABASE>
```

- The 'SECRET' variable is used by Express Session to sign and verify cookies. It ensures that session cookies cannot be modified by the client. You can change the secret word to something you prefer. For example

```
SECRET="my_secret"
```

4. **Frontend configuration (frontend/config.json):**

- The local port number you will use to run the frontend if you use one. If you don't especified a port the app will use 3000 as default and the URL of the service where you will serve the backend if you use one to run in production. You can change them is you are going to use others. For example
```
{
  "PORT": 3000,
  "BACKEND_PROD": "https://your-production-backend-url"
}
```
## Running the Project
- Local
  - Start the backend server using the next line in your backend folder:
  ```
  node server.js
  ```
  - Open the host o url in your browser or use Live Server
  ```
  frontend/index.html
  ```
- Production
  - Render web (https://dashboard.render.com/)
```
Create a project
Push backend code to a Git repository.
Connect the repository to Render and deploy the backend.
Set environment variables in Render (PORT, FRONTEND_URL, DATABASE_URL, SECRET).
Deploy frontend to Render or serve it from the backend static folder.
```
## API Endpoints

- Authentication

  - Endpoint	Method	Description
  - /login	POST	Login with username/password
  - /logout	GET	Logout user

- Books

  - Endpoint	Method	Description
  - /api/books	GET	Get all books (requires login)
  - /api/books	POST	Add a book {title, author}
  - /api/books/:id	DELETE	Delete a specific book
  - /api/books	DELETE	Delete all books

- All

  - /api/books endpoints require an authenticated session.
