# app/simulator.py

import random

ROULETTE_SEQUENCE = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6,
    27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
    16, 33, 1, 20, 14, 31, 9, 22, 18, 29,
    7, 28, 12, 35, 3, 26
]

COLOR_MAP = {
    0: "green",
    **{n: "red" for n in [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3]},
    **{n: "black" for n in [15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26]}
}

def simulate_spin():
    # Simulate spin parameters
    wheel_speed = random.uniform(2.0, 4.0)  # rev/sec
    ball_speed = random.uniform(6.0, 10.0)  # rev/sec
    friction = random.uniform(0.85, 0.95)   # deceleration rate

    revolutions = 0
    current_speed = ball_speed

    # Simulate deceleration over time
    while current_speed > wheel_speed:
        revolutions += current_speed
        current_speed *= friction

    # Total revolutions * 37 pockets, modulo to get landing index
    landing_index = int((revolutions * 37) % 37)

    # Simulate slight bounce randomness (+/- 1 to 3 pockets)
    bounce = random.randint(-3, 3)
    final_index = (landing_index + bounce) % 37

    pocket = ROULETTE_SEQUENCE[final_index]
    color = COLOR_MAP[pocket]

    return {
        "pocket": pocket,
        "color": color,
        "wheel_speed": round(wheel_speed, 2),
        "ball_speed": round(ball_speed, 2),
        "friction": round(friction, 3),
        "revolutions": round(revolutions, 2),
        "landing_index": final_index
    }
