import React, { useEffect, useState } from 'react';
import '../css/ManageProfile.css';
import TxtImage from '../Assets/edit.png';
import userpic from '../Assets/user.png'; 
import Image from '../Assets/SignUp.png'; 
import profileicon from '../Assets/profile.png';
import streamicon from '../Assets/stream.png'; 
import dash from '../Assets/dashboard.png'; 
import eye from '../Assets/eye.png'; 
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from 'firebase/auth';
import {getDatabase, ref, push, set, orderByChild, onChildAdded,equalTo, child, query, get } from 'firebase/database';

const streamsData = [
    { name: 'Stream 1', description: 'Description for Stream 1', image: 'image1.jpg' },
    { name: 'Stream 2', description: 'Description for Stream 2', image: 'image2.jpg' },
    { name: 'Stream 3', description: 'Description for Stream 3', image: 'image3.jpg' },
    { name: 'Stream 4', description: 'Description for Stream 4', image: 'image4.jpg' },
    { name: 'Stream 5', description: 'Description for Stream 5', image: 'image5.jpg' },
    { name: 'Stream 1', description: 'Description for Stream 1', image: 'image1.jpg' },
    { name: 'Stream 2', description: 'Description for Stream 2', image: 'image2.jpg' },
    { name: 'Stream 3', description: 'Description for Stream 3', image: 'image3.jpg' },
    { name: 'Stream 4', description: 'Description for Stream 4', image: 'image4.jpg' },
    { name: 'Stream 5', description: 'Description for Stream 5', image: 'image5.jpg' }
  ];

function Toast({ message }) {
  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#333', color: '#fff', padding: '10px 20px', borderRadius: '5px', zIndex: '9999' }}>
      {message}
    </div>
  );
}

export const Streams = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [toastMessage, setToastMessage] = useState('');

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
      }, 3000);
    }
    const passForm = document.getElementById('passform');
    const delf = document.getElementById('deleteform');
    if(delf) {
      delf.style.display = 'none';
    }
    if (passForm) {
      passForm.style.display = 'none';
    }
  }, []);

  const handlestream = () => {
    window.location.href = '/streams';
  };
  const handleHome= () => {
    window.location.href = '/home';
  };
  

  

  

  
  
  return (
    <div>

    <table style={{ width: "100%", height: "100%"}}>
  <tr>
    <td className="signupd" style={{ width: "20%"}}>
      
      {/* MENUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU ITEMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM */}
      <div className="menu-item">
             <img src={profileicon} alt="Profile Icon" />
             <span><a className="ap" href='/manage'>Profile</a></span>
           </div>
           <br></br>
           <div className="menu-itemselect">
             <img src={streamicon} alt="Streams Icon" />
             <span><a className="ap1" onClick={handlestream}>Streams</a></span>
           </div>
           <br></br>
           <div className="menu-item">
             <img src={dash} alt="Dashboard Icon" />
             <span><a className="ap" onClick={handleHome}>Dashboard</a></span>
           </div>
           <button onClick={() => {sessionStorage.clear(); window.location.href='/signin'}} className="logout-btn1">Logout</button>
      
    </td>
    <td className="rtab" colspan="2">
      <div class="rtab">
      <table style={{ width: "100%", height: "100%" }}>
        <tr>
          <td style={{ width: "50%", verticalAlign: "top"}}>


            {/* Left of the right */}
            

{/* Profileeeeeeeeeeeeeeeeeeeeeeeeeeeeee sectionnnnnnnnnnnnnn withhhhhhhhh theeeeeeeeeeeee avatarrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr */}

            
            <div>
              <table style={{ width: "100%", height: "100%" , paddingTop: "40px"}}>
                <tr>
                <h1></h1>
                <td style={{ width: "30%", verticalAlign: "top", paddingLeft:"90px"}}>
                  
                  
                <img src={userpic} style={{ width: "50px", height: "50px", transform: "scale(1.0)" }} alt="Edit userpic" />

                </td>
                <td style={{ width: "70%", verticalAlign: "top"}}>
                  
                  <tr>{username}</tr>
                  <p></p>
                  <tr>{email}</tr>
                </td>
                </tr>
                
              </table>

            </div>

            <p></p>



            {/* All the streamssssssssssssssssssssssss are displayed hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee */}
           
            <div className = "scrollv" >
                    {streamsData.map((stream, index) => (
                      <div key={index} className="stream-item" style={{ marginBottom: '20px' }} onClick={() => showToast(stream.name)}>
                        <table style={{ width: '100%' }}>
                          <tr>
                            <td style={{ width: '50%' }}>
                              <div>
                                <h3>{stream.name}</h3>
                                <p>{stream.description}</p>
                              </div>
                            </td>
                            <td style={{ width: '50%' }}>
                              <img src={stream.image} alt={stream.name} style={{ display: 'block', margin: 'auto' }} />
                            </td>
                          </tr>
                        </table>
                      </div>
                    ))}
                  </div>
           
          </td>

          <td style={{ width: "20%", height: "100%", paddingRight:"10px", verticalAlign: "top"}}>

            {/* Right of Right */}
            
            
            
  <p></p>
  <button 
    style={{ 
      border: "2px solid grey", 
      width: "100%", 
      padding: "10px", 
      cursor: "pointer", 
      outline: "none",
      backgroundColor: "transparent",
      borderRadius: "20px",
      transition: "transform 0.3s ease"
    }} 
    onClick={() => 
      {
      
      console.log("Mange Streams clicked")
      window.location.href = "/setup"
    }
   }
   onMouseEnter={(e) => {
    e.target.style.backgroundColor = "#457b9d";
    e.target.style.transform = "scale(1.07)"; // Increase scale
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "transparent";
    e.target.style.transform = "scale(1)"; // Restore original scale
  }}
  >
    Manage Streams
  </button>
  <p></p>
  <button 
    style={{ 
      border: "2px solid grey", 
      width: "100%", 
      padding: "10px", 
      cursor: "pointer", 
      outline: "none",
      backgroundColor: "transparent",
      borderRadius: "20px",
      transition: "transform 0.3s ease"
    }} 
    onClick={() => 
      {
      
        console.log("Change password clicked")
        const profileForm = document.getElementById("profileform");
        const delForm = document.getElementById('deleteform');
        const passForm = document.getElementById('passform');
        if(delForm) {
          delForm.style.display = 'block';
        }
        
        if (profileForm) 
        {
          profileForm.style.display = "none";
        }
        if (passForm) {
          passForm.style.display = 'none';
      }
      }

    }
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = "#457b9d";
      e.target.style.transform = "scale(1.07)"; // Increase scale
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = "transparent";
      e.target.style.transform = "scale(1)"; // Restore original scale
    }}
  >
    Delete Account
  </button>
  
</td>
        </tr>
      </table>
      </div>
    </td>
  </tr>
</table>

{toastMessage && <Toast message={toastMessage} />}
 </div>   
  );
}

export default Streams;
