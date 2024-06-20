import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar/TopBar.jsx';
import Login from './components/Login/Login.jsx';
import Dogs from './components/Dogs/Dogs.jsx';

// MAIN APP COMPONENT - routes to login and search page
const App = () => {

  return (
    <div className="app-container">
      <TopBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dogs/search" element={<Dogs />} />
      </Routes>
    </div>
  );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);