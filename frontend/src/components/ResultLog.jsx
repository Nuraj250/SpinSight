import React from 'react';

const ResultLog = ({ history }) => {
  return (
    <div className="mt-4">
      <h5 className="text-warning">🎲 Spin History</h5>
      <div className="d-flex flex-wrap gap-2">
        {history.slice(0, 20).map((item, index) => (
          <span
            key={index}
            className={`badge rounded-pill px-3 py-2 ${
              item.color === 'red' ? 'bg-danger' :
              item.color === 'black' ? 'bg-dark border border-light' :
              'bg-success'
            }`}
          >
            {item.pocket}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ResultLog;
