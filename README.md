# BookList
BookList is a simple web application to manage your book collection. It features **user authentication**,
**CRUD operations** for books, and session management. The backend uses **Node.js, Express, and PostgreSQL**
, while the frontend uses **HTML, CSS, and JavaScript**.

## Features

- User login with session management  
- Add, view, delete individual books  
- Reset the entire book list  
- Local and production-ready configuration  
  
## Project Structure

frontend/  
├─ index.html # Login page  
├─ books.html # Main book list page  
├─ stylesLogin.css # Login page styles  
├─ styles.css # Book list styles  
├─ login.js # Login page script  
├─ script.js # Book list script  
├─ config.json # Frontend configuration  

backend/  
├─ server.js # Express server  
├─ database.js # PostgreSQL connection  
├─ package.json # Dependencies and scripts  
├─ .env # Environment variables  

## Installation

1. **Clone the repository:**

git clone https://github.com/jorgechavezpalomino/Booklist
cd booklist

2. **Install backend dependencies:**

cd backend
npm install

3. **Create .env file in backend/ folder:**

PORT=3000
FRONTEND_URL=https://your-production-frontend-url  
DATABASE_URL=your_postgres_connection_string  
SECRET=my_secret  

4. **Frontend configuration (frontend/config.json):**

{  
  "PORT": 3000,  
  "BACKEND_PROD": "https://your-production-backend-url"  
}  

## Running the Project
- Local

Start the backend server:  
node backend/server.js  
Open frontend/index.html in your browser or use Live Server.  

- Production (Render)

Push backend code to a Git repository.  
Connect the repository to Render and deploy the backend.  
Set environment variables in Render (PORT, FRONTEND_URL, DATABASE_URL, SECRET).  
Deploy frontend to Render or serve it from the backend static folder.  

## API Endpoints

- Authentication

Endpoint	Method	Description  
/login	POST	Login with username/password  
/logout	GET	Logout user  

- Books

Endpoint	Method	Description  
/api/books	GET	Get all books (requires login)  
/api/books	POST	Add a book {title, author}  
/api/books/:id	DELETE	Delete a specific book  
/api/books	DELETE	Delete all books  

- All  
/api/books endpoints require an authenticated session.  
