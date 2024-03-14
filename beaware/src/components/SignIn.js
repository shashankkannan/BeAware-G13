import React, { useState } from 'react';
import styles from '../css/Login.module.css';
import logo from '../Assets/Group.png';
import log from '../Assets/Vector.png'
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully');
      // window.location.href = "/home"; // Change to the path where Home.js is rendered
      window.location = '/home';
    } catch (error) {
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
          </form>
          <p className={styles.signup}>
            Don't have an account? <Link to ="/SignUp">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;



