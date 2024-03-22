import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import log from './Vector.png';
import videoSource from './welcome.mp4';

const Login = () => {
  // eslint-disable-next-line
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [typedText, setTypedText] = useState('');
    const textToType = "BeAware assists hearing-impaired individuals with secure sign-up and stream URL generation via user inputs, fostering accessibility goals.";
    const [rotationAngle, setRotationAngle] = useState(0);
    const [showVideo, setShowVideo] = useState(true);
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission here
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
              <button type="submit" className={styles.buttonz}>
                Log in
              </button>
            </form>
            <p className={styles.signupz}>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    );
};

export default Login;
