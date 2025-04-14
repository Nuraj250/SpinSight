# 🧑‍🏫 SpinSight – User Manual

Welcome to **SpinSight**, a smart roulette simulator. This guide helps you understand how to use the app and interpret results.

---

## 🎮 How to Use

1. **Choose Strategy**
   - Random, Repeat Last, Hot, Cold

2. **Select Bet Type**
   - Number (exact pocket), Color, Odd/Even

3. **Enter Guess (Optional)**
   - Enter your prediction number (e.g., 17)

4. **Spin the Wheel**
   - Press "🎲 Spin the Wheel"
   - A popup wheel will animate and show result
   - If your guess is correct → 🎉 You win!

5. **Track Your Performance**
   - Balance updates (start at $100)
   - Accuracy (%) shown below
   - Win animation plays if guessed right

---

## 🤖 Autoplay 1000 Spins

Use the **"Start 1000 Spins"** button to run a simulation:

- Strategy is used for predictions
- Balance is updated each round
- Results are added to Strategy Comparison table

---

## 📊 Understanding the UI

- 🎲 **Spin History** – Last 100 outcomes
- 📊 **Pocket Frequency** – Histogram of hit numbers
- 🏅 **Strategy Comparison** – Accuracy + net gain from auto runs

---

## 💰 Game Rules

| Bet Type | Win Payout | Lose Penalty |
|----------|-------------|---------------|
| Number   | +35         | -1            |
| Color    | +1          | -1            |
| Odd/Even | +1          | -1            |

---

## ⚙️ FAQ

**Q: Why do I lose even if prediction is close?**  
A: Only exact matches count in number betting.

**Q: Can I customize strategies?**  
A: Yes, edit `backend/strategy.py` and restart server.

**Q: Can I export results?**  
A: Use browser screenshot or export to CSV (optional build-in support coming soon).

---

## 🧪 Tips for Best Use

- Start with **Random** to see baseline
- Try **Hot** or **Cold** after 50 spins
- Use 1000-spin to test performance over time
- Track which strategy gives most net gain