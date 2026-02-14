import React, { useState, useEffect } from 'react';
import api from '../api';

function Status() {
  const [status, setStatus] = useState({ backend: 'Checking...', database: 'Checking...', llm: 'Checking...' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkHealth = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/health');  
        setStatus(res.data);
      } catch (err) {
        setError('Failed to fetch status. Backend may be down.');
        setStatus({ backend: 'Down', database: 'Down', llm: 'N/A' });
      } finally {
        setLoading(false);
      }
    };
    checkHealth();
  }, []);

  if (loading) return <div>Loading status...</div>;

  return (
    <div className="status">
      <h1>System Status</h1>
      {error && <p className="error">{error}</p>}
      <p>Backend: {status.backend}</p>
      <p>Database: {status.database}</p>
      <p>LLM Connection: {status.llm}</p>
    </div>
  );
}

export default Status;