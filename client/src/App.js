import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import api from './api';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Form from './components/Form';
import TaskList from './components/TaskList';
import Export from './components/Export';
import LastSpecs from './components/LastSpecs';
import Home from './components/Home';
import Status from './components/Status';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentSpec, setCurrentSpec] = useState(null);
  const [lastSpecs, setLastSpecs] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [view, setView] = useState('login');

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
  };

  return (
    <Router>
      <div className="app">
        <nav>
          <Link to="/">Home</Link> | <Link to="/status">Status</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/status" element={<Status />} />
          <Route path="/app" element={
            <>
              {!isAuthenticated ? (
                <>
                  <h1>Tasks Generator</h1>
                  {view === 'login' ? (
                    <Login onLogin={handleLogin} onSwitch={() => setView('register')} />
                  ) : (
                    <Register onLogin={handleLogin} onSwitch={() => setView('login')} />
                  )}
                </>
              ) : (
                <>
                  <h1>Tasks Generator</h1>
                  <button onClick={handleLogout}>Logout</button>
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
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;