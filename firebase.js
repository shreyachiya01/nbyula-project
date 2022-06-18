

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDuWZQWndTCBdzwRz6e2wqGzBRjVOJ_vdQ",
    authDomain: "quiz-e4fec.firebaseapp.com",
    projectId: "quiz-e4fec",
    storageBucket: "quiz-e4fec.appspot.com",
    messagingSenderId: "374931304653",
    appId: "1:374931304653:web:544349a1bd4812e99eb984"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  import {
    getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField
}
    from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js"

const db = getFirestore();

console.log(db)
