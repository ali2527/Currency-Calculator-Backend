import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const API_KEY = process.env.CURRENCY_API_KEY;
const BASE_URL = 'https://api.freecurrencyapi.com/v1';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await axios.get(`${BASE_URL}/currencies`, {
      params: { apikey: API_KEY }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch currencies' });
  }
}
