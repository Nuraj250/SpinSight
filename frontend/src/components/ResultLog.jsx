import React from 'react';

const ResultLog = ({ history }) => {
  return (
    <div style={{ marginTop: 30 }}>
      <h3>🧾 Spin History</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {history.map((item, i) => (
          <li key={i} style={{ marginBottom: 4 }}>
            <strong>{item.pocket}</strong> ({item.color}) — 
            Speed: {item.ball_speed} rev/s, Friction: {item.friction}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultLog;
