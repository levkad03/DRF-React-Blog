import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Axios';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const response = axiosInstance.post(`user/logout/blacklist/`, {
      refresh_token: localStorage.getItem('refresh_token'),
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axiosInstance.defaults.headers['Authorization'] = null;
    navigate('/login');
  });

  return (
    <div>
      <h1>SignOut</h1>
    </div>
  );
}
