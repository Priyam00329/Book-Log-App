document.addEventListener("DOMContentLoaded", fetchBooks);

const bookList = document.getElementById("bookList");

// ✅ Add Book
function addBook() {
    const title = document.getElementById("titleInput").value;
    const author = document.getElementById("authorInput").value;
    const genre = document.getElementById("genreInput").value;

    if (title && author && genre) {
        db.collection("books").add({ title, author, genre })
        .then(fetchBooks)
        .catch(error => console.error("Error adding book: ", error));
    }
}

// ✅ Fetch Books
function fetchBooks() {
    bookList.innerHTML = "";
    db.collection("books").get().then(snapshot => {
        snapshot.forEach(doc => {
            const data = doc.data();
            const li = document.createElement("li");
            li.innerHTML = `<strong>${data.title}</strong> by ${data.author} (${data.genre}) 
            <button onclick="editBook('${doc.id}', '${data.title}', '${data.author}', '${data.genre}')">✏️ Edit</button> 
            <button onclick="deleteBook('${doc.id}')">🗑 Delete</button>`;
            bookList.appendChild(li);
        });
    });
}

// ✅ Edit Book
function editBook(id, oldTitle, oldAuthor, oldGenre) {
    const newTitle = prompt("Edit title:", oldTitle);
    const newAuthor = prompt("Edit author:", oldAuthor);
    const newGenre = prompt("Edit genre:", oldGenre);

    if (newTitle && newAuthor && newGenre) {
        db.collection("books").doc(id).update({ title: newTitle, author: newAuthor, genre: newGenre })
        .then(fetchBooks);
    }
}

// ✅ Delete Book
function deleteBook(id) {
    db.collection("books").doc(id).delete().then(fetchBooks);
}

// AI Chatbot
document.getElementById("aiChatbot").addEventListener("click", async () => {
    const question = prompt("Ask AI about books:");
    if (!question) return;

    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: question }]
        })
    });

    const data = await response.json();
    alert(data.choices[0].message.content);
});


//Biometric
document.getElementById("biometricLogin").addEventListener("click", async () => {
    if (!window.PublicKeyCredential) {
        alert("Biometric authentication not supported!");
        return;
    }
    try {
        const credential = await navigator.credentials.create({
            publicKey: {
                challenge: new Uint8Array(32),
                rp: { name: "Book Log App" },
                user: { id: new Uint8Array(16), name: "user@example.com", displayName: "User" },
                pubKeyCredParams: [{ alg: -7, type: "public-key" }]
            }
        });
        alert("Biometric authentication successful!");
    } catch (err) {
        alert("Authentication failed: " + err.message);
    }
});
