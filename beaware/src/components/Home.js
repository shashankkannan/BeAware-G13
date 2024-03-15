import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import TxtImage from '../Assets/Vector.png';
import Image from '../Assets/SignUp.png'; 
function Toast({ message }) {
  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#333', color: '#fff', padding: '10px 20px', borderRadius: '5px', zIndex: '9999' }}>
      {message}
    </div>
  );
}
export const Home = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000); // Hide the toast after 3 seconds
  };

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    const storedEmail = sessionStorage.getItem('email');
    if (storedUsername && storedEmail) {
      setUsername(storedUsername);
      setEmail(storedEmail);
    } else {
      showToast('User not signed in. Redirecting to sign-in page...');
      setTimeout(() => {
        // Redirect to sign-in page
        window.location.href = '/signin'; 
      }, 5000);
    }
  }, []);
  
  const handleCreateStream = () => {
    window.location.href = '/setup';
  };

  return (
    <div className="sign-up-container">
      <div className="left-side">
        <div className="left-text">
        <img src={TxtImage} alt="Image" className="text-image"/>
       
          <p className='text'>Hi {username}, Welcome to BeAware dashboard, we are working on the page right now. Sorry for the inconvenience! </p>
        </div>
        <img src={Image} alt="Image" className="left-image" />
      </div>
      <div className="right-side">
      <button onClick={handleCreateStream} className="google-sign-in-button" style={{width:"100%"}}>Create Stream +</button><p></p>
      <button onClick={() => {sessionStorage.clear(); window.location.href='/signin'}} className="google-sign-in-button" style={{width:"100%"}}>Sign out</button>
      </div>
      
      {toastMessage && <Toast message={toastMessage} />}
    </div>
);
  }

export default Home;