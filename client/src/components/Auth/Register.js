import React, { useState } from 'react';
import api from '../../api';

function Register({ onLogin, onSwitch }) {
  const [email, setEmail] = useState('');  // Assuming email for register; adjust if using username
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');  // For success messages
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');  // Clear previous messages
    try {
      const res = await api.post('/api/auth/register', { email, password });
      setMessage(res.data.message || 'Registration successful! Please login.');  // Display backend message or fallback
      // Optional: Auto-login after register if backend provides token
      if (res.data.token && onLogin) onLogin(res.data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <p>Already have an account? <button type="button" onClick={onSwitch}>Login</button></p>
    </form>
  );
}

export default Register;