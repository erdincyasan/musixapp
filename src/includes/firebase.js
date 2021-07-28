import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBLcGWuuOkvkcviB_War3z7MFK5Uju1nwo',
  authDomain: 'music-622c5.firebaseapp.com',
  projectId: 'music-622c5',
  storageBucket: 'music-622c5.appspot.com',
  appId: '1:896432246629:web:a176eb9b71077ece2b5b8c',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const usersCollection = db.collection('users');
export { auth, db, usersCollection };
