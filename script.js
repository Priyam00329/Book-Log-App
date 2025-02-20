import { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "./firebase-config.js";

document.getElementById("addBook").addEventListener("click", addBook);
document.addEventListener("DOMContentLoaded", fetchBooks);

const bookList = document.getElementById("bookList");

async function addBook() {
    const title = document.getElementById("titleInput").value;
    const author = document.getElementById("authorInput").value;
    const genre = document.getElementById("genreInput").value;

    if (title && author && genre) {
        await addDoc(collection(db, "books"), { title, author, genre });
        fetchBooks();
    }
}

async function fetchBooks() {
    bookList.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "books"));
    
    querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        const li = document.createElement("li");
        li.innerHTML = `<strong>${data.title}</strong> by ${data.author} (${data.genre}) 
            <button onclick="editBook('${docSnapshot.id}', '${data.title}', '${data.author}', '${data.genre}')">✏️ Edit</button> 
            <button onclick="deleteBook('${docSnapshot.id}')">🗑 Delete</button>`;
        bookList.appendChild(li);
    });
}

async function editBook(id, oldTitle, oldAuthor, oldGenre) {
    const newTitle = prompt("Edit title:", oldTitle);
    const newAuthor = prompt("Edit author:", oldAuthor);
    const newGenre = prompt("Edit genre:", oldGenre);

    if (newTitle && newAuthor && newGenre) {
        await updateDoc(doc(db, "books", id), { title: newTitle, author: newAuthor, genre: newGenre });
        fetchBooks();
    }
}

async function deleteBook(id) {
    await deleteDoc(doc(db, "books", id));
    fetchBooks();
}
