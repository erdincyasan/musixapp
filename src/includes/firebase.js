import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

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

db.enablePersistence().catch((error) => {
  // eslint-disable-next-line no-console
  console.log(`Firebase persistence error ${error.code}`);
});
const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');
const storage = firebase.storage();
export {
  auth, db, usersCollection, storage, songsCollection, commentsCollection,
};
