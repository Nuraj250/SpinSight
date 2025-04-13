import React from 'react';

const ControlPanel = ({ onSpin, strategy, setStrategy, betType, setBetType }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <button onClick={onSpin}>🎡 Spin the Wheel</button>

      <div style={{ marginTop: 10 }}>
        <label>Strategy: </label>
        <select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
          <option value="random">Random</option>
          <option value="repeat-last">Repeat Last</option>
          <option value="hot">Hot Numbers</option>
          <option value="cold">Cold Numbers</option>
        </select>
      </div>

      <div style={{ marginTop: 10 }}>
        <label>Bet Type: </label>
        <select value={betType} onChange={(e) => setBetType(e.target.value)}>
          <option value="number">Number</option>
          <option value="color">Color</option>
          <option value="odd-even">Odd/Even</option>
        </select>
      </div>
    </div>
  );
};

export default ControlPanel;
