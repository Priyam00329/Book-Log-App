// firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyAuN68ylvRRtge26TgmjTk3uMWjdRDmT9Y",
    authDomain: "book-log-app-4fa9b.firebaseapp.com",
    projectId: "book-log-app-4fa9b",
    storageBucket: "book-log-app-4fa9b.firebasestorage.app",
    messagingSenderId: "661879052984",
    appId: "1:661879052984:web:9e64794de60020f938724d",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
