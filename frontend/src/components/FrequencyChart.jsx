import React from 'react';

const FrequencyChart = ({ history }) => {
  const frequency = Array(37).fill(0);
  history.forEach(item => frequency[item.pocket]++);

  const max = Math.max(...frequency);

  return (
    <div className="mt-5">
      <h5 className="text-warning">📊 Pocket Frequency</h5>
      <div className="d-flex align-items-end gap-1" style={{ height: 120, overflowX: 'auto' }}>
        {frequency.map((count, i) => (
          <div key={i} className="text-center" style={{ width: 14 }}>
            <div
              style={{
                height: `${(count / (max || 1)) * 100}%`,
                backgroundColor:
                  i === 0 ? 'green' :
                  [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(i)
                    ? 'red' : 'black',
                width: '100%',
                borderRadius: '3px'
              }}
            />
            <small className="d-block text-muted" style={{ fontSize: '10px' }}>{i}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequencyChart;
