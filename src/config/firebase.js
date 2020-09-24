import * as firebase from 'firebase'

//Firebase Configuration Details
var firebaseConfig = {
    apiKey: "AIzaSyBbzQyoVS0XYmsL265SNmvRe1mXqFDahx0",
    authDomain: "bobblereg.firebaseapp.com",
    databaseURL: "https://bobblereg.firebaseio.com",
    projectId: "bobblereg",
    storageBucket: "bobblereg.appspot.com",
    messagingSenderId: "7736682473",
    appId: "1:7736682473:web:2c23b1ccc935fc7cff4d78",
    measurementId: "G-QJK63JHSZQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase