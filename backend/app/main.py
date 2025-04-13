from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.simulator import simulate_spin
from app.predictor import predict_next

app = FastAPI()

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "SpinSight Roulette Backend"}

@app.get("/spin")
def spin():
    result = simulate_spin()
    return result

@app.get("/predict")
def predict():
    prediction = predict_next()
    return prediction

@app.get("/history")
def history():
    return get_history()