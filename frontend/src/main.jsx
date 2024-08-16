import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import Single from './components/Single.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/post/:slug" element={<Single />} />
      </Routes>
      <Footer />
    </React.StrictMode>
  </Router>,
);
