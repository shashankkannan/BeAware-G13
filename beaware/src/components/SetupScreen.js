import React from 'react';
import SetupForm from './SetupForm';
import './style.css';

const InnerContainer = () => {
  return (
    <div className="container">
      <h1>Setup Your Stream</h1>
      <SetupForm />
    </div>
  );
};

const SetupScreen = () => {
  return (
    <div className="screen">
      <h2>
        Please upload your logo file<br></br>
        Provide a distinctive name for your stream<br></br>
        Select your desired color palette<br></br>
      </h2>
      <div className="image-container">
        <img src="/logo_1.jpg" alt="Logo" />
      </div>
      <div className="image-wrapper">
        <img src="/setup1.png" alt="Setup" />
      </div>
      <InnerContainer />
    </div>
  );
};

export default SetupScreen;
