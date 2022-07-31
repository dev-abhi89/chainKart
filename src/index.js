import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import AddressProvider from './services/AddressProvider';
import AppContainer from './App';


const firebaseConfig = {
  apiKey: "AIzaSyCK7EZnlTjWHFEp_7k28oyWM0add2caE1k",
  authDomain: "fk-g4-994fd.firebaseapp.com",
  projectId: "fk-g4-994fd",
  storageBucket: "fk-g4-994fd.appspot.com",
  messagingSenderId: "599419315302",
  appId: "1:599419315302:web:d1d078a651b0a51205f9a7"
};

// Initialize Firebase
const appFB =initializeApp(firebaseConfig);
export const db = getFirestore(appFB);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AddressProvider>
   <AppContainer/>
    </AddressProvider>
  </React.StrictMode>
);


reportWebVitals();
