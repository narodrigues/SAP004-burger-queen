import firebase from 'firebase';

// Initialize Firebase
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA0zQpowGuqLpRl657XZedbxvMynArMc78",
    authDomain: "projeto-burger-queen.firebaseapp.com",
    databaseURL: "https://projeto-burger-queen.firebaseio.com",
    projectId: "projeto-burger-queen",
    storageBucket: "projeto-burger-queen.appspot.com",
    messagingSenderId: "41467177785",
    appId: "1:41467177785:web:a66f855d35e4d78e4056e8",
    measurementId: "G-3Y15YZ5EQG"
});

export default firebaseApp;