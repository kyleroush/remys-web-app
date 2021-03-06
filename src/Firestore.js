import firebase from 'firebase';
// import firebaseui from 'firebaseui';

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const authProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export const signIn = () => {
  auth
    .signInWithPopup(authProvider)
    .then((result) => {
      console.log(result.user);

    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
}
export const signOut = (setValue) => {
  auth.signOut()
    .then(() => {

      setValue({
        user: null,
        credential: null
      })
      // ...
    }).catch((error) => {
    });
}

export const db = firebase.database();
export const firestore = firebase.firestore();
export default firestore;
