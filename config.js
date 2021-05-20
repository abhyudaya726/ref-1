import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyAbOstUq4k-VtM87J0qF-7myHGuLNlBdV4",
  authDomain: "pro-71-55bcf.firebaseapp.com",
  projectId: "pro-71-55bcf",
  storageBucket: "pro-71-55bcf.appspot.com",
  messagingSenderId: "312162728335",
  appId: "1:312162728335:web:de8d2900558c240afcb3fa"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); 
}

export default firebase.firestore();