import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDKbjp5WD8EeAXc-LiCqmobFvbVxN2uQdc",
  authDomain: "corporate-chat-bf950.firebaseapp.com",
  databaseURL: "https://corporate-chat-bf950-default-rtdb.firebaseio.com",
  projectId: "corporate-chat-bf950",
  storageBucket: "corporate-chat-bf950.appspot.com",
  messagingSenderId: "731806305252",
  appId: "1:731806305252:web:0d687ef3465e87c8d055f1",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };
