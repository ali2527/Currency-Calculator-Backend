"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.CURRENCY_API_KEY;
const BASE_URL = 'https://api.freecurrencyapi.com/v1';
app.get('/currencies', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.get(`${BASE_URL}/currencies`, {
            params: { apikey: API_KEY }
        });
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch currencies' });
    }
}));
app.get('/convert', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to, amount } = req.query;
    if (!from || !to || !amount) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    try {
        const response = yield axios.get(`${BASE_URL}/latest`, {
            params: {
                apikey: API_KEY,
                base_currency: from,
                currencies: to
            }
        });
        const rate = response.data.data[to];
        const result = rate * parseFloat(amount);
        res.json({ rate, result });
    }
    catch (error) {
        res.status(500).json({ error: 'Conversion failed' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
