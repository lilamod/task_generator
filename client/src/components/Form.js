import React, { useState } from 'react';

function Form({ onGenerate }) {
  const [formData, setFormData] = useState({
    goal: '',
    users: '',
    constraints: '',
    template: 'web',
    risks: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
     setFormData({
      goal: '',
      users: '',
      constraints: '',
      template: 'web',
      risks: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Goal: <input name="goal" value={formData.goal} onChange={handleChange} required /></label>
      <label>Users (comma-separated): <input name="users" value={formData.users} onChange={handleChange} required /></label>
      <label>Constraints: <textarea name="constraints" value={formData.constraints} onChange={handleChange} required /></label>
      <label>Template: 
        <select name="template" value={formData.template} onChange={handleChange}>
          <option value="web">Web</option>
          <option value="mobile">Mobile</option>
          <option value="internal tool">Internal Tool</option>
        </select>
      </label>
      <label>Risks/Unknowns: <textarea name="risks" value={formData.risks} onChange={handleChange} /></label>
      <button type="submit">Generate Tasks</button>
    </form>
  );
}

export default Form;