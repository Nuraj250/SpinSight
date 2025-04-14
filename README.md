# 🎰 SpinSight – Smart Roulette Simulator

**SpinSight** is a casino-style roulette simulator powered by React and Python. It includes smart prediction strategies, user guessing, and automatic 1000-spin simulations to test performance. Perfect for testing strategies, visualizing outcomes, and simulating real casino logic.

---

## 🔮 Features

- 🎡 Realistic wheel animation (popup modal)
- 🧠 Strategy-based predictions (Random, Repeat Last, Hot, Cold)
- 🔢 Manual number guessing (0–36)
- 🏁 1000-spin autoplay with win/loss tracking
- 📊 Frequency and history chart
- 💸 Balance tracker & accuracy meter
- 🎉 Win animation with confetti + sound
- 📋 Strategy comparison (accuracy & net gain)
- ⚙️ Built with React, Bootstrap, Flask

---

## 🛠️ Tech Stack

| Frontend | Backend |
|----------|---------|
| React + Bootstrap | Python + Flask |
| Konva.js (for wheel) | REST API (spin + predict) |
| Axios | Deep learning / rule-based strategy logic |
| Confetti + SoundFX | JSON logging |

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js `v18+`
- Python `3.9+`

---

### 📦 Installation

```bash
# Clone this repo
git clone https://github.com/yourusername/spinsight.git
cd spinsight

# Frontend Setup
cd frontend
npm install

# Backend Setup
cd ../backend
python -m venv venv
source venv/bin/activate  # (or venv\Scripts\activate on Windows)
pip install -r requirements.txt
```

---

### ▶️ Running the App

In two terminals:

```bash
# Terminal 1: Backend
cd backend
python main.py

# Terminal 2: Frontend
cd frontend
npm start
```

App runs at: http://localhost:3000  
Backend runs at: http://localhost:8000

---

## 🧠 Strategies Explained

| Strategy      | Logic Description                           |
|---------------|----------------------------------------------|
| Random        | Pure RNG, no memory                         |
| Repeat Last   | Predicts same as last spin                  |
| Hot           | Picks most frequently hit number so far     |
| Cold          | Picks least hit number (0-included)         |

---

## 🎨 Customization

- Add your own prediction strategies in `/backend/strategy.py`
- Style the app via `App.css` (Bootstrap + custom casino theme)
- Replace chip icon: `/src/assets/chip.png`
- Add leaderboard in `StrategyComparison.jsx`

---

## 🔊 Media Credits

- 🎵 Sound: `win.mp3` from freesound.org
- 🎨 Icon: Custom generated casino chip
- 🎡 Wheel: Konva.js animation with ball physics

---

## 📁 Project Structure

```
spinsight/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── assets/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── strategy.py
│   ├── utils/
│   └── requirements.txt
```

---

## 📖 User Guide

See `USER_GUIDE.md` for detailed manual (how to play, strategy usage, tips).

---

## 📄 License

MIT © 2025 – Built with ❤️ for roulette strategy testing