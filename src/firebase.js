import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChlGIpC79TADC8MzB9yPyIoFa8gPc9CE4",
  authDomain: "slack-clone-f6e1e.firebaseapp.com",
  projectId: "slack-clone-f6e1e",
  storageBucket: "slack-clone-f6e1e.appspot.com",
  messagingSenderId: "667545817512",
  appId: "1:667545817512:web:cce5a41f2cd94197ba0d9d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
