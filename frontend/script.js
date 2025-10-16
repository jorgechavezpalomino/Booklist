
const addForm = document.getElementById("addForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const message = document.getElementById("message");
const booksList = document.getElementById("booksList");
const resetButton = document.getElementById("resetButton");
//const apiUrl = "https://booklist-server-mcu0.onrender.com/api/books";
const apiUrl = "http://localhost:3000/api/books";


function showMessage(text, isError = false  ) {
    message.textContent = text;
    if (message.className = isError) {
        isError = "error";
    } else {
        isError = "ok";
    }
    
    setTimeout(()=> {
        message.className = "hidden";
        message.textContent = "";
        }, 3000
    );
    
}

async function loadBooks() {
    booksList.innerHTML = ""; // clean
    try {

        const res = await fetch(apiUrl);

        if (!res.ok) {
            throw new Error("Error in response");
        }

        const books = await res.json();

        if (!books.length) {
            booksList.innerHTML = "<li>There are no books yet</li>";
            return;
        }
        
        booksList.innerHTML = books.map(b => 
            '<li>' +
                '<span><strong>' + b.title + '</strong> — ' + b.author + '</span>' +
                '<span><button class="deleteButton" data-id="' + b.id + '">Delete</button></span>' +
            '</li>'

        ).join('');

    } catch (error) {
        console.error(error);
        booksList.innerHTML= "<li>Error loading books</li>";
        showMessage("Error loading book: " + error.message, true);
    }    

}

addForm.addEventListener("submit",async (e)=>{

    e.preventDefault();
    const newBook = {
    title: titleInput.value.trim(),
    author: authorInput.value.trim(),
    };

    if (!newBook.title || !newBook.author) {
        showMessage("Complete title and author fields",true);
        return;
    }

    try {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(newBook),
        });

        if (!res.ok) {
            throw new Error("Error adding the book");
        }

        showMessage("Book added correctly");
        addForm.reset();
        loadBooks();
    } catch (error) {
        showMessage("Error: " + error.message, true)
    }

})

resetButton.addEventListener("click",async () => {
    if (!confirm("¿Are you sure to delete all books?")) 
        return;{
    }

    try {
        const res = await fetch(apiUrl, {method: "DELETE"});
        if (!res.ok) {
            throw new Error("Error deleting books");
        }

        showMessage("Book list deleted");
        loadBooks();
    } catch (error) {
        showMessage("Error: " + error.message,true);
    }
});


booksList.addEventListener('click',async(e) => {
    
    if (e.target.classList.contains("deleteButton")) {
        const id = e.target.dataset.id;
        if (!confirm("Are you sure to delete this book?")) {
            return;
        }
        
        try {
            const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
            if (!res.ok) {
                throw new Error("Error to try delete the book")
            }
            showMessage("The book was deleted correctly");
            loadBooks();
        } catch (error) {
            showMessage("Error to deleted the book: " + error.message, true);
        }
    }
});

loadBooks();