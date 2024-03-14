// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import ManageProfile from './components/ManageProfile'
import Setup from './components/Setup';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/manage" element={<ManageProfile />} />
          <Route path="/setup" element={<Setup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
