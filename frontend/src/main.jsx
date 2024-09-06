import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { Login } from './components/auth';
import { Register } from './components/auth';
import { Logout } from './components/auth';
import { Single } from './components/posts';
import { Search } from './components/posts';
import Admin from './Admin.jsx';
import { Create } from './components/admin';

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
        <Route path="/search" element={<Search />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/create" element={<Create />} />
      </Routes>
      <Footer />
    </React.StrictMode>
  </Router>,
);
