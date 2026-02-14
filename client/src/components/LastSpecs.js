import React from 'react';

function LastSpecs({ specs, onSelect }) {
  return (
    <div>
      <h2>Last 5 Specs</h2>
      <ul>
        {specs.map((spec, i) => (
          <li key={i} onClick={() => onSelect(spec)} style={{ cursor: 'pointer' }}>
            {spec.goal} ({spec.template})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LastSpecs;
