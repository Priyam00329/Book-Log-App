// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAuN68ylvRRtge26TgmjTk3uMWjdRDmT9Y",
    authDomain: "book-log-app-4fa9b.firebaseapp.com",
    projectId: "book-log-app-4fa9b",
    storageBucket: "book-log-app-4fa9b.firebasestorage.app",
    messagingSenderId: "661879052984",
    appId: "1:661879052984:web:9e64794de60020f938724d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc };