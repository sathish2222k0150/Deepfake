// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import App from './App';
import Deepfake from './components/pages/deepfake';
import Login from './Login';

function Main() {
  return (
    <Router>
      <Routes>
        {/* Define different paths for Deepfake and App */}
        <Route path="/" element={<Login />} />  {/* Login page */}
        <Route path="/deepfake" element={<Deepfake />} />  {/* Deepfake page */}
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  );
}

export default Main;
