import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
  apiKey: "AIzaSyB5ubgoTh9Vf_woFrpk-iQnvkvk2sGWEOI",
  authDomain: "pollitup-auth.firebaseapp.com",
  projectId: "pollitup-auth",
  storageBucket: "pollitup-auth.appspot.com",
  messagingSenderId: "335337605657",
  appId: "1:335337605657:web:c1475b4537c10f1649f888"
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}