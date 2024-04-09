// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5zQ-emOcYKLSLoCta6xPjggPR6f4MGsc",
  authDomain: "mern-blog-7493d.firebaseapp.com",
  projectId: "mern-blog-7493d",
  storageBucket: "mern-blog-7493d.appspot.com",
  messagingSenderId: "446366005586",
  appId: "1:446366005586:web:05f68c11f210f47b27628b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//google auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const signInWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((error) => {
      console.log(error.message);
    });

  return user;
};
