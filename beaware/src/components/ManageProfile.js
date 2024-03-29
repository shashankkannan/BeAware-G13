import React, { useEffect, useState } from 'react';
import '../css/ManageProfile.css';
import TxtImage from '../Assets/edit.png';
import userpic from '../Assets/user.png'; 
import Image from '../Assets/SignUp.png'; 
import profileicon from '../Assets/profile.png';
import streamicon from '../Assets/stream.png'; 
import dash from '../Assets/dashboard.png'; 
import eye from '../Assets/eye.png';
import { initializeApp } from "firebase/app";
import { getAuth, reauthenticateWithCredential, updatePassword, sendPasswordResetEmail } from 'firebase/auth';
import {getDatabase, ref, push, set, orderByChild, onChildAdded,equalTo, child, query, get, update } from 'firebase/database';
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
function Toast({ message }) {
  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#333', color: '#fff', padding: '10px 20px', borderRadius: '5px', zIndex: '9999' }}>
      {message}
    </div>
  );
}

export const ManageProfile = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deleteText, setDeleteText] = useState('');
  const [ps,setps] = useState('');
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000); // Hide the toast after 3 seconds
  };

  
  useEffect(() => {
    
    const storedUsername = sessionStorage.getItem('username');
    const storedEmail = sessionStorage.getItem('email');
    const storedps = sessionStorage.getItem('password')
    if (storedUsername && storedEmail && storedps) {
      setUsername(storedUsername);
      setEmail(storedEmail);
      setps(storedps);
      console.log(ps);
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
  const handleEditUsername = async () => {
    const newUsername = prompt('Enter new username:');
    if (newUsername) {
      try {
        // Find the user with the current email
        const userQuery = query(ref(database, 'users'), orderByChild('email'), equalTo(email));
        const snapshot = await get(userQuery);
        
        if (snapshot.exists()) {
          // Get the user ID
          const userId = Object.keys(snapshot.val())[0];
  
          // Update the user's username in the database
          const updates = {};
          updates[`users/${userId}/username`] = newUsername;
          await update(ref(database), updates);
  
          // Update the username in the state
          setUsername(newUsername);
          showToast('Username updated successfully');
          sessionStorage.setItem('username', newUsername);
        } else {
          showToast('User not found');
        }
      } catch (error) {
        console.error('Error updating username:', error);
        showToast('Error updating username');
      }
    }
  };

  const handleEditEmail = () => {
    // Logic to handle editing email
    const newEmail = prompt('Enter new email:');
  if (newEmail) {
    setEmail(newEmail);
  };}
  const handleTextClick = (text) => {
    alert(`Clicked on ${text}`);
  };

  
  const handleChangePassword = () => {
    if (oldPassword !== email) {
      showToast("Your Email is incorrect.");
    }
    else{
      sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent successfully
        // console.log('Password reset email sent successfully');
        // showToast("Password reset email sent successfully")
        alert("Password reset email sent successfully")
      })
      .catch((error) => {
        // An error occurred while sending the password reset email
        console.error('Error sending password reset email:', error);
      });
    }

    
}

  

  return (
    <table style={{ width: "100%", height: "100%"}}>
  <tr>
    <td className="signupd" style={{ width: "20%"}}>
      
      
      <div className="menu-itemselect">
             <img src={profileicon} alt="Profile Icon" />
             <span><a className="ap1" href=''>Profile</a></span>
           </div>
           <br></br>
           <div className="menu-item">
             <img src={streamicon} alt="Streams Icon" />
             <span><a className="ap" onClick={handlestream}>Streams</a></span>
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
            

{/* Profileeeeeeeeeeeeeeeeeeeeeeeeeeeeee sectionnnnnnnnnnnnnn withhhhhhhhh theeeeeeeeeeeee avatarrrrrrrrrrrrrrrrrrrrrrrrrr */}

            
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



            {/* formsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss are hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee */}

            {/* PROFILEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE FORMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM */}

            <form id="profileform" style={{paddingLeft:"30px", paddingTop:"80px"}}>
             <div className="form-field">
               <label htmlFor="username">Username</label>
               <div className="input-with-icon" style={{ display: "flex", alignItems: "center" }}>
                 <input type="text" id="username" value={username} disabled />
                 <div style={{  }}>
                  <img style={{ width: "50px", height: "50px", transform: "scale(0.5)" }} src={TxtImage} alt="Edit Icon" onClick={handleEditUsername} />
                  </div>
               </div>
             </div>
             <div className="form-field">
               <label htmlFor="email">Email ID</label>
               <div className="input-with-icon" style={{ display: "flex", alignItems: "center" }}>
                 <input type="email" id="email" value={email} disabled />
                 <div style={{}}>
                 {/* <img style={{ width: "50px", height: "50px", transform: "scale(0.5)" }} src={TxtImage} alt="Edit Icon" onClick={handleEditEmail} /> */}
                 </div> 
               </div>
             </div>
           </form>


           {/* PASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS FORMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM */}



           <form id="passform" style={{ paddingLeft: "30px", paddingTop: "70px" }}>

                <div className="form-field">
                  <label htmlFor="oldpassword">Email</label>
                  <div className="input-with-icon" style={{ display: "flex", alignItems: "center" }}>
                    <input type="email" id="oldpassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required="true" />
                  </div>
                </div>

                

                <button style={{ 
      border: "2px solid grey", 
      width: "30%", 
      padding: "10px", 
      marginLeft: "150px",
      cursor: "pointer", 
      outline: "none",
      backgroundColor: "transparent",
      borderRadius: "20px"
    }}  onClick={() => handleChangePassword(email)
    
    
    
    }
    onMouseEnter={(e) => e.target.style.backgroundColor = "#457b9d"}
    onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}>Password Reset</button>
            </form>
          
         {/* PASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS FORMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM */}

         {/* DELETEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE FORMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM */}

         <form id="deleteform" style={{paddingLeft:"30px", paddingTop:"80px"}}>
  <div className="form-field">
    <label htmlFor="delete">Delete</label>
    <div className="input-with-icon" style={{ display: "flex", alignItems: "center" }}>
      <input type="text" id="delete" value={deleteText} onChange={(e) => setDeleteText(e.target.value)} />
    </div>
  </div>
  <div className="form-field">
    <p>Deleting your account will remove all your information from the database. This cannot be undone.</p>
  </div>
  <button 
    style={{ 
      border: "2px solid red", 
      width: "30%", 
      padding: "10px", 
      marginLeft: "150px",
      cursor: "pointer", 
      outline: "none",
      backgroundColor: "transparent",
      borderRadius: "20px"
    }}  
    onClick={() => {
      if (deleteText === "DELETE") {
        // Logic to delete the account
        alert("Account deleted successfully!");
      } else {
        alert("Please type 'DELETE' to confirm account deletion.");
      }
    }}
    onMouseEnter={(e) => e.target.style.backgroundColor = "#ff6961"}
    onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
  >
    Delete Account
  </button>
</form>


         {/* DELETEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE FORMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM */}
            
          </td>

          <td style={{ width: "20%", height: "100%", paddingRight:"40px", verticalAlign: "top"}}>

            {/* Right of Right */}
            
            
            <p></p>
            <div style={{ marginRight: "50px" }}></div>
  <div style={{ marginRight: "30px" }}></div>
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
        const passForm = document.getElementById('passform');
        const delForm = document.getElementById('deleteform');
        if(delForm) {
          delForm.style.display = 'none';
        }
        if (passForm) {
            passForm.style.display = 'none';
        }
        if (profileForm) 
        {
          profileForm.style.display = "block";
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
    Edit Profile
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
      const passForm = document.getElementById('passform');
      const delForm = document.getElementById('deleteform');
        if(delForm) {
          delForm.style.display = 'none';
        }
        if (passForm) {
            passForm.style.display = 'block';
        }
      if (profileForm) 
      {
        profileForm.style.display = "none";
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
    Change Password
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
  {toastMessage && <Toast message={toastMessage} />}
</table>
//     <div className="signupc">
//       <div className="ls">
//         <div className="lt">
//         <br></br>
//           <div className="menu-itemselect">
//             <img src={TxtImage} alt="Profile Icon" />
//             <span><a className="ap1" href=''>Profile</a></span>
//           </div>
//           <br></br>
//           <div className="menu-item">
//             <img src={TxtImage} alt="Streams Icon" />
//             <span><a className="ap" onClick={handlestream}>Streams</a></span>
//           </div>
//           <br></br>
//           <div className="menu-item">
//             <img src={TxtImage} alt="Dashboard Icon" />
//             <span><a className="ap" onClick={handleHome}>Dashboard</a></span>
//           </div>
//           <button onClick={() => {sessionStorage.clear(); window.location.href='/signin'}} className="logout-btn">Logout</button>
//         </div>
//       </div>
//       <div className="right-side">
     
//         <div className='right-half'>

//         <div className="vertical-text-container">
//             <input type="text" value="Text 1" onClick={() => handleTextClick("Text 1")} />
//             <input type="text" value="Text 2" onClick={() => handleTextClick("Text 2")} />
//             <input type="text" value="Text 3" onClick={() => handleTextClick("Text 3")} />
//           </div>
//         </div>
//         <form style={{paddingLeft:"30px"}}>
//             <div className="form-field">
//               <label htmlFor="username">Username</label>
//               <div className="input-with-icon">
//                 <input type="text" id="username" value={username} disabled />
//                 <img style={{backgroundColor:"grey" }} src={TxtImage} alt="Edit Icon" onClick={handleEditUsername} />
//               </div>
//             </div>
//             <div className="form-field">
//               <label htmlFor="email">Email ID</label>
//               <div className="input-with-icon">
//                 <input type="email" id="email" value={email} disabled />
//                 <img style={{backgroundColor:"grey" }} src={TxtImage} alt="Edit Icon" onClick={handleEditEmail} />
//               </div>
//             </div>
//           </form>
       
//       </div>
// {/* Form for editing username and email */}

      
      // {toastMessage && <Toast message={toastMessage} />}
      
//     </div>
    

   
    
  );
}

export default ManageProfile;
