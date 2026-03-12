// Firebase Configuration (Get this from your Firebase Console)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9_YoOCYKhckQdyFMqCo1hxLNJ0CzFw30",
  authDomain: "findmyart-2204.firebaseapp.com",
  projectId: "findmyart-2204",
  storageBucket: "findmyart-2204.firebasestorage.app",
  messagingSenderId: "251953272884",
  appId: "1:251953272884:web:195861751198818aab1261",
  measurementId: "G-DBPBBBTRPD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let isSignUp = true;

function toggleAuthMode() {
    isSignUp = !isSignUp;
    document.getElementById("formTitle").innerText = isSignUp ? "Artist Sign Up" : "Artist Login";
    document.getElementById("signUpDetails").style.display = isSignUp ? "block" : "none";
    document.getElementById("authBtn").innerText = isSignUp ? "Create Account" : "Login";
}

async function handleAuth() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (isSignUp) {
        try {
            const cred = await auth.createUserWithEmailAndPassword(email, password);
            // Save artist details to Firestore
            await db.collection("artists").doc(cred.user.uid).set({
                name: document.getElementById("artistName").value,
                category: document.getElementById("artistCat").value,
                location: document.getElementById("artistLoc").value,
                phone: document.getElementById("artistPhone").value,
                email: email
            });
            alert("Profile Created Successfully!");
        } catch (error) { alert(error.message); }
    } else {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            window.location.href = "dashboard.html"; // Redirect to artist's private dashboard
        } catch (error) { alert(error.message); }
    }
}