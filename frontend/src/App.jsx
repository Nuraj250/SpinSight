import React, { useState, useRef } from 'react';
import ControlPanel from './components/ControlPanel';
import ResultLog from './components/ResultLog';
import FrequencyChart from './components/FrequencyChart';
import { spinWheel, getPrediction } from './services/api';
import StrategyComparison from './components/StrategyComparison';

const App = () => {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [strategy, setStrategy] = useState('random');
  const [betType, setBetType] = useState('number');
  const [prediction, setPrediction] = useState(null);
  const [balance, setBalance] = useState(100);
  const [wins, setWins] = useState(0);
  const [spins, setSpins] = useState(0);
  const [autoMode, setAutoMode] = useState(false);
  const [comparisonResults, setComparisonResults] = useState([]);
  const autoCounter = useRef(0);

  const runSingleSpin = async (customStrategy = null) => {
    const pred = await getPrediction(customStrategy || strategy);
    const spinData = await spinWheel();

    let win = false;
    const guess = pred.prediction;
    const actual = spinData;

    if (betType === "number") {
      win = guess === actual.pocket;
      setBalance((b) => b + (win ? 35 : -1));
    } else if (betType === "color") {
      win = guess === actual.color;
      setBalance((b) => b + (win ? 1 : -1));
    } else if (betType === "odd-even") {
      const actualType = actual.pocket === 0 ? "zero" : actual.pocket % 2 === 0 ? "even" : "odd";
      win = guess === actualType;
      setBalance((b) => b + (win ? 1 : -1));
    }

    if (win) setWins(w => w + 1);
    setSpins(s => s + 1);
    setPrediction(pred);
    setResult(actual);
    setHistory(prev => [actual, ...prev.slice(0, 99)]);
    return win;
  };

  const handleAutoplay = async () => {
    setAutoMode(true);
    autoCounter.current = 0;
    let localWins = 0;
    
    while (autoCounter.current < 1000 && autoMode) {
      const win = await runSingleSpin();
      if (win) localWins++;
      autoCounter.current++;
    }

    setAutoMode(false);
  };

  const handleCompare = async () => {
    const strategies = ['random', 'repeat-last', 'hot', 'cold'];
    const results = [];

    for (const strat of strategies) {
      let tempWins = 0;
      let tempBalance = 100;

      for (let i = 0; i < 1000; i++) {
        const pred = await getPrediction(strat);
        const spin = await spinWheel();
        let win = false;

        if (betType === "number") {
          win = pred.prediction === spin.pocket;
          tempBalance += win ? 35 : -1;
        } else if (betType === "color") {
          win = pred.prediction === spin.color;
          tempBalance += win ? 1 : -1;
        } else if (betType === "odd-even") {
          const actualType = spin.pocket === 0 ? "zero" : spin.pocket % 2 === 0 ? "even" : "odd";
          win = pred.prediction === actualType;
          tempBalance += win ? 1 : -1;
        }

        if (win) tempWins++;
      }

      results.push({
        strategy: strat,
        wins: tempWins,
        accuracy: ((tempWins / 1000) * 100).toFixed(1),
        net: tempBalance - 100
      });
    }

    setComparisonResults(results);
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
    <div className="container py-4">
      <h1 className="text-center mb-4">🎯 SpinSight</h1>

      <ControlPanel
        onSpin={runSingleSpin}
        strategy={strategy}
        setStrategy={setStrategy}
        betType={betType}
        setBetType={setBetType}
        autoMode={autoMode}
        handleAutoplay={handleAutoplay}
        handleCompare={handleCompare}
        downloadCSV={downloadCSV}
      />

      <div className="text-center mt-3">
        <p><strong>Last Result:</strong> {result?.pocket} ({result?.color})</p>
        <p><strong>Prediction:</strong> {prediction?.prediction}</p>
        <p><span className="badge bg-success">Balance: ${balance}</span></p>
        <p><span className="badge bg-primary">Accuracy: {spins > 0 ? ((wins / spins) * 100).toFixed(1) : 0}%</span></p>
      </div>

      <ResultLog history={history} />
      <FrequencyChart history={history} />
      <StrategyComparison results={comparisonResults} />
    </div>
  );
};

export default App;
