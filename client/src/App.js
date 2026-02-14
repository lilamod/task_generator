import React, { useState, useEffect } from 'react';
import api from './api';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Form from './components/Form';
import TaskList from './components/TaskList';
import Export from './components/Export';
import LastSpecs from './components/LastSpecs';
import Status from './components/Status';  
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentSpec, setCurrentSpec] = useState(null);
  const [lastSpecs, setLastSpecs] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [view, setView] = useState('login');
  const [page, setPage] = useState('main');  // New: for page switching (main, home, status)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchLastSpecs();
  }, [isAuthenticated]);

  const fetchLastSpecs = async () => {
    setError('');
    setMessage('');
    try {
      const res = await api.get('/api/task/last5');
      setLastSpecs(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load last specs.');
    }
  };

  const handleGenerate = async (data) => {
    setError('');
    setMessage('');
    try {
      const res = await api.post('/api/task/generate', data);
      setCurrentSpec(res.data);
      setMessage(res.data.message || 'Spec generated successfully!');
      fetchLastSpecs();
    } catch (err) {
      setError(err.response?.data?.error || 'Generation failed.');
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setView('app');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setCurrentSpec(null);
    setLastSpecs([]);
    setView('login');
    setPage('main');
  };

  if (!isAuthenticated) {
    return (
      <div className="app">
        <h1>Tasks Generator</h1>
        {view === 'login' ? (
          <Login onLogin={handleLogin} onSwitch={() => setView('register')} />
        ) : (
          <Register onLogin={handleLogin} onSwitch={() => setView('login')} />
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <nav>
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('status')}>Status</button>
        <button onClick={() => setPage('main')}>App</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      {page === 'home' && (
        <div className="home">
          <h1>Welcome to Tasks Generator</h1>
          <p>Follow these steps to get started:</p>
          <ol>
            <li>Register or login to your account.</li>
            <li>Fill out the form with your feature idea (goal, users, constraints).</li>
            <li>Generate user stories and engineering tasks.</li>
            <li>Edit, reorder, and export your results.</li>
          </ol>
          <button onClick={() => setPage('main')}>Get Started</button>
        </div>
      )}
      {page === 'status' && <Status />}
      {page === 'main' && (
        <>
          <h1>Tasks Generator</h1>
          <Form onGenerate={handleGenerate} />
          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}
          {currentSpec && (
            <>
              <TaskList spec={currentSpec} setSpec={setCurrentSpec} />
              <Export spec={currentSpec} />
            </>
          )}
          <LastSpecs specs={lastSpecs} onSelect={setCurrentSpec} />
        </>
      )}
    </div>
  );
}

export default App;