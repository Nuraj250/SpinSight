import React from 'react';

const ResultLog = ({ history }) => {
  return (
    <div className="card mt-4">
      <div className="card-header">📜 Spin History (Last 100)</div>
      <ul className="list-group list-group-flush">
        {history.map((item, idx) => (
          <li key={idx} className="list-group-item">
            <strong>{item.pocket}</strong> ({item.color}) – Ball: {item.ball_speed}, Wheel: {item.wheel_speed}, Friction: {item.friction}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultLog;
