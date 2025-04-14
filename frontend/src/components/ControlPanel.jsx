import React from 'react';
import chipIcon from '../assets/chip.png';

const ControlPanel = ({
  onSpin,
  onAuto,
  strategy,
  setStrategy,
  betType,
  setBetType,
  userGuess,
  setUserGuess
}) => {
  return (
    <div className="card p-4 mb-4 text-light shadow">
      <div className="d-flex flex-wrap gap-3 mb-3 justify-content-center">
        <button className="btn btn-success" onClick={onSpin}>
          <img src={chipIcon} alt="chip" className="chip-icon" />
          Spin the Wheel
        </button>

        <button className="btn btn-warning" onClick={onAuto}>
          <img src={chipIcon} alt="chip" className="chip-icon" />
          Start 1000 Spins
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label text-warning">Strategy</label>
        <select className="form-select bg-dark text-light border-warning" value={strategy} onChange={(e) => setStrategy(e.target.value)}>
          <option value="random">🎲 Random</option>
          <option value="repeat-last">🔁 Repeat Last</option>
          <option value="hot">🔥 Hot Number</option>
          <option value="cold">❄️ Cold Number</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label text-warning">Bet Type</label>
        <select className="form-select bg-dark text-light border-warning" value={betType} onChange={(e) => setBetType(e.target.value)}>
          <option value="number">Number</option>
          <option value="color">Color</option>
          <option value="odd-even">Odd / Even</option>
        </select>
      </div>

      <div>
        <label className="form-label text-warning">Your Guess (0–36)</label>
        <input
          type="number"
          min="0"
          max="36"
          className="form-control bg-dark text-light border-warning"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
