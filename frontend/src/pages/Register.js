import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // ✅ Use the correct IP address for mobile access
      const BASE_URL = 'http://localhost:5000';

      await axios.post(`${BASE_URL}/api/register`, { username, password });
      alert('Registered successfully!');
      // You can redirect or reset fields after successful registration if needed.
      setUsername('');
      setPassword('');
    } catch (error) {
      alert('Error occurred: ' + error.message);
    }
  };

  return (
    <div className="login">
      <h2>User Registration</h2>
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
