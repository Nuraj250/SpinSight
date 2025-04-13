import React, { useState } from 'react';
import WheelCanvas from './components/WheelCanvas';
import ControlPanel from './components/ControlPanel';
import { spinWheel } from './services/api';

const App = () => {
  const [result, setResult] = useState(null);

  const handleSpin = async () => {
    const spinData = await spinWheel();
    setResult(spinData);
  };

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h1>🎯 SpinSight</h1>
      <WheelCanvas spinResult={result} />
      <ControlPanel onSpin={handleSpin} />
      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>Result: {result.pocket} ({result.color})</h2>
        </div>
      )}
    </div>
  );
};

export default App;
