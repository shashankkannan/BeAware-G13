import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import '../css/SignUp.css';
import Image from '../Assets/SignUp.png'; 
import TxtImage from '../Assets/Vector.png';
import { getDatabase, ref, push, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional


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
      const usersRef = ref(database, 'users');
      const newUserRef = push(usersRef);
      await set(newUserRef, {
        username: username,
        email: email,
      });
      // Here, you can handle the user registration success
      console.log('User registered:', user);
      window.location = '/signin';
    } catch (error) {
      // Handle registration errors
      console.error('Registration error:', error.message);
    }
      console.log('Form submitted');
  }else{
      console.log('Password does not match, registration error');
    
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
        </form>
      </div>
      </div>
    </div>
  );
}