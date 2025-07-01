import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowLeftRight, 
  Globe, 
  RefreshCw, 
  Star, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign, 
  BarChart3,
  Target,
  Bell,
  Settings,
  Filter,
  Download,
  Zap,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Modal } from '../ui/Modal';
import { formatCurrency } from '../../utils/currency';

interface TradingPageProps {
  selectedCurrency: string;
  isOnline?: boolean;
  onAddPendingTransaction?: (transaction: any) => void;
}

interface CurrencyPair {
  id: string;
  from: string;
  to: string;
  rate: number;
  change24h: number;
  volume: number;
  bid: number;
  ask: number;
  spread: number;
}

interface TradeOrder {
  id: string;
  type: 'buy' | 'sell';
  pair: string;
  amount: number;
  rate: number;
  status: 'pending' | 'executed' | 'cancelled';
  timestamp: Date;
  fee: number;
}

interface MarketAlert {
  id: string;
  pair: string;
  condition: 'above' | 'below';
  targetRate: number;
  currentRate: number;
  active: boolean;
}

export const TradingPlatformPage: React.FC<TradingPageProps> = ({ 
  selectedCurrency, 
  isOnline = true,
  onAddPendingTransaction 
}) => {
  const [selectedTab, setSelectedTab] = useState<'trading' | 'orders' | 'alerts' | 'analytics'>('trading');
  const [selectedPair, setSelectedPair] = useState('KES/USD');
  const [tradeType, setTradeType] = useState<'market' | 'limit' | 'stop'>('market');
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock data for major African currency pairs
  const [currencyPairs, setCurrencyPairs] = useState<CurrencyPair[]>([
    {
      id: 'KES_USD',
      from: 'KES',
      to: 'USD',
      rate: 0.0077,
      change24h: 2.34,
      volume: 1250000,
      bid: 0.0076,
      ask: 0.0078,
      spread: 0.0002
    },
    {
      id: 'NGN_USD',
      from: 'NGN',
      to: 'USD',
      rate: 0.0013,
      change24h: -1.56,
      volume: 2100000,
      bid: 0.0012,
      ask: 0.0014,
      spread: 0.0002
    },
    {
      id: 'ZAR_USD',
      from: 'ZAR',
      to: 'USD',
      rate: 0.054,
      change24h: 0.87,
      volume: 980000,
      bid: 0.0539,
      ask: 0.0541,
      spread: 0.0002
    },
    {
      id: 'GHS_USD',
      from: 'GHS',
      to: 'USD',
      rate: 0.082,
      change24h: -0.45,
      volume: 650000,
      bid: 0.0819,
      ask: 0.0821,
      spread: 0.0002
    },
    {
      id: 'EGP_USD',
      from: 'EGP',
      to: 'USD',
      rate: 0.032,
      change24h: 1.23,
      volume: 890000,
      bid: 0.0319,
      ask: 0.0321,
      spread: 0.0002
    }
  ]);

  const [orders, setOrders] = useState<TradeOrder[]>([
    {
      id: '1',
      type: 'buy',
      pair: 'KES/USD',
      amount: 10000,
      rate: 0.0076,
      status: 'pending',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      fee: 2.5
    },
    {
      id: '2',
      type: 'sell',
      pair: 'NGN/USD',
      amount: 50000,
      rate: 0.0014,
      status: 'executed',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      fee: 3.0
    }
  ]);

  const [alerts, setAlerts] = useState<MarketAlert[]>([
    {
      id: '1',
      pair: 'KES/USD',
      condition: 'above',
      targetRate: 0.0080,
      currentRate: 0.0077,
      active: true
    },
    {
      id: '2',
      pair: 'NGN/USD',
      condition: 'below',
      targetRate: 0.0012,
      currentRate: 0.0013,
      active: true
    }
  ]);

  // Mock price history data
  const priceHistory = [
    { time: '09:00', price: 0.0075, volume: 15000 },
    { time: '10:00', price: 0.0076, volume: 18000 },
    { time: '11:00', price: 0.0074, volume: 12000 },
    { time: '12:00', price: 0.0077, volume: 22000 },
    { time: '13:00', price: 0.0078, volume: 19000 },
    { time: '14:00', price: 0.0077, volume: 16000 },
    { time: '15:00', price: 0.0079, volume: 25000 },
    { time: '16:00', price: 0.0077, volume: 20000 }
  ];

  const marketNews = [
    {
      id: '1',
      title: 'Kenyan Shilling Strengthens Against USD',
      summary: 'Central bank intervention supports local currency amid global volatility',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      impact: 'positive'
    },
    {
      id: '2',
      title: 'Nigerian Naira Under Pressure',
      summary: 'Oil price fluctuations affect currency stability',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      impact: 'negative'
    },
    {
      id: '3',
      title: 'South African Rand Shows Resilience',
      summary: 'Economic indicators support rand performance',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      impact: 'positive'
    }
  ];

  useEffect(() => {
    if (autoRefresh && isOnline) {
      const interval = setInterval(() => {
        // Simulate real-time price updates
        setCurrencyPairs(prev => 
          prev.map(pair => ({
            ...pair,
            rate: pair.rate * (1 + (Math.random() - 0.5) * 0.01),
            change24h: pair.change24h + (Math.random() - 0.5) * 0.5
          }))
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [autoRefresh, isOnline]);

  const getCurrentPair = () => {
    return currencyPairs.find(pair => `${pair.from}/${pair.to}` === selectedPair) || currencyPairs[0];
  };

  const executeOrder = () => {
    const currentPair = getCurrentPair();
    const orderAmount = parseFloat(amount);
    const orderRate = tradeType === 'market' ? currentPair.rate : parseFloat(limitPrice);

    if (!orderAmount || orderAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const newOrder: TradeOrder = {
      id: Date.now().toString(),
      type: orderSide,
      pair: selectedPair,
      amount: orderAmount,
      rate: orderRate,
      status: tradeType === 'market' ? 'executed' : 'pending',
      timestamp: new Date(),
      fee: orderAmount * 0.001 // 0.1% fee
    };

    setOrders(prev => [newOrder, ...prev]);
    
    if (onAddPendingTransaction && !isOnline) {
      onAddPendingTransaction({
        id: newOrder.id,
        type: 'exchange',
        description: `${orderSide.toUpperCase()} ${orderAmount} ${selectedPair}`,
        amount: orderAmount * orderRate,
        timestamp: new Date()
      });
    }

    setAmount('');
    setLimitPrice('');
    setStopPrice('');
    setShowOrderModal(false);
  };

  const createAlert = (pair: string, condition: 'above' | 'below', targetRate: number) => {
    const newAlert: MarketAlert = {
      id: Date.now().toString(),
      pair,
      condition,
      targetRate,
      currentRate: getCurrentPair().rate,
      active: true
    };

    setAlerts(prev => [newAlert, ...prev]);
    setShowAlertModal(false);
  };

  const renderTradingInterface = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart and Pair Selection */}
      <div className="lg:col-span-2 space-y-6">
        {/* Pair Selection */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Currency Pairs</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`p-2 rounded-lg transition-colors ${
                  autoRefresh ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <RefreshCw size={16} className={autoRefresh ? 'animate-spin' : ''} />
              </button>
              {!isOnline && (
                <div className="flex items-center text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                  <AlertTriangle size={14} className="mr-1" />
                  <span className="text-xs">Offline</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currencyPairs.map((pair) => (
              <motion.button
                key={pair.id}
                onClick={() => setSelectedPair(`${pair.from}/${pair.to}`)}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  selectedPair === `${pair.from}/${pair.to}`
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{pair.from}/{pair.to}</span>
                  <div className={`flex items-center text-sm ${
                    pair.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {pair.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    <span className="ml-1">{Math.abs(pair.change24h).toFixed(2)}%</span>
                  </div>
                </div>
                <div className="text-lg font-bold text-gray-900">{pair.rate.toFixed(6)}</div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Bid: {pair.bid.toFixed(6)}</span>
                  <span>Ask: {pair.ask.toFixed(6)}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </Card>

        {/* Price Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">{selectedPair} Price Chart</h4>
            <div className="flex space-x-2">
              {['1H', '4H', '1D', '1W'].map((timeframe) => (
                <button
                  key={timeframe}
                  className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50"
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                formatter={(value: any) => [value.toFixed(6), 'Price']}
                labelStyle={{ color: '#374151' }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Trading Panel */}
      <div className="space-y-6">
        {/* Order Form */}
        <Card className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Place Order</h4>
          
          <div className="space-y-4">
            {/* Order Side */}
            <div className="flex space-x-2">
              <button
                onClick={() => setOrderSide('buy')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  orderSide === 'buy'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setOrderSide('sell')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  orderSide === 'sell'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Sell
              </button>
            </div>

            {/* Order Type */}
            <Select
              value={tradeType}
              onValueChange={(value) => setTradeType(value as any)}
              options={[
                { value: 'market', label: 'Market Order' },
                { value: 'limit', label: 'Limit Order' },
                { value: 'stop', label: 'Stop Order' }
              ]}
            />

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount ({getCurrentPair().from})
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>

            {/* Limit Price (for limit/stop orders) */}
            {(tradeType === 'limit' || tradeType === 'stop') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {tradeType === 'limit' ? 'Limit Price' : 'Stop Price'}
                </label>
                <Input
                  type="number"
                  value={tradeType === 'limit' ? limitPrice : stopPrice}
                  onChange={(e) => tradeType === 'limit' ? setLimitPrice(e.target.value) : setStopPrice(e.target.value)}
                  placeholder={`Enter ${tradeType} price`}
                  step="0.000001"
                />
              </div>
            )}

            {/* Order Summary */}
            {amount && (
              <div className="p-3 bg-gray-50 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Amount:</span>
                  <span>{amount} {getCurrentPair().from}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Rate:</span>
                  <span>{tradeType === 'market' ? getCurrentPair().rate.toFixed(6) : (limitPrice || stopPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Est. Total:</span>
                  <span>
                    {(parseFloat(amount || '0') * (tradeType === 'market' ? getCurrentPair().rate : parseFloat(limitPrice || stopPrice || '0'))).toFixed(2)} {getCurrentPair().to}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Fee:</span>
                  <span>{(parseFloat(amount || '0') * 0.001).toFixed(2)} {getCurrentPair().from}</span>
                </div>
              </div>
            )}

            <Button
              onClick={executeOrder}
              disabled={!amount || !isOnline}
              className={`w-full ${
                orderSide === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {orderSide === 'buy' ? 'Buy' : 'Sell'} {getCurrentPair().from}
            </Button>
          </div>
        </Card>

        {/* Market Info */}
        <Card className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Market Info</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">24h Volume:</span>
              <span className="text-sm font-medium">{getCurrentPair().volume.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Spread:</span>
              <span className="text-sm font-medium">{getCurrentPair().spread.toFixed(6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">24h Change:</span>
              <span className={`text-sm font-medium ${
                getCurrentPair().change24h >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {getCurrentPair().change24h >= 0 ? '+' : ''}{getCurrentPair().change24h.toFixed(2)}%
              </span>
            </div>
          </div>
        </Card>

        {/* Market News */}
        <Card className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Market News</h4>
          <div className="space-y-3">
            {marketNews.slice(0, 3).map((news) => (
              <div key={news.id} className="border-l-4 border-gray-200 pl-3">
                <h5 className="text-sm font-medium text-gray-900">{news.title}</h5>
                <p className="text-xs text-gray-600 mt-1">{news.summary}</p>
                <span className="text-xs text-gray-500">{news.timestamp.toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Order History</h3>
          <Button size="sm" variant="outline">
            <Download size={14} className="mr-2" />
            Export
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-600">Type</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Pair</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Rate</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {order.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 text-sm font-medium text-gray-900">{order.pair}</td>
                  <td className="py-3 text-sm text-gray-900">{order.amount.toLocaleString()}</td>
                  <td className="py-3 text-sm text-gray-900">{order.rate.toFixed(6)}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'executed' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-600">{order.timestamp.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Price Alerts</h3>
          <Button onClick={() => setShowAlertModal(true)}>
            <Bell size={16} className="mr-2" />
            New Alert
          </Button>
        </div>
        
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{alert.pair}</h4>
                  <p className="text-sm text-gray-600">
                    Alert when price goes {alert.condition} {alert.targetRate.toFixed(6)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Current: {alert.currentRate.toFixed(6)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {alert.active ? 'Active' : 'Inactive'}
                  </span>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-600">Total Volume</h4>
            <BarChart3 size={16} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">$125,430</p>
          <p className="text-sm text-green-600">+12.5% from last month</p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-600">Total Trades</h4>
            <Target size={16} className="text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">347</p>
          <p className="text-sm text-green-600">+8.2% from last month</p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-600">Win Rate</h4>
            <TrendingUp size={16} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">68.5%</p>
          <p className="text-sm text-green-600">+2.1% from last month</p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-600">P&L</h4>
            <DollarSign size={16} className="text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">+$2,340</p>
          <p className="text-sm text-green-600">+15.7% this month</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trading Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={priceHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Bar dataKey="volume" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

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
          <ArrowLeftRight size={24} className="text-blue-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Trading Platform</h1>
            <p className="text-gray-600">Advanced multi-currency trading and exchange</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {isOnline ? (
            <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-medium">Live Markets</span>
            </div>
          ) : (
            <div className="flex items-center text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              <AlertTriangle size={14} className="mr-2" />
              <span className="text-sm font-medium">Offline Mode</span>
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'trading', label: 'Trading', icon: ArrowLeftRight },
          { id: 'orders', label: 'Orders', icon: Clock },
          { id: 'alerts', label: 'Alerts', icon: Bell },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon size={16} className="mr-2" />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {selectedTab === 'trading' && renderTradingInterface()}
          {selectedTab === 'orders' && renderOrders()}
          {selectedTab === 'alerts' && renderAlerts()}
          {selectedTab === 'analytics' && renderAnalytics()}
        </motion.div>
      </AnimatePresence>

      {/* Alert Modal */}
      <Modal isOpen={showAlertModal} onClose={() => setShowAlertModal(false)}>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Price Alert</h3>
          <div className="space-y-4">
            <Select
              options={currencyPairs.map(pair => ({
                value: `${pair.from}/${pair.to}`,
                label: `${pair.from}/${pair.to}`
              }))}
              placeholder="Select currency pair"
            />
            <Select
              options={[
                { value: 'above', label: 'Price goes above' },
                { value: 'below', label: 'Price goes below' }
              ]}
              placeholder="Select condition"
            />
            <Input type="number" placeholder="Target price" step="0.000001" />
          </div>
          <div className="flex space-x-3 mt-6">
            <Button variant="outline" onClick={() => setShowAlertModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={() => setShowAlertModal(false)} className="flex-1">
              Create Alert
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};
