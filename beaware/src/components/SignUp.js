import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import '../css/SignUp.css';
import { Link } from 'react-router-dom';
import Image from '../Assets/SignUp.png'; 
import TxtImage from '../Assets/Vector.png';
import { getDatabase, ref, push, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification, updateProfile } from 'firebase/auth';
function Toast({ message }) {
  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#333', color: '#fff', padding: '10px 20px', borderRadius: '5px', zIndex: '9999' }}>
      {message}
    </div>
  );
}
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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
    const showToast = (message) => {
      setToastMessage(message);
      setTimeout(() => {
        setToastMessage('');
      }, 3000); // Hide the toast after 3 seconds
    };

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const handleGoogleSignIn = async () => {
    const username = prompt('Please enter your username:');
    
    if (!username) {
      // Handle case where username is not provided
      showToast('Username is required for registration.');
      return;
    }
  
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await updateProfile(user, { displayName: username });
      const usersRef = ref(database, 'users');
      const newUserRef = push(usersRef);
      await set(newUserRef, {
        username: username,
        email: user.email,
        first: 0
      });
      // You can handle the sign-in success here
      showToast('Google sign-in successful');
      const redirectUrl = `/setup?username=${encodeURIComponent(username)}&email=${encodeURIComponent(user.email)}`;
      window.location.href = redirectUrl;
    } catch (error) {
      // Handle sign-in errors
      console.error('Google sign-in error:', error.message);
    }
  };
  


  const handleSubmit = async (event) => {
    event.preventDefault();
     // Retrieve the values entered by the user
    const userData = {
    username: username,
    email: email,
    password: password,
    confirmPassword: confirmPassword
  };

  // Now you can use userData object to access the entered values
  console.log(userData);

  if(password ==confirmPassword){
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      const usersRef = ref(database, 'users');
      const newUserRef = push(usersRef);
      await set(newUserRef, {
        username: username,
        email: email,
        first: 0
      });
      // Here, you can handle the user registration success
      console.log('User registered:', user);
      showToast('User registered successfully');
      await sendEmailVerification(user);
      //const redirectUrl = `/setup?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`;
      window.location.href = "/signin";
    } catch (error) {
      // Handle registration errors
      console.error('Registration error:', error.message);
      if (error.code === 'auth/email-already-in-use') {
        showToast('Email is already in use.');
      } else if (error.code === 'auth/weak-password') {
        showToast('Password should be at least 6 characters.');
      } else {
        showToast('Registration failed. Please try again later.');
      }
    }
      console.log('Form submitted');
  }else{
      console.log('Password does not match, registration error');
      showToast('Password does not match, registration error');
    
  }
  };

  return (
    <div className="sign-up-container">
      <div className="left-side">
        <div className="left-text">
        <img src={TxtImage} alt="Image" className="text-image"/>
          
          <p className='text'>BeAware assists hearing-impaired individuals with secure sign-up and stream URL generation via user inputs, fostering accessibility goals.</p>
        </div>
        <img src={Image} alt="Image" className="left-image" />
      </div>
      <div className="right-side">
        <div className='right-side-content'>
        <h1 className="sign-up-title">Create an account</h1>
        <form onSubmit={handleSubmit} className="sign-up-form">
          <div className="form-field">
            <label htmlFor="username" className="form-label">
            </label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="email" className="form-label">
              
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder='Email Address'
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="password" className="form-label">
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="confirmPassword" className="form-label"> 
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              placeholder=' Confirm Password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="sign-up-button">
          Create Account
          </button>
          <p></p>
          <button onClick={handleGoogleSignIn} className="google-sign-in-button">Sign Up: Google</button>
          <h5 style={{padding:'10px', paddingLeft:'80px'}}>
            Don't have an account? <Link to ="/SignIn">Sign In</Link>
          </h5>
        </form>
      </div>
      </div>
      
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}