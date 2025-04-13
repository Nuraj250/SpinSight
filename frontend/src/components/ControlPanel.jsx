import React from 'react';

const ControlPanel = ({ onSpin }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <button onClick={onSpin}>🎡 Spin the Wheel</button>
    </div>
  );
};

export default ControlPanel;
