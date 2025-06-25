import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      // ✅ Updated IP address for mobile access
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password,
      });

      if (response.data && response.data.admin) {
        alert('Admin login successful');
        navigate('/admin-dashboard');
      } else {
        alert('Login failed: Invalid response from server');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      alert(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="login">
      <h2>Admin Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default AdminLogin;
