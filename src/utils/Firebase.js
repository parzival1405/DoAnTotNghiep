import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCafx5ZtiQ8Ux9J577OmW9qIuokvShfht0",
  authDomain: "medical-service-2023.firebaseapp.com",
  projectId: "medical-service-2023",
  storageBucket: "medical-service-2023.appspot.com",
  messagingSenderId: "687191632071",
  appId: "1:687191632071:web:ddb829ef66bcbfdb3576e2",
  measurementId: "G-N2WKVTM00J",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export { auth, firebase };
