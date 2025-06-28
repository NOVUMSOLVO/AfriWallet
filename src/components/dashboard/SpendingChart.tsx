import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/currency';

interface SpendingChartProps {
  selectedCurrency: string;
  timeframe: 'week' | 'month' | 'year';
  onTimeframeChange: (timeframe: 'week' | 'month' | 'year') => void;
}

export const SpendingChart: React.FC<SpendingChartProps> = ({
  selectedCurrency,
  timeframe,
  onTimeframeChange
}) => {
  // Mock data for different timeframes
  const weeklyData = [
    { name: 'Mon', spending: 45, income: 0 },
    { name: 'Tue', spending: 32, income: 0 },
    { name: 'Wed', spending: 78, income: 0 },
    { name: 'Thu', spending: 56, income: 0 },
    { name: 'Fri', spending: 89, income: 200 },
    { name: 'Sat', spending: 123, income: 0 },
    { name: 'Sun', spending: 67, income: 0 }
  ];

  const monthlyData = [
    { name: 'Week 1', spending: 490, income: 800 },
    { name: 'Week 2', spending: 520, income: 600 },
    { name: 'Week 3', spending: 380, income: 900 },
    { name: 'Week 4', spending: 610, income: 700 }
  ];

  const yearlyData = [
    { name: 'Jan', spending: 2100, income: 3200 },
    { name: 'Feb', spending: 1950, income: 3200 },
    { name: 'Mar', spending: 2300, income: 3400 },
    { name: 'Apr', spending: 2150, income: 3200 },
    { name: 'May', spending: 2400, income: 3600 },
    { name: 'Jun', spending: 2200, income: 3200 }
  ];

  const categoryData = [
    { name: 'Food & Dining', value: 35, color: '#10B981' },
    { name: 'Transport', value: 25, color: '#3B82F6' },
    { name: 'Mobile Money', value: 15, color: '#8B5CF6' },
    { name: 'Shopping', value: 12, color: '#F59E0B' },
    { name: 'Utilities', value: 8, color: '#EF4444' },
    { name: 'Other', value: 5, color: '#6B7280' }
  ];

  const getData = () => {
    switch (timeframe) {
      case 'week':
        return weeklyData;
      case 'month':
        return monthlyData;
      case 'year':
        return yearlyData;
      default:
        return weeklyData;
    }
  };

  const data = getData();
  const totalSpending = data.reduce((sum, item) => sum + item.spending, 0);
  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
  const netChange = totalIncome - totalSpending;
  const isPositive = netChange >= 0;

  const timeframes = [
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
    { key: 'year', label: 'Year' }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart3 size={20} className="text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Spending Analysis</h3>
        </div>
        
        <div className="flex bg-gray-100 rounded-lg p-1">
          {timeframes.map((tf) => (
            <motion.button
              key={tf.key}
              onClick={() => onTimeframeChange(tf.key as any)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeframe === tf.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tf.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div
          className="text-center p-3 bg-red-50 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-sm text-red-600 mb-1">Total Spending</p>
          <p className="text-lg font-bold text-red-700">
            {formatCurrency(totalSpending, selectedCurrency)}
          </p>
        </motion.div>
        
        <motion.div
          className="text-center p-3 bg-green-50 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-green-600 mb-1">Total Income</p>
          <p className="text-lg font-bold text-green-700">
            {formatCurrency(totalIncome, selectedCurrency)}
          </p>
        </motion.div>
        
        <motion.div
          className={`text-center p-3 rounded-lg ${
            isPositive ? 'bg-blue-50' : 'bg-orange-50'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center mb-1">
            {isPositive ? (
              <TrendingUp size={14} className="text-blue-600 mr-1" />
            ) : (
              <TrendingDown size={14} className="text-orange-600 mr-1" />
            )}
            <p className={`text-sm ${
              isPositive ? 'text-blue-600' : 'text-orange-600'
            }`}>
              Net Change
            </p>
          </div>
          <p className={`text-lg font-bold ${
            isPositive ? 'text-blue-700' : 'text-orange-700'
          }`}>
            {isPositive ? '+' : ''}{formatCurrency(netChange, selectedCurrency)}
          </p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="font-medium text-gray-900 mb-3">Spending Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                formatter={(value: any, name: string) => [
                  formatCurrency(value, selectedCurrency),
                  name === 'spending' ? 'Spending' : 'Income'
                ]}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="spending" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="font-medium text-gray-900 mb-3">Spending by Category</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => [`${value}%`, 'Percentage']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-xs text-gray-600">
                  {category.name} ({category.value}%)
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Card>
  );
};