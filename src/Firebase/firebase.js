import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";



const firebaseConfig = {

  apiKey: "AIzaSyCf64ylOzXGAoWqBtLKKlMls5seEd4MJ5Q",

  authDomain: "iargi-1b106.firebaseapp.com",

  projectId: "iargi-1b106",

  storageBucket: "iargi-1b106.firebasestorage.app",

  messagingSenderId: "498541676264",

  appId: "1:498541676264:web:0f1c2f00e9972e630e2b5d",

  measurementId: "G-H1HVRBZY10"

};



const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);


export const db = getFirestore(app);