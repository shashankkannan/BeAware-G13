import React, { useState } from 'react';
import styles from '../css/Login.module.css';
import logo from '../Assets/Group.png';
import log from '../Assets/Vector.png'
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from 'firebase/auth';
import {getDatabase, ref, push, set, orderByChild, onChildAdded,equalTo, child, query, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBydzDcp1Qst5mZd9j7AjwiodwTq1oBbq0",
  authDomain: "beawareg13-bdd89.firebaseapp.com",
  databaseURL: "https://beawareg13-bdd89-default-rtdb.firebaseio.com",
  projectId: "beawareg13-bdd89",
  storageBucket: "beawareg13-bdd89.appspot.com",
  messagingSenderId: "634689069450",
  appId: "1:634689069450:web:777dd650f473151ddb6873",
  measurementId: "G-ZBHNPLZDNC"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
function Toast({ message }) {
  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#333', color: '#fff', padding: '10px 20px', borderRadius: '5px', zIndex: '9999' }}>
      {message}
    </div>
  );
}
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [toastMessage, setToastMessage] = useState('');
    const showToast = (message) => {
      setToastMessage(message);
      setTimeout(() => {
        setToastMessage('');
      }, 3000); // Hide the toast after 3 seconds
    };

    const handleGoogleSignIn = async () => {
      
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        // You can handle the sign-in success here
        console.log('Google sign-in successful:', user);
      } catch (error) {
        // Handle sign-in errors
        console.error('Google sign-in error:', error.message);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const auth = getAuth();

    try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    if (!user.emailVerified) {
      showToast('Email is not verified. Please verify your email before signing in.');
      return;
    }
      console.log('User signed in successfully');
      showToast('Welcome back');
      const usersRef = ref(database, 'users');
      const userQuery = query(usersRef, orderByChild('email'), equalTo(email));
      const userSnapshot = await get(userQuery);
      const userId = Object.keys(userSnapshot.val())[0];
      const fv = userSnapshot.val()[userId].first;
      const fvn = userSnapshot.val()[userId].username;
      if(fv==0){
        // const redirectUrl = `/setup?username=${encodeURIComponent(fvn)}&email=${encodeURIComponent(email)}`;
        // window.location.href = redirectUrl;
        const userFirstRef = ref(database, `users/${userId}/first`);
        await set(userFirstRef, 1);
        sessionStorage.clear();
        sessionStorage.setItem('username', fvn);
        sessionStorage.setItem('email', email);
        window.location.href = '/setup';
      }else {
        sessionStorage.setItem('username', fvn);
        sessionStorage.setItem('email', email);
        window.location.href = '/manage';
        // window.location = '/home';
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        showToast('Username or password is incorrect.');
      } else {
        showToast('Sign-in error occurred. Please try again later.');
      }
      console.error('Sign-in error:', error.message);
      
    }
    };
  
    return (
      <div className={styles.container}>
        <div className={styles.leftPanel}>
        <div className={styles.logo}>
          <img src={log} alt="Logo" />
        </div>
        <div className={styles.text}>BeAware assists hearing-impaired individuals with secure sign-up and stream URL generation via user inputs, fostering accessibility goals.</div></div> {/* This div represents the left panel */}
        <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Welcome Back!</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="email" className={styles.label}>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <label htmlFor="password" className={styles.label}>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            
            <div className={styles.remember}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button type="submit" className={styles.button}>
              Log in
            </button>
            <button onClick={handleGoogleSignIn} className="google-sign-in-button">Sign In: Google</button>
          </form>
          <p className={styles.signup}>
            Don't have an account? <Link to ="/SignUp">Sign up</Link>
          </p>
        </div>
      </div>
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
};

export default SignIn;



