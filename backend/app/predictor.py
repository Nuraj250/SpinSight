# Placeholder prediction strategy

previous_spins = []

def log_spin(result):
    if len(previous_spins) >= 100:
        previous_spins.pop(0)  # Keep only last 100 spins
    previous_spins.append(result)

def predict_next():
    if not previous_spins:
        return {"strategy": "random", "prediction": "unknown"}

    # Example prediction: return most recent pocket
    last_pocket = previous_spins[-1]["pocket"]
    return {
        "strategy": "repeat-last",
        "prediction": last_pocket
    }

def get_history():
    return previous_spins
