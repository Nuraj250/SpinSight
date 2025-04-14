import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const spinWheel = async () => {
  const res = await axios.get(`${BASE_URL}/spin`);
  return res.data;
};

export const getPrediction = async (strategy) => {
  const res = await axios.get(`${BASE_URL}/predict?strategy=${strategy}`);
  return res.data;
};
