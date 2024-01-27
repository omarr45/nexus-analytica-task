import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCVMYDJgPguYiLuJbNcaaRpTVaLKd1gxks',
  authDomain: 'nexus-analytica.firebaseapp.com',
  projectId: 'nexus-analytica',
  storageBucket: 'nexus-analytica.appspot.com',
  messagingSenderId: '1016169196585',
  appId: '1:1016169196585:web:27b676ff8b706db6d68038',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
