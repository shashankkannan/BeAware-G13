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
import {getDatabase, ref, push, set, orderByChild, onChildAdded,equalTo, child, query, get } from 'firebase/database';



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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const Streams = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [streamsData, setStreamsData] = useState([]);
  const [selectedStream, setSelectedStream] = useState(null);
  const [isBlockVisible, setIsBlockVisible] = useState(false);  


 

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
      fetchStreamsData(storedEmail)
    } else {
      showToast('User not signed in. Redirecting to sign-in page...');
      setTimeout(() => {
        // Redirect to sign-in page
        window.location.href = '/signin'; 
      }, 3000);
    }
    
  }, []);

  const fetchStreamsData = async (userEmail) => {
    const streamsRef = ref(database, 'users');
    
    try {
      const queryRef = query(streamsRef, orderByChild('email'), equalTo(userEmail));
      const snapshot = await get(queryRef);

      const userData = snapshot.val();
      const streamsArray = [];

      for (const userId in userData) {
        const user = userData[userId];
        if (user.streams) {
          for (const streamName in user.streams) {
            const stream = user.streams[streamName];
            const streamData = {
              name: streamName,
              color: stream.colorhex,
              logo: stream.logoURL
            };
            streamsArray.push(streamData);
          }
        }
      }

      setStreamsData(streamsArray);
    } catch (error) {
      console.error("Error fetching streams data:", error);
    }
  };

  const handleStreamClick = (stream) => {
    setSelectedStream(stream);
    setIsBlockVisible(true);
  };
  const handleCloseBlock = () => {
    setIsBlockVisible(false);
    setSelectedStream(null);
  };

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

            <p></p>



            {/* All the streamssssssssssssssssssssssss are displayed hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee */}
           
            <div className = "scrollv" >
                    {streamsData.map((stream, index) => (
                      <div key={index} className="stream-item"  onClick={() => handleStreamClick(stream)}>
                        <table style={{ width: '100%', border: "1px solid grey" }}>
                          <tr>
                            <td style={{ width: '50%' }}>
                              <div>
                                <h3>{stream.name}</h3>
                                <p>{stream.color}</p>
                              </div>
                            </td>
                            <td style={{ width: '50%' }}>
                                
                              <img src={stream.logo} alt={stream.logo} style={{ width: "50px", height: "50px", transform: "scale(1.0)" }} />
                            </td>
                          </tr>
                        </table>
                      </div>
                    ))}
                  </div>
           
          </td>

          <td style={{ width: "20%", height: "100%", paddingRight:"40px", verticalAlign: "top"}}>

            {/* Right of Right */}
            
            
            
  <p></p>
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
  <div style={{ display: "flex", justifyContent:"center", alignItems: "center", marginTop: '90px',  border: '1px solid #ccc', padding: '10px', borderRadius: '5px', display: selectedStream ? 'block' : 'none' }}>
  {selectedStream && (
    <>
      <h3>{selectedStream.name}</h3>
      
      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(selectedStream.logo)}`} alt={selectedStream.name} style={{ width: '100px', height: '100px' }} />
      
      <p>{selectedStream.color}</p>
      <p></p>
      <button style={{ 
      border: "2px solid grey", 
      width: "100%", 
      padding: "10px", 
      cursor: "pointer", 
      outline: "none",
      backgroundColor: "transparent",
      borderRadius: "20px",
      transition: "transform 0.3s ease"
    }}  onClick={handleCloseBlock}  onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#457b9d";
        e.target.style.transform = "scale(1.01)"; // Increase scale
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "transparent";
        e.target.style.transform = "scale(1)"; // Restore original scale
      }}>Close</button>
    </>
  )}
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

export default Streams;
