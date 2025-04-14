import React from 'react';

const ControlPanel = ({
  onSpin,
  strategy,
  setStrategy,
  betType,
  setBetType,
  autoMode,
  handleAutoplay,
  handleCompare,
  downloadCSV
}) => {
  return (
    <div className="card p-3 mb-4">
      <div className="mb-3">
        <button onClick={() => onSpin()} className="btn btn-success me-2">
          🎡 Spin the Wheel
        </button>
        <button
          onClick={handleAutoplay}
          className={`btn ${autoMode ? 'btn-danger' : 'btn-warning'} me-2`}
        >
          {autoMode ? '⛔ Stop Autoplay' : '▶️ Start 1000 Spins'}
        </button>
        <button onClick={handleCompare} className="btn btn-outline-primary me-2">
          🧪 Compare Strategies
        </button>
        <button onClick={downloadCSV} className="btn btn-outline-secondary">
          ⬇️ Export CSV
        </button>
      </div>

      <div className="row">
        <div className="col-md-6 mb-2">
          <label className="form-label">Strategy</label>
          <select className="form-select" value={strategy} onChange={(e) => setStrategy(e.target.value)}>
            <option value="random">Random</option>
            <option value="repeat-last">Repeat Last</option>
            <option value="hot">Hot</option>
            <option value="cold">Cold</option>
          </select>
        </div>
        <div className="col-md-6 mb-2">
          <label className="form-label">Bet Type</label>
          <select className="form-select" value={betType} onChange={(e) => setBetType(e.target.value)}>
            <option value="number">Number</option>
            <option value="color">Color</option>
            <option value="odd-even">Odd/Even</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
