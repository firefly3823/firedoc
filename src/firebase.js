// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxXHj3quv22WE-eiDlqvxWZcA5TZOM_kk",
    authDomain: "firedoc-project.firebaseapp.com",
    projectId: "firedoc-project",
    storageBucket: "firedoc-project.appspot.com",
    messagingSenderId: "518875155142",
    appId: "1:518875155142:web:f6119cda0dbbda0e4b25c7",
    measurementId: "G-9Y3VED5T1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)