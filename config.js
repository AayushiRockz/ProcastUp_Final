import firebase from 'firebase';
require('@firebase/firestore');
   // Your web app's Firebase configuration
   var firebaseConfig = {
    apiKey: "AIzaSyCHxSmw7kKAPvglcCVK_7g2vHbI1Je2L0k",
    authDomain: "procrastup-ff1d1.firebaseapp.com",
    projectId: "procrastup-ff1d1",
    storageBucket: "procrastup-ff1d1.appspot.com",
    messagingSenderId: "841887871710",
    appId: "1:841887871710:web:65d687041b8fc05de5484f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase.firestore();