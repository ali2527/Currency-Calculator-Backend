import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const API_KEY = process.env.CURRENCY_API_KEY;
const BASE_URL = 'https://api.freecurrencyapi.com/v1';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { from, to, amount } = req.query;

  if (!API_KEY) {
    res.status(500).json({ error: 'API key not set' });
    return;
  }
  if (!from || !to || !amount) {
    res.status(400).json({ error: 'Missing required parameters' });
    return;
  }

  try {
    const response = await axios.get(`${BASE_URL}/latest`, {
      params: {
        apikey: API_KEY,
        base_currency: from,
        currencies: to,
      },
    });

    const rate = response.data.data[to as string];
    const result = rate * parseFloat(amount as string);

    res.status(200).json({ rate, result });
  } catch (error) {
    res.status(500).json({ error: 'Conversion failed' });
  }
}
