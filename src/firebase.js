import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBTXLqzrErQ7Z53gjgvqcb3H2TFX_MgIjI",
  authDomain: "slack-clone-73df5.firebaseapp.com",
  projectId: "slack-clone-73df5",
  storageBucket: "slack-clone-73df5.appspot.com",
  messagingSenderId: "195413139155",
  appId: "1:195413139155:web:107973c9d12dc151a77e26"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();


export default db;
export { auth, provider }