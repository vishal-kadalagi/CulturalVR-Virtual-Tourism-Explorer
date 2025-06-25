import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      // ✅ Use the correct IP your mobile can reach
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      if (response.data && response.data.user) {
        alert('Login successful');
        navigate('/user-dashboard');
      } else {
        alert('Login failed: Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="login">
      <h2>User Login</h2>
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

export default UserLogin;
