import React, { useState } from 'react';
import WheelCanvas from './components/WheelCanvas';
import ControlPanel from './components/ControlPanel';
import ResultLog from './components/ResultLog';
import FrequencyChart from './components/FrequencyChart';
import { spinWheel, getPrediction } from './services/api';

const App = () => {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [strategy, setStrategy] = useState("random");
  const [prediction, setPrediction] = useState(null);
  const [balance, setBalance] = useState(100);
  const [betType, setBetType] = useState("number");
  const [wins, setWins] = useState(0);
  const [spins, setSpins] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);

  const handleSpin = async () => {
    const pred = await getPrediction(strategy);
    setPrediction(pred);

    const spinData = await spinWheel();
    setResult(spinData);
    setHistory((prev) => [spinData, ...prev.slice(0, 49)]);

    let win = false;
    if (betType === "number") {
      win = pred.prediction === spinData.pocket;
      setBalance((b) => b + (win ? 35 : -1));
    } else if (betType === "color") {
      win = spinData.color === pred.prediction;
      setBalance((b) => b + (win ? 1 : -1));
    } else if (betType === "odd-even") {
      const actual = spinData.pocket === 0 ? "zero" : spinData.pocket % 2 === 0 ? "even" : "odd";
      win = pred.prediction === actual;
      setBalance((b) => b + (win ? 1 : -1));
    }

    if (win) setWins((w) => w + 1);
    setSpins((s) => s + 1);
  };

  const downloadCSV = () => {
    const csv = ["Pocket,Color,Ball Speed,Wheel Speed,Friction"];
    history.forEach((h) => {
      csv.push(`${h.pocket},${h.color},${h.ball_speed},${h.wheel_speed},${h.friction}`);
    });
    const blob = new Blob([csv.join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "spinsight-history.csv";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">🎯 SpinSight</h1>

      <div className={`transition-all ${fullScreen ? 'w-full h-screen' : 'w-[420px]'} bg-black rounded-2xl shadow-xl`}>
        <WheelCanvas spinResult={result} history={history} />
      </div>

      <button
        onClick={() => setFullScreen(!fullScreen)}
        className="mt-3 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 transition"
      >
        {fullScreen ? "Exit Fullscreen" : "Go Fullscreen"}
      </button>

      <ControlPanel
        onSpin={handleSpin}
        strategy={strategy}
        setStrategy={setStrategy}
        betType={betType}
        setBetType={setBetType}
      />

      {result && (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold">Result: {result.pocket} ({result.color})</h2>
          {prediction && (
            <p>
              Prediction: <strong>{prediction.prediction}</strong> –
              {prediction.prediction === result.pocket ? " ✅ Win" : " ❌ Miss"}
            </p>
          )}
          <p>Balance: <span className="text-green-400">${balance}</span></p>
          <p>Accuracy: <span className="text-yellow-400">{spins > 0 ? ((wins / spins) * 100).toFixed(1) : 0}%</span></p>
        </div>
      )}

      <ResultLog history={history} />
      <FrequencyChart history={history} />

      <button
        onClick={downloadCSV}
        className="mt-6 px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 transition"
      >
        ⬇️ Export History
      </button>
    </div>
  );
};

export default App;
