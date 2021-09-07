import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCRaEpIs_JUKEwt-pv0Ew6GA1QAKsc8ewk",
  authDomain: "smackchat-e399b.firebaseapp.com",
  projectId: "smackchat-e399b",
  storageBucket: "smackchat-e399b.appspot.com",
  messagingSenderId: "795316801343",
  appId: "1:795316801343:web:81333afdb7fcd5a902cd8a"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firebaseDb = firebaseApp.database()

export {firebaseAuth, firebaseDb}