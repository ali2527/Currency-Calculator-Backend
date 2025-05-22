import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const API_KEY = process.env.CURRENCY_API_KEY;
const BASE_URL = 'https://api.freecurrencyapi.com/v1';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (!API_KEY) {
    res.status(500).json({ error: 'API key not set' });
    return;
  }

  try {
    const response = await axios.get(`${BASE_URL}/currencies`, {
      params: { apikey: API_KEY },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch currencies' });
  }
}
