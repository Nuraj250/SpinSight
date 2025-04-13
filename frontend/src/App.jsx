import React, { useState, useEffect, useRef } from 'react';
import WheelCanvas from './components/WheelCanvas';
import ControlPanel from './components/ControlPanel';
import ResultLog from './components/ResultLog';
import FrequencyChart from './components/FrequencyChart';
import { spinWheel, getPrediction } from './services/api';

const STRATEGIES = ["random", "repeat-last", "hot", "cold"];

const App = () => {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [strategy, setStrategy] = useState("random");
  const [prediction, setPrediction] = useState(null);
  const [balance, setBalance] = useState(100);
  const [betType, setBetType] = useState("number");
  const [wins, setWins] = useState(0);
  const [spins, setSpins] = useState(0);
  const [autoMode, setAutoMode] = useState(false);
  const [summary, setSummary] = useState(null);
  const [comparisonResults, setComparisonResults] = useState([]);
  const autoCounter = useRef(0);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const runSingleSpin = async (strategyOverride = null) => {
    const pred = await getPrediction(strategyOverride || strategy);
    setPrediction(pred);

    const spinData = await spinWheel();
    setResult(spinData);
    setHistory((prev) => [spinData, ...prev.slice(0, 99)]);

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

    return { win, spinData };
  };

  const startAutoplay = async () => {
    autoCounter.current = 0;
    setAutoMode(true);
    const startBalance = balance;
    let localWins = 0;

    while (autoCounter.current < 1000 && autoMode) {
      const { win } = await runSingleSpin();
      if (win) localWins++;
      autoCounter.current++;
      await delay(25); // fast loop
    }

    const endBalance = balance;
    setSummary({
      strategy,
      spins: autoCounter.current,
      wins: localWins,
      accuracy: ((localWins / autoCounter.current) * 100).toFixed(1),
      net: endBalance - startBalance,
    });

    setAutoMode(false);
  };

  const stopAutoplay = () => {
    setAutoMode(false);
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

  const compareStrategies = async () => {
    const results = [];

    for (const strat of STRATEGIES) {
      let tempBalance = 100;
      let tempWins = 0;

      for (let i = 0; i < 1000; i++) {
        const pred = await getPrediction(strat);
        const spinData = await spinWheel();

        let win = false;
        if (betType === "number") {
          win = pred.prediction === spinData.pocket;
          tempBalance += win ? 35 : -1;
        } else if (betType === "color") {
          win = spinData.color === pred.prediction;
          tempBalance += win ? 1 : -1;
        } else if (betType === "odd-even") {
          const actual = spinData.pocket === 0 ? "zero" : spinData.pocket % 2 === 0 ? "even" : "odd";
          win = pred.prediction === actual;
          tempBalance += win ? 1 : -1;
        }

        if (win) tempWins++;
      }

      results.push({
        strategy: strat,
        wins: tempWins,
        accuracy: (tempWins / 1000 * 100).toFixed(1),
        net: tempBalance - 100,
      });
    }

    setComparisonResults(results);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">🎯 SpinSight</h1>

      <div className="w-[420px] bg-black rounded-2xl shadow-xl">
        <WheelCanvas spinResult={result} history={history} />
      </div>

      <ControlPanel
        onSpin={runSingleSpin}
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

      <div className="flex gap-3 mt-4">
        <button
          onClick={autoMode ? stopAutoplay : startAutoplay}
          className={`px-4 py-2 rounded ${
            autoMode ? "bg-red-600 hover:bg-red-700" : "bg-lime-600 hover:bg-lime-700"
          } transition`}
        >
          {autoMode ? "⛔ Stop Autoplay" : "▶️ Start 1000 Spins"}
        </button>

        <button
          onClick={compareStrategies}
          className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-600 transition"
        >
          🧪 Compare Strategies
        </button>

        <button
          onClick={downloadCSV}
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 transition"
        >
          ⬇️ Export History
        </button>
      </div>

      {summary && (
        <div className="mt-6 text-center bg-gray-800 p-4 rounded-xl w-full max-w-lg">
          <h3 className="text-xl font-semibold mb-2">📈 Autoplay Summary</h3>
          <p><strong>Strategy:</strong> {summary.strategy}</p>
          <p><strong>Spins:</strong> {summary.spins}</p>
          <p><strong>Wins:</strong> {summary.wins}</p>
          <p><strong>Accuracy:</strong> {summary.accuracy}%</p>
          <p><strong>Net Profit:</strong> ${summary.net}</p>
        </div>
      )}

      {comparisonResults.length > 0 && (
        <div className="mt-6 w-full max-w-3xl bg-gray-800 p-4 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">📊 Strategy Comparison (1000 spins each)</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-1">Strategy</th>
                <th>Wins</th>
                <th>Accuracy</th>
                <th>Net Profit</th>
              </tr>
            </thead>
            <tbody>
              {comparisonResults.map((res, idx) => (
                <tr key={idx} className="border-t border-gray-700">
                  <td className="py-1">{res.strategy}</td>
                  <td>{res.wins}</td>
                  <td>{res.accuracy}%</td>
                  <td className={res.net >= 0 ? "text-green-400" : "text-red-400"}>${res.net}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ResultLog history={history} />
      <FrequencyChart history={history} />
    </div>
  );
};

export default App;
