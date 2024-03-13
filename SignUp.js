import React, { useState } from 'react';
import './SignUp.css';
import Image from './SignUp.png'; // Update this with your actual image path
import TxtImage from './Vector.png';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle sign-up logic here
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
             // onChange={(e) => setUsername(e.target.value)}
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
