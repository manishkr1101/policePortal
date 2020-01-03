const firebase = require('firebase/app')
const firebaseConfig = {
    apiKey: "AIzaSyBY1OvDdv-mhEuCF8fNUjameZC4b3Zz8Wg",
    authDomain: "hackathon-2a76f.firebaseapp.com",
    databaseURL: "https://hackathon-2a76f.firebaseio.com",
    projectId: "hackathon-2a76f",
    storageBucket: "hackathon-2a76f.appspot.com",
    messagingSenderId: "428032758866",
    appId: "1:428032758866:web:8d07425b013dfeee5b7b8b"
};

firebase.initializeApp(firebaseConfig);

const db = require('firebase').database();

module.exports = db;