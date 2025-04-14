import React, { useState } from 'react';
import './App.css';
import ControlPanel from './components/ControlPanel';
import ResultLog from './components/ResultLog';
import FrequencyChart from './components/FrequencyChart';
import StrategyComparison from './components/StrategyComparison';
import WheelCanvas from './components/WheelCanvas';
import Confetti from 'react-confetti';
import useSound from 'use-sound';
import { spinWheel, getPrediction } from './services/api';
import winSound from './assets/win.mp3';
import chipIcon from './assets/chip.png';

const App = () => {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [strategy, setStrategy] = useState('random');
  const [betType, setBetType] = useState('number');
  const [prediction, setPrediction] = useState(null);
  const [balance, setBalance] = useState(100);
  const [wins, setWins] = useState(0);
  const [spins, setSpins] = useState(0);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [showWin, setShowWin] = useState(false);
  const [playWinSound] = useSound(winSound, { volume: 0.5 });

  const runSingleSpin = async () => {
    const pred = await getPrediction(strategy);
    const spinData = await spinWheel();
    setShowModal(true);

    const actual = spinData;
    const guessedCorrectly = parseInt(userGuess) === actual.pocket;
    setShowWin(guessedCorrectly);
    if (guessedCorrectly) playWinSound();

    let win = false;
    if (betType === "number") {
      win = pred.prediction === actual.pocket;
      setBalance((b) => b + (win ? 35 : -1));
    } else if (betType === "color") {
      win = pred.prediction === actual.color;
      setBalance((b) => b + (win ? 1 : -1));
    } else if (betType === "odd-even") {
      const actualType = actual.pocket === 0 ? "zero" : actual.pocket % 2 === 0 ? "even" : "odd";
      win = pred.prediction === actualType;
      setBalance((b) => b + (win ? 1 : -1));
    }

    if (win) setWins(w => w + 1);
    setSpins(s => s + 1);
    setPrediction(pred);
    setResult(actual);
    setHistory(prev => [actual, ...prev.slice(0, 99)]);
  };

  const runAutoSpin = async () => {
    let localWins = 0;
    let localBalance = balance;
    const autoHistory = [];

    for (let i = 0; i < 1000; i++) {
      const pred = await getPrediction(strategy);
      const spinData = await spinWheel();
      const guess = pred.prediction;
      const actual = spinData;

      let win = false;
      if (betType === "number") {
        win = guess === actual.pocket;
        localBalance += win ? 35 : -1;
      } else if (betType === "color") {
        win = guess === actual.color;
        localBalance += win ? 1 : -1;
      } else if (betType === "odd-even") {
        const actualType = actual.pocket === 0 ? "zero" : actual.pocket % 2 === 0 ? "even" : "odd";
        win = guess === actualType;
        localBalance += win ? 1 : -1;
      }

      if (win) localWins++;
      autoHistory.push(actual);
    }

    setBalance(localBalance);
    setWins(w => w + localWins);
    setSpins(s => s + 1000);
    setHistory(prev => [...autoHistory.slice(-100), ...prev.slice(0, 100 - autoHistory.length)]);
    setComparisonResults(prev => [
      ...prev,
      {
        strategy,
        spins: 1000,
        accuracy: (localWins / 1000) * 100,
        net: localBalance - balance
      }
    ]);
  };

  const accuracy = spins > 0 ? ((wins / spins) * 100).toFixed(1) : 0;

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 text-warning">🎰 SpinSight</h1>

      {result && (
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3 text-center" style={{ backgroundColor: '#2c2c44', border: '2px solid gold' }}>
              <h5 className="mb-2 text-light">🎡 Spinning Wheel</h5>
              <WheelCanvas resultPocket={result.pocket} glow={showWin} onAnimationEnd={() => setShowModal(false)} />
              {showWin && (
                <>
                  <Confetti />
                  <div className="text-warning mt-3">
                    <h4>🎉 You Guessed It Right!</h4>
                    <p className="text-success">You Win!</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <ControlPanel
        onSpin={runSingleSpin}
        onAuto={runAutoSpin}
        strategy={strategy}
        setStrategy={setStrategy}
        betType={betType}
        setBetType={setBetType}
        userGuess={userGuess}
        setUserGuess={setUserGuess}
      />

      <div className="text-center mt-3">
        {result && (
          <p>
            <strong>Last Result:</strong>{' '}
            <span className="text-info">{result.pocket} ({result.color})</span>
          </p>
        )}

        <p>
          <strong>Prediction:</strong>{' '}
          {prediction ? prediction.prediction : <span className="text-muted">unknown</span>}
        </p>

        <p className="d-flex justify-content-center align-items-center gap-2">
          <img src={chipIcon} alt="chip" className="chip-icon" />
          <span className="badge bg-success">Balance: ${balance}</span>
        </p>

        {spins > 0 && (
          <div className="text-center" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <label className="form-label">🎯 Accuracy</label>
            <div className="meter">
              <span style={{ width: `${accuracy}%` }} />
            </div>
            <small className="text-light">{accuracy}% over {spins} spin{spins > 1 ? 's' : ''}</small>
          </div>
        )}
      </div>

      <ResultLog history={history} />
      <FrequencyChart history={history} />
      <StrategyComparison results={comparisonResults} />
    </div>
  );
};

export default App;
