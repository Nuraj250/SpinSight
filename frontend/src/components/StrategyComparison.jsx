import React from 'react';

const StrategyComparison = ({ results }) => {
  if (!results.length) return null;

  return (
    <div className="mt-5">
      <h5 className="text-warning">🏆 Strategy Comparison</h5>
      <table className="table table-dark table-striped border border-warning mt-3">
        <thead className="table-light text-dark">
          <tr>
            <th>Strategy</th>
            <th>Accuracy</th>
            <th>Net Gain</th>
            <th>Total Spins</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row, idx) => (
            <tr key={idx}>
              <td>{row.strategy}</td>
              <td>{row.accuracy.toFixed(1)}%</td>
              <td className={row.net >= 0 ? 'text-success' : 'text-danger'}>
                {row.net}
              </td>
              <td>{row.spins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StrategyComparison;
