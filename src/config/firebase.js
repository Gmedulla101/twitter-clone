// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBb4u-0nr-BhFNJmGbY3Fd3i29HbNSA6fc',
  authDomain: 'tw-backend-7200d.firebaseapp.com',
  projectId: 'tw-backend-7200d',
  storageBucket: 'tw-backend-7200d.appspot.com',
  messagingSenderId: '18844707521',
  appId: '1:18844707521:web:c10fb86ea52d9dd5e78240',
  measurementId: 'G-1G2SN033S0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
