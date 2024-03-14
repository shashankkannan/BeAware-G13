import React, { useState } from 'react';
import './style.css';

const SetupForm = () => {
  const [file, setFile] = useState(null);
  const [streamName, setStreamName] = useState('');
  const [color, setColor] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleStreamNameChange = (e) => {
    setStreamName(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { file, streamName, color });
    setFile(null);
    setStreamName('');
    setColor('#000000');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-input">
        <label htmlFor="file" className="upload-label">Upload Logo</label>
        <input type="file" id="file" onChange={handleFileChange} className="file-input" />
      </div>
      <div className="form-input">
        <input
          type="text"
          id="streamName"
          value={streamName}
          onChange={handleStreamNameChange}
          placeholder="Stream Name"
          className="text-input"
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          id="color"
          value={color}
          onChange={handleColorChange}
          placeholder="Color Hex Code"
          className="color-input"
        />
        <div className="color-preview" style={{ backgroundColor: color }} />
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default SetupForm;
