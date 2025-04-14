import React from 'react';

const StrategyComparison = ({ results }) => {
  if (!results.length) return null;

  return (
    <div className="card mt-4">
      <div className="card-header">📊 Strategy Comparison (1000 Spins Each)</div>
      <div className="card-body">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Strategy</th>
              <th>Total Wins</th>
              <th>Accuracy (%)</th>
              <th>Net Profit</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td>{r.strategy}</td>
                <td>{r.wins}</td>
                <td>{r.accuracy}%</td>
                <td className={r.net >= 0 ? 'text-success' : 'text-danger'}>
                  ${r.net}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StrategyComparison;
