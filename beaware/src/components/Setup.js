import React, { useEffect, useState } from 'react';
import {getDatabase, ref, push, set, orderByChild, onChildAdded,equalTo, child, query, get } from 'firebase/database';
import { initializeApp } from "firebase/app";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../css/SignUp.css';
import Image from '../Assets/SignUp.png'; 
import TxtImage from '../Assets/Vector.png';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export default function Setup() {
  const [streamname, setstreamname] = useState('');
  const [colorhex, setcolorhex] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000); // Hide the toast after 3 seconds
  };

  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
  if (file) {
    setSelectedImageName(file.name);
  } else {
    // setSelectedImageName('');
  }
  };

  const Imagedel = (event) => {
    setSelectedImageName('');
  }

const handlehome = (event)=> {
  window.location.href = "/home";
}
const handleSubmit = async (event) => {
  event.preventDefault();
  if (!streamname || !colorhex || !selectedImageName) {
    if(!selectedImageName){
      showToast('Please choose a logo image');
      return;
    }

    showToast('Please fill in all required fields');
    return;
  }
  if (!/^#[0-9A-F]{6}$/i.test(colorhex)) {
    showToast('Please enter a valid hexadecimal color code');
    return;
  }
  try {
    

    // Retrieve the user based on the provided email
    const usersRef = ref(database, 'users');
    const userQuery = query(usersRef, orderByChild('email'), equalTo(email));
    const userSnapshot = await get(userQuery);
    
    if (!userSnapshot.exists()) {
      console.log('User does not exist with this email');
      // Handle error, show toast message, etc.
      return;
    }
    
    
    // Get the user ID
    const userId = Object.keys(userSnapshot.val())[0]; // Assuming there's only one user per email
    
    // Check if the streams node exists for the user, if not, create it
    const userStreamsRef = ref(database, `users/${userId}/streams`);
    const userStreamsSnapshot = await get(userStreamsRef);

    if (!userStreamsSnapshot.exists()) {
      // Streams node doesn't exist, create it
      await set(userStreamsRef, {});
    }

    // Store the stream name and color hex under the user's streams node
    const streamRef = ref(database, `users/${userId}/streams/${streamname}`);
    const streamSnapshot = await get(streamRef);

    if (streamSnapshot.exists()) {
      console.log('Stream name already exists');
      showToast('Stream name already exists');
      return;
    }

    // Upload the selected file to Firebase Storage
    const file = event.target.elements.imageUpload.files[0];
    const fileName = file.name;
    const storage = getStorage(app);
    const storageRef1 = storageRef(storage, `uploads/${fileName}`);
    await uploadBytes(storageRef1, file);

    // Retrieve the download URL of the uploaded file
    const fileURL = await getDownloadURL(storageRef1);
    const streamData = {
      colorhex: colorhex,
      logoURL: fileURL
    };
    
    await set(streamRef, streamData);
    console.log('Stream data stored successfully!');
    showToast('Stream is online');
  } catch (error) {
    console.error('Error storing stream data:', error);
    // Handle error, show toast message, etc.
  }
};
  const handleHexChange = (e) => {
    const hex = e.target.value;
    setcolorhex(hex);
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
        <h3 className="sign-up-title">Welcome {username}</h3>  
        <h1 className="sign-up-title1">Setup your stream</h1>
        <form onSubmit={handleSubmit} className="sign-up-form">
        <div className="form-field">
  <label htmlFor="imageUpload" className="form-label">Upload Image</label>
  <div className="file-input-container">
    <input
      type="file"
      id="imageUpload"
      accept="image/*"
      onChange={handleImageChange}
      className="file-input"
    />
    <button className="custom-button">Choose File</button>
    
  </div>
  {selectedImageName && (
  <div>
    <p className='si'>{selectedImageName}</p>
    <h5 className="delete" onClick={Imagedel}>delete</h5>
  </div>
)}
</div>
          <div className="form-field">
            <label htmlFor="streamname1" className="form-label">
            </label>
            <input
              type="text"
              id="streamname1"
              value={streamname}
              placeholder='Stream Name'
              onChange={(e) => setstreamname(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="colorHex" className="form-label">
            </label>
            <input
              type="text"
              id="colorHex"
              required
              value={colorhex}
              onChange={handleHexChange}
              placeholder='Hexcode'
              className="form-input"
            />  
          </div>
          <div className="form-field1">
                <label htmlFor="colorPicker" className="form-label">
                Choose Color 
                </label>
                    <input
                        type="color"
                        id="colorPicker"
                        required
                        value={colorhex}
                        onChange={(e) => setcolorhex(e.target.value)}
                        className="form-input"
                    />
            
              <div className="color-option red" style={{ backgroundColor: '#ff0000' }} onClick={() => setcolorhex('#ff0000')}></div>
              <div className="color-option green" style={{ backgroundColor: '#00ff00' }} onClick={() => setcolorhex('#00ff00')}></div>
              <div className="color-option blue" style={{ backgroundColor: '#0000ff' }} onClick={() => setcolorhex('#0000ff')}></div>
            </div>
            
          <button type="submit" className="sign-up-button">
          Setup Stream
          </button>
          
        </form>
        <p></p>
        <button onClick={handlehome} className="google-sign-in-button">
          Home
          </button>
      </div>
      </div>
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}