import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeftRight, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw,
  Calculator,
  Clock,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Globe
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrency, currencies, convertCurrency } from '../../utils/currency';

interface ExchangePageProps {
  selectedCurrency: string;
  isOnline: boolean;
  onAddPendingTransaction: (transaction: any) => void;
}

export const ExchangePage: React.FC<ExchangePageProps> = ({
  selectedCurrency,
  isOnline,
  onAddPendingTransaction
}) => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('ZWL');
  const [amount, setAmount] = useState('');
  const [exchangeRates, setExchangeRates] = useState<Record<string, any>>({});
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock exchange rate updates
  useEffect(() => {
    const updateRates = () => {
      const rates: Record<string, any> = {};
      currencies.forEach(currency => {
        rates[currency.code] = {
          rate: currency.rate * (0.98 + Math.random() * 0.04), // ±2% fluctuation
          trend: Math.random() > 0.5 ? 'up' : 'down',
          change: (Math.random() * 2 - 1).toFixed(2) // -1% to +1%
        };
      });
      setExchangeRates(rates);
      setLastUpdated(new Date());
    };

    updateRates();
    const interval = setInterval(updateRates, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const convertedAmount = amount ? convertCurrency(parseFloat(amount), fromCurrency, toCurrency) : 0;
  const currentRate = exchangeRates[toCurrency]?.rate || currencies.find(c => c.code === toCurrency)?.rate || 1;

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleExchange = () => {
    if (!amount || parseFloat(amount) <= 0) return;

    const transaction = {
      type: 'exchange',
      amount: parseFloat(amount),
      fromCurrency,
      toCurrency,
      rate: currentRate,
      convertedAmount,
      timestamp: new Date()
    };

    if (isOnline) {
      // Process immediately
      console.log('Processing exchange:', transaction);
    } else {
      // Queue for later
      onAddPendingTransaction(transaction);
    }
  };

  const popularPairs = [
    { from: 'USD', to: 'ZWL', label: 'USD → ZWL' },
    { from: 'USD', to: 'ZAR', label: 'USD → ZAR' },
    { from: 'GBP', to: 'USD', label: 'GBP → USD' },
    { from: 'EUR', to: 'USD', label: 'EUR → USD' },
    { from: 'USD', to: 'KES', label: 'USD → KES' },
    { from: 'USD', to: 'NGN', label: 'USD → NGN' }
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ArrowLeftRight size={24} className="text-purple-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Currency Exchange</h1>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={16} className="mr-1" />
          Updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      {/* Exchange Calculator */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Exchange Calculator</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setLastUpdated(new Date())}
            className="flex items-center"
          >
            <RefreshCw size={16} className="mr-1" />
            Refresh Rates
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* From Currency */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <select 
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" 
                placeholder="Enter amount"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center lg:flex-col">
            <motion.button
              onClick={handleSwapCurrencies}
              className="p-3 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeftRight size={20} className="text-purple-600" />
            </motion.button>
          </div>

          {/* To Currency */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <select 
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">You'll receive</label>
              <div className="w-full p-3 border rounded-lg bg-gray-50">
                <span className="text-lg font-semibold text-gray-900">
                  {amount ? formatCurrency(convertedAmount, toCurrency) : formatCurrency(0, toCurrency)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Exchange Rate</span>
            <div className="flex items-center">
              {exchangeRates[toCurrency]?.trend === 'up' ? (
                <TrendingUp size={14} className="text-green-500 mr-1" />
              ) : (
                <TrendingDown size={14} className="text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                exchangeRates[toCurrency]?.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {exchangeRates[toCurrency]?.change || '0.00'}%
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">
              1 {fromCurrency} = {currentRate.toFixed(2)} {toCurrency}
            </span>
            <span className="text-sm text-gray-500">Live rate</span>
          </div>
        </div>

        {/* Exchange Button */}
        <Button 
          onClick={handleExchange}
          disabled={!amount || parseFloat(amount) <= 0}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
        >
          {isOnline ? 'Exchange Now' : 'Queue for Exchange'}
        </Button>

        {!isOnline && (
          <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-center">
            <AlertCircle size={16} className="text-orange-600 mr-2" />
            <span className="text-sm text-orange-700">
              You're offline. Exchange will be processed when connection is restored.
            </span>
          </div>
        )}
      </Card>

      {/* Popular Exchange Pairs */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Exchange Pairs</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {popularPairs.map((pair, index) => (
            <motion.button
              key={pair.label}
              onClick={() => {
                setFromCurrency(pair.from);
                setToCurrency(pair.to);
              }}
              className="p-3 border rounded-lg hover:bg-gray-50 transition-colors text-left"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="font-medium text-gray-900">{pair.label}</div>
              <div className="text-sm text-gray-500">
                1 {pair.from} = {(exchangeRates[pair.to]?.rate || currencies.find(c => c.code === pair.to)?.rate || 1).toFixed(2)} {pair.to}
              </div>
            </motion.button>
          ))}
        </div>
      </Card>

      {/* Live Exchange Rates */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Live Exchange Rates</h3>
          <div className="flex items-center text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Live
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currencies.slice(1, 7).map((currency, index) => (
            <motion.div
              key={currency.code}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-lg mr-2">{currency.flag}</span>
                  <span className="font-medium">{currency.code}</span>
                </div>
                <div className="flex items-center">
                  {exchangeRates[currency.code]?.trend === 'up' ? (
                    <TrendingUp size={14} className="text-green-500" />
                  ) : (
                    <TrendingDown size={14} className="text-red-500" />
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-1">
                1 USD = {(exchangeRates[currency.code]?.rate || currency.rate).toFixed(2)} {currency.code}
              </div>
              <div className={`text-xs font-medium ${
                exchangeRates[currency.code]?.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {exchangeRates[currency.code]?.change || '0.00'}% today
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};