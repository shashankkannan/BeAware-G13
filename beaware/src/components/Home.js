import React, { useEffect, useState } from 'react';
import '../css/ManageProfile.css';
import TxtImage from '../Assets/edit.png';
import userpic from '../Assets/user.png'; 
import Image from '../Assets/SignUp.png'; 
import profileicon from '../Assets/profile.png';
import streamicon from '../Assets/stream.png'; 
import dash from '../Assets/dashboard.png'; 
import dowl from '../Assets/download.png'; 
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

export const Home = () => {
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
  const DownloadIcon = ({ onClick }) => (
    <img
    style={{ width: "50px", height: "50px", transform: "scale(0.5)" }}
    src = {dowl}
      
      onClick={onClick}
    />
  );
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
  
  const handleDownload = (fileName) => {
    // Assuming the PDF files are stored in the public directory
    const filePath = `/pdfs/${fileName}.pdf`; // Adjust the file path accordingly
    const link = document.createElement("a");
    link.href = filePath;
    link.download = `${fileName}.pdf`;
    link.click();
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
           <div className="menu-item">
             <img src={streamicon} alt="Streams Icon" />
             <span><a className="ap" onClick={handlestream}>Streams</a></span>
           </div>
           <br></br>
           <div className="menu-itemselect">
             <img src={dash} alt="Dashboard Icon" />
             <span><a className="ap1" onClick={handleHome}>Dashboard</a></span>
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

            
<div style={{ marginLeft: "100px", width: "fit-content", borderRadius: "30px", boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" }}>
  <table style={{ width: "100%", height: "100%", paddingTop: "40px" }}>
    <tr>
      <td style={{ width: "30%", verticalAlign: "top", paddingLeft: "40px", paddingBottom: "40px", paddingRight: "40px"}}>
        <img src={userpic} style={{ width: "50px", height: "50px", transform: "scale(1.0)" }} alt="Edit userpic" />
      </td>
      <td style={{ width: "70%", verticalAlign: "top" , paddingRight: "40px"}}>
        <tr>
          <td style={{ fontWeight: "bold" }}>Name: </td>
          <td>&nbsp;{username}</td>
        </tr>
        <div style={{ marginBottom: '10px'}}></div>
        <tr>
          <td style={{ fontWeight: "bold" }}>Email Id:</td>
          <td>&nbsp;{email}</td>
        </tr>
      </td>
    </tr>
  </table>
</div>


  


            {/* All the streamssssssssssssssssssssssss are displayed hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee */}
            {/* style={{paddingLeft:"30px", paddingTop:"80px"}} */}
                  <div style={{ width: '300px', height: '300px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', paddingLeft:"200px", paddingTop:"80px", borderRadius: '32px' }}>
                    <h2 style={{ textAlign: 'center', color: '#1B4375' }}>Welcome Back!</h2>
                    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ marginBottom: '10px' }}>
                        <h5 style={{ marginBottom: '5px', color: '#1B4375' }}>Stream Name</h5>
                        <input type="text" style={{ width: '250px', height: '30px', border: '1px solid #ccc', borderRadius: '15px', padding: '10px', color: '#1B4375' }} />
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <h5 style={{ marginBottom: '5px', color: '#1B4375' }}>URL</h5>
                        <input type="text" style={{ width: '250px', height: '30px', border: '1px solid #ccc', borderRadius: '15px', padding: '10px', color: '#1B4375' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* Assuming you have the URL for the QR code */}
                        {/* <QRCode value="YOUR_QR_CODE_URL" size={60} /> */}
                      </div>
                    </div>
                  </div>
            
           
          </td>

          <td style={{ width: "20%", height: "100%", paddingRight:"40px", verticalAlign: "top"}}>

            {/* Right of Right */}
            
            
            
  <p></p>
  <div style={{ marginBottom: '50px'}}></div>
  <div style={{ marginRight: "30px"}}>
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
      
      console.log("Manage Streams clicked")
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
</div>
  <p></p>
  <div style={{ marginRight: "50px" }}></div>
  <div style={{ marginRight: "30px" }}>
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
        console.log("Delete Account clicked")
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
</div>


<div style={{ marginBottom: '100px' }}></div>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <table style={{ width: '100%', height: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th style={{ border: '1px solid black',  textAlign: 'center' }}>Files</th>
        <th style={{ border: '1px solid black',  textAlign: 'center' }}>Downloads</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ border: '1px solid black', textAlign: 'center' }}>Instruction Sheet 1</td>
        <td style={{ border: '1px solid black', textAlign: 'center' }}>
          <div style={{  justifyContent: 'center' }}> {/* Centering the icon */}
            <DownloadIcon onClick={() => handleDownload('example')} />
          </div>
        </td>
      </tr>
      <tr>
        <td style={{ border: '1px solid black', textAlign: 'center' }}>Instruction Sheet 2</td>
        <td style={{ border: '1px solid black', textAlign: 'center' }}>
          <div style={{  justifyContent: 'center' }}> {/* Centering the icon */}
            <DownloadIcon onClick={() => handleDownload('example')} />
          </div>
        </td>
      </tr>
      <tr>
        <td style={{ border: '1px solid black', textAlign: 'center' }}>Instruction Sheet 3</td>
        <td style={{ border: '1px solid black', textAlign: 'center' }}>
          <div style={{  justifyContent: 'center' }}> {/* Centering the icon */}
            <DownloadIcon onClick={() => handleDownload('example')} />
          </div>
        </td>
      </tr>
      
      {/* Add more rows as needed */}
    </tbody>
  </table>
</div>


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

export default Home;