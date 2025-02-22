// script.js

import { db } from './firebase-config.js';

// DOM Elements
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const genreInput = document.getElementById('genreInput');
const addBookButton = document.getElementById('addBook');
const bookList = document.getElementById('bookList');

// Function to render books
function renderBook(doc) {
    const li = document.createElement('li');
    li.setAttribute('data-id', doc.id);
    li.textContent = `${doc.data().title} by ${doc.data().author} [${doc.data().genre}]`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');
    editButton.addEventListener('click', () => editBook(doc.id));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteBook(doc.id));

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    bookList.appendChild(li);
}

// Function to add a new book
function addBook() {
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const genre = genreInput.value.trim();

    if (title && author && genre) {
        db.collection('books').add({
            title,
            author,
            genre
        }).then(() => {
            titleInput.value = '';
            authorInput.value = '';
            genreInput.value = '';
        }).catch(error => {
            console.error('Error adding book: ', error);
        });
    } else {
        alert('Please fill out all fields.');
    }
}

// Function to edit a book
function editBook(id) {
    const newTitle = prompt('Enter new title:');
    const newAuthor = prompt('Enter new author:');
    const newGenre = prompt('Enter new genre:');

    if (newTitle && newAuthor && newGenre) {
        db.collection('books').doc(id).update({
            title: newTitle,
            author: newAuthor,
            genre: newGenre
        }).catch(error => {
            console.error('Error updating book: ', error);
        });
    } else {
        alert('All fields are required for editing.');
    }
}

// Function to delete a book
function deleteBook(id) {
    db.collection('books').doc(id).delete().catch(error => {
        console.error('Error deleting book: ', error);
    });
}

// Real-time listener for Firestore
db.collection('books').onSnapshot(snapshot => {
    bookList.innerHTML = '';
    snapshot.forEach(doc => {
        renderBook(doc);
    });
});

// Event Listener
addBookButton.addEventListener('click', addBook);
