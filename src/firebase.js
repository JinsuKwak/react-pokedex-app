// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG9q4KTPkfLANHEbC_BH9r7HUAI0U6ydY",
  authDomain: "react-pokedex-app-e3d60.firebaseapp.com",
  projectId: "react-pokedex-app-e3d60",
  storageBucket: "react-pokedex-app-e3d60.appspot.com",
  messagingSenderId: "828037636244",
  appId: "1:828037636244:web:4962bd86e24c5ca215d481",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
