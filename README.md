# 🎯 SpinSight – Realistic Roulette Prediction Simulator

SpinSight is a powerful, interactive roulette prediction simulator built with **React** and **Python (FastAPI)**. It simulates a real-world roulette wheel using physics-driven logic and visualizations, offering AI-based prediction strategies and analytics.

---

## 🧠 Features

### 🎡 Visual Roulette Wheel
- Built with **react-konva**
- Animated wheel and ball motion
- Highlights **hot** (frequent) and **cold** (rare/unseen) numbers visually

### 🎯 Prediction System
- Supports multiple prediction strategies:
  - `random`
  - `repeat-last`
  - `hot`
  - `cold`
- Prediction displayed and compared against result

### 🎰 Bet Types
- Choose bet types:
  - `number`
  - `color` (red/black/green)
  - `odd/even`

### 💰 Balance & Accuracy Tracking
- Tracks player balance (starting from $100)
- Tracks total wins, total spins, and prediction accuracy %

### 🔁 Autoplay Mode
- Simulate **1000 spins automatically** using current strategy
- Real-time updating of balance, win rate, and results

### 📊 Strategy Comparison
- Run **side-by-side 1000-spin simulation** for each strategy
- Shows: win %, total wins, net profit/loss

### 📜 Spin History
- Log of previous spins with:
  - Pocket number
  - Color
  - Ball speed
  - Wheel speed
  - Friction

### 📈 Frequency Chart
- Interactive bar chart using `chart.js`
- Visualizes frequency of numbers landed

### 📥 Export to CSV
- One-click download of full spin history

### 🔲 Fullscreen Wheel Mode
- Toggle fullscreen for immersive visual experience

---

## 🛠 Tech Stack

| Frontend       | Backend       |
|----------------|---------------|
| React          | Python        |
| Konva (canvas) | FastAPI       |
| Chart.js       | Uvicorn       |
| Axios          |               |

---

## 🚀 Getting Started

### ▶️ Backend (Python + FastAPI)
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # or source venv/bin/activate
pip install -r requirements.txt
python -m app.main  # Runs with uvicorn under the hood
```

### ▶️ Frontend (React + Bootstrap)
```bash
cd frontend
npm install
npm start
```

---

## 📦 Coming Soon
- 🏆 Leaderboard (save top strategy runs)
- 🎮 Manual betting system (number, color input)
- 📊 Deployment to Vercel / Heroku
- 🤖 AI-optimized adaptive strategies

---

## 🧠 Created by
Built with ❤️ to simulate, analyze, and understand roulette spin dynamics.

Ready to predict the spin? Let SpinSight do the math 🎯