import React, { useState, useEffect } from 'react';
import styles from '../css/Login.module.css';
import logo from '../Assets/Group.png';
import videoSource from '../Assets/welcome.mp4';
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
    const [typedText, setTypedText] = useState('');
    const textToType = "BeAware assists hearing-impaired individuals with secure sign-up and stream URL generation via user inputs, fostering accessibility goals.";
    const [rotationAngle, setRotationAngle] = useState(0);
    const [showVideo, setShowVideo] = useState(true);
    
    const [toastMessage, setToastMessage] = useState('');
    const showToast = (message) => {
      setToastMessage(message);
      setTimeout(() => {
        setToastMessage('');
      }, 3000); // Hide the toast after 3 seconds
    };

    useEffect(() => {
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < textToType.length) {
          setTypedText((prevText) => prevText + textToType.charAt(index));
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 20); // Typing speed: 100 milliseconds per character
  
      return () => clearInterval(typingInterval);
    }, []); 


    useEffect(() => {
      const rotationInterval = setInterval(() => {
        setRotationAngle((prevAngle) => prevAngle + 1);
      }, 50); // Rotation speed: 50 milliseconds
  
      return () => clearInterval(rotationInterval);
    }, []); 

    useEffect(() => {
    // Show video after 5 seconds
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);


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
    const handleVideoEnd = () => {
      setShowVideo(false); // Update state to hide the video after it ends
  };
    
  
    return (
      <div className={styles.containerz}>
        <div className={styles.leftPanelz}>
        {showVideo ? (
          <video className={`${styles.backgroundVideo}`} autoPlay muted onEnded={handleVideoEnd}>
            <source src={videoSource} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={log} alt="Logo" className={`${styles.logoz} ${styles.fadeOutImage}`} style={{ transform: `rotate(${rotationAngle}deg)` }} />
        )}
          <div className={styles.textz}>{typedText}</div>
        </div>
        <div className={styles.rightPanelz}>
          <div className={styles.formWrapperz}>
            <h1 className={styles.titlez}>Welcome Back!</h1>
            <form onSubmit={handleSubmit} className={styles.formz}>
              <label htmlFor="email" className={styles.labelz}>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputz}
              />
              <label htmlFor="password" className={styles.labelz}>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputz}
              />
              
              <div className={styles.rememberz}>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
            <button type="submit" className={styles.button}>
              Log in
            </button>
            <p></p>
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



