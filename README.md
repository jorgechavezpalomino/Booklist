# BookList

BookList is a simple web application to manage your book collection. It features user authentication, CRUD operations for books, and session management. The backend uses Node.js, Express, and PostgreSQL, while the frontend uses HTML, CSS, and JavaScript.

## Test
You can test the web app here https://booklist-7603.onrender.com

User is "admin"

Password is "1234"

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

- **Clone the repository:**

```
git clone https://github.com/jorgechavezpalomino/Booklist
cd Booklist
```

- **Install backend dependencies:**

```
cd backend
npm install
```
## Creation of databse

The web app use a posgresql database, you can use pgAdmin 4 to manage your database

- Create a database with the name booklist using a query

`CREATE DATABASE booklist;`

- Open a new query connected to the booklist database

- Create the tables that the web app will use.

```
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);
```

- Before run the project you must add a user and password to the table "users" in the database. This is the code to add user "admin" and the password hash to the password "1234".

```
INSERT INTO users (username, password_hash)
VALUES ('admin', '$2b$10$M8YHKqFGDVIyoqGT0PnucOtRqsWzB78OgaAI99waMGUYCU0mDX8UC');
```

## Run in Local

1. **Create .env file in backend/ folder and add these variables:**

- The local port number you will use to run the frontend. If you don't especified a port the app will use 3000 as default. For example

    `PORT=3000`

- The URL of you database conection string. If you use postgres you can use the following URL format to create it:

    `DATABASE_URL=postgresql://<USER>:<PASSWORD>@<HOST>/<DATABASE_NAME>`

- The 'SECRET' variable is used by Express Session to sign and verify cookies. It ensures that session cookies cannot be modified by the client. You can change the secret word to something you prefer. For example

    `SECRET="my_secret"`

2. **Frontend configuration (frontend/config.json):**

- The local port number you will use to run the frontend. If you don't especified a port the app will use 3000 as default. You can change it if you are going to use other. For example

```
{
  "PORT": 3000,
}
```

3. **Running the Project**

- Start the backend server using the next line in your backend folder:

  `node server.js`

- Open the host local with the port that youspecified before in your browser

  `http://localhost:3000/`

## Run in Production

1. **Create .env file in backend/ folder and add these variables:**

- The URL of the service where you will serve the frontend. For example

    `FRONTEND_URL=https://your-production-frontend-url`

- The URL of you database conection string. If you use postgres you can use the following URL format to create it:

    `DATABASE_URL=postgresql://<USER>:<PASSWORD>@<HOST>/<DATABASE>`

- The 'SECRET' variable is used by Express Session to sign and verify cookies. It ensures that session cookies cannot be modified by the client. You can change the secret word to something you prefer. For example

    `SECRET="my_secret"`

- Add this variable to enable SSL

    `USE_SSL = "true"`

2. **Frontend configuration (frontend/config.json):**

- The URL of the service where you will serve the backend. You can change it if you are going to use other. For example

```
{
  "BACKEND_PROD": "https://your-production-backend-url"
}
```

3. **Running the Project**

Using render web (https://dashboard.render.com/)


- Create a project
- Push your code to a Git repository.
- Connect the repository to Render.
- Deploy frontend code to Render.
- Create a instance of postgres and connect it with your database.
- Deploy backend code to Render.
- Set environment variables in Render (FRONTEND_URL, DATABASE_URL, SECRET).
- Deploy frontend to Render.

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
