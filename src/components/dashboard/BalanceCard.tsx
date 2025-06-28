import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, currencies } from '../../utils/currency';
import { UserData } from '../../types';

interface BalanceCardProps {
  userData: UserData;
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  showBalance: boolean;
  setShowBalance: (show: boolean) => void;
  isOnline: boolean;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  userData,
  selectedCurrency,
  setSelectedCurrency,
  showBalance,
  setShowBalance,
  isOnline
}) => {
  const currentBalance = userData.balance[selectedCurrency] || 0;
  const previousBalance = currentBalance * 0.95; // Mock previous balance
  const changePercentage = ((currentBalance - previousBalance) / previousBalance) * 100;
  const isPositiveChange = changePercentage >= 0;

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-blue-200 mb-2 text-sm font-medium">Total Balance</p>
            <div className="flex items-center space-x-3">
              <motion.h2 
                className="text-3xl font-bold"
                key={showBalance ? 'visible' : 'hidden'}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {showBalance ? formatCurrency(currentBalance, selectedCurrency) : '••••••'}
              </motion.h2>
              <motion.button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
              </motion.button>
            </div>
            
            {/* Balance Change Indicator */}
            <motion.div 
              className="flex items-center mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {isPositiveChange ? (
                <TrendingUp size={16} className="text-green-300 mr-1" />
              ) : (
                <TrendingDown size={16} className="text-red-300 mr-1" />
              )}
              <span className={`text-sm font-medium ${isPositiveChange ? 'text-green-300' : 'text-red-300'}`}>
                {isPositiveChange ? '+' : ''}{changePercentage.toFixed(1)}% this month
              </span>
            </motion.div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <select 
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code} className="text-gray-800 bg-white">
                  {currency.flag} {currency.code}
                </option>
              ))}
            </select>
            
            <div className={`flex items-center text-xs px-2 py-1 rounded-full ${
              isOnline ? 'bg-green-500/20 text-green-200' : 'bg-orange-500/20 text-orange-200'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-1 ${
                isOnline ? 'bg-green-400' : 'bg-orange-400'
              }`} />
              {isOnline ? 'Live' : 'Offline'}
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-blue-200 text-xs mb-1">Chama Savings</p>
            <p className="font-semibold text-lg">{formatCurrency(userData.chamaBalance, selectedCurrency)}</p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-blue-200 text-xs mb-1">Investments</p>
            <p className="font-semibold text-lg">{formatCurrency(userData.investments, selectedCurrency)}</p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-blue-200 text-xs mb-1">Pending</p>
            <p className="font-semibold text-lg">{userData.pendingRemittances}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};