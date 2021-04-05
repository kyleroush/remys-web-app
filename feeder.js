
var firebase = require('firebase');
const Gpio = require('pigpio').Gpio

const firebaseConfig = {
  apiKey: "AIzaSyDQzso5Isi6OmiojfMp7yaLW-2nyXRguDo",
  authDomain: "kibble-for-remy.firebaseapp.com",
  databaseURL: "https://kibble-for-remy-default-rtdb.firebaseio.com",
  projectId: "kibble-for-remy",
  storageBucket: "kibble-for-remy.appspot.com",
  messagingSenderId: "1052988778448",
  appId: "1:1052988778448:web:90f3a3b02b06696174bbd5",
  measurementId: "G-14M7P2M1P3"
};

const motor = new Gpio(17, {mode: Gpio.OUTPUT}) 
firebase.initializeApp(firebaseConfig);

// firebase.auth().signInWithEmailAndPassword(email, password)

// Update the document title using the browser API
firebase.database().ref('remy/feed').on("value", snapshot => {

  const feed = snapshot.val();

  if(feed) {
    const legnth = feed.legnth
    const speed = feed.speed

    motor.servoWrite(speed)

    setTimeout(() => { motor.servoWrite(0) }, legnth);
    firebase.database().ref('remy').update({feed: null, lastFed: Date.now().toJSON()});
  }
});