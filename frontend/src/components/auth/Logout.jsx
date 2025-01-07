import { useEffect } from 'react';
import { axiosInstance } from '@/core/api';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/core/context/UserContext';

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useUser();
  useEffect(() => {
    const response = axiosInstance.post(`user/logout/blacklist/`, {
      refresh_token: localStorage.getItem('refresh_token'),
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axiosInstance.defaults.headers['Authorization'] = null;

    logout();

    navigate('/login');
  });

  return (
    <div>
      <h1>SignOut</h1>
    </div>
  );
}
