import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBBSWe3_r5r6dWUfHFBjNEvse6EKgSUdx8",
  authDomain: "casinow-auth-dev.firebaseapp.com",
  projectId: "casinow-auth-dev",
  storageBucket: "casinow-auth-dev.appspot.com",
  messagingSenderId: "70079245733",
  appId: "1:70079245733:web:10cf1275dab27d76c58c4c",
  measurementId: "G-MK3RJKYM35"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


