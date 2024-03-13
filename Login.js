import React, { useState } from 'react';
import styles from './Login.module.css';
import logo from './Group.png';
import log from './Vector.png'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission here
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
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;



