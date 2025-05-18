import React, { useEffect, useState } from 'react';
import axios from 'axios';
import currecy3 from './assets/Currency/cur-bg.gif';
import { motion } from 'framer-motion';

export const Currency = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState(0);
  const [exchange, setExchange] = useState(null);

  const totalcurrency = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'CNY', 'SGD'];

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const rate = res.data.rates[toCurrency];
        setExchange(rate);
      } catch (err) {
        console.error('Error fetching exchange rate:', err);
      }
    };
    fetchRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchange !== null) {
      setConverted((amount * exchange).toFixed(2));
    }
  }, [amount, exchange]);

  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden font-roboto px-4 bg-black text-white">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-black to-blue-900 opacity-80 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full opacity-20 blur-3xl animate-spin-slow z-0"></div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-3xl md:text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 uppercase tracking-wider"
      >
        Currency Converter 💱
      </motion.h2>

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="z-10 max-w-4xl w-full bg-white/10 border border-white/20 backdrop-blur-md rounded-xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-6"
      >
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img src={currecy3} alt="Currency" className="w-full h-72 object-contain" />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 space-y-4">
          <div>
            <label className="block text-sm mb-1">Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value < 0 ? 1 : e.target.value)}
              placeholder="Enter amount"
              className="w-full bg-white/10 border border-white/20 text-white px-4 py-2 rounded outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">From Currency:</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white px-4 py-2 rounded outline-none cursor-pointer"
            >
              {totalcurrency.map((item, idx) => (
                <option key={idx} value={item} className="text-black">
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">To Currency:</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white px-4 py-2 rounded outline-none cursor-pointer"
            >
              {totalcurrency.map((item, idx) => (
                <option key={idx} value={item} className="text-black">
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold">
              {amount} <span className="text-pink-400">{fromCurrency}</span> ={' '}
              <span className="text-blue-400">{converted}</span> {toCurrency}
            </h3>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="relative z-10 mt-10 text-sm text-white/70">
        Developed with 💻 by <span className="font-semibold text-pink-300">Saktrix</span> © {new Date().getFullYear()}
      </div>
    </div>
  );
};
