import React, { useState } from 'react';
import api from '../../api';

function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');  // For success messages
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');  // Clear previous messages
    try {
      const res = await api.post('/api/auth/login', { email, password });
      setMessage(res.data.message || 'Login successful!');  // Display backend message or fallback
      onLogin(res.data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <p>Don't have an account? <button type="button" onClick={onSwitch}>Register</button></p>
    </form>
  );
}

export default Login;