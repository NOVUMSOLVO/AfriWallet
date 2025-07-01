import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Target,
  Download,
  Eye,
  Users,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/currency';
import { Transaction, UserData } from '../../types';

interface AnalyticsPageProps {
  selectedCurrency: string;
  transactions: Transaction[];
  userData: UserData;
}

interface AnalyticsCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bgColor: string;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  selectedCurrency
}) => {
  const [timeframe, setTimeframe] = useState('30d');

  // Mock analytics data
  const analyticsCards: AnalyticsCard[] = [
    {
      title: 'Total Spend',
      value: formatCurrency(2840, selectedCurrency),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Savings Rate',
      value: '23.8%',
      change: '+3.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Investment ROI',
      value: '8.7%',
      change: '-1.1%',
      trend: 'down',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Chama Contributions',
      value: formatCurrency(630, selectedCurrency),
      change: '+18.9%',
      trend: 'up',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const spendingCategories = [
    { name: 'Food & Dining', amount: 680, percentage: 24, color: '#10B981' },
    { name: 'Transportation', amount: 450, percentage: 16, color: '#3B82F6' },
    { name: 'Shopping', amount: 380, percentage: 13, color: '#F59E0B' },
    { name: 'Bills & Utilities', amount: 320, percentage: 11, color: '#EF4444' },
    { name: 'Entertainment', amount: 280, percentage: 10, color: '#8B5CF6' },
    { name: 'Healthcare', amount: 210, percentage: 7, color: '#06B6D4' },
    { name: 'Others', amount: 520, percentage: 19, color: '#6B7280' }
  ];

  const monthlyTrends = [
    { month: 'Jan', income: 3200, expenses: 2450, savings: 750 },
    { month: 'Feb', income: 3400, expenses: 2680, savings: 720 },
    { month: 'Mar', income: 3100, expenses: 2350, savings: 750 },
    { month: 'Apr', income: 3600, expenses: 2890, savings: 710 },
    { month: 'May', income: 3200, expenses: 2440, savings: 760 },
    { month: 'Jun', income: 3500, expenses: 2670, savings: 830 }
  ];

  const topMerchants = [
    { name: 'Pick n Pay', amount: 420, transactions: 12, category: 'Groceries' },
    { name: 'Uber', amount: 230, transactions: 8, category: 'Transport' },
    { name: 'Netflix', amount: 15, transactions: 1, category: 'Entertainment' },
    { name: 'ZESA', amount: 85, transactions: 1, category: 'Utilities' },
    { name: 'Econet', amount: 45, transactions: 3, category: 'Telecoms' }
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
          <BarChart3 size={24} className="text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Financial Analytics</h1>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
          >
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
            <option value="90d">90 Days</option>
            <option value="1y">1 Year</option>
          </select>
          <Button variant="outline" className="flex items-center">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-6 ${card.bgColor} border-0`}>
                <div className="flex items-center justify-between mb-4">
                  <Icon size={24} className={card.color} />
                  <div className="flex items-center">
                    {card.trend === 'up' ? (
                      <TrendingUp size={16} className="text-green-500 mr-1" />
                    ) : card.trend === 'down' ? (
                      <TrendingDown size={16} className="text-red-500 mr-1" />
                    ) : null}
                    <span className={`text-sm font-medium ${
                      card.trend === 'up' ? 'text-green-600' : 
                      card.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {card.change}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Spending by Category</h3>
            <Button variant="ghost" size="sm">
              <Eye size={16} className="mr-2" />
              View Details
            </Button>
          </div>
          
          <div className="space-y-4">
            {spendingCategories.map((category, index) => (
              <motion.div
                key={category.name}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center flex-1">
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: category.color }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      <span className="text-sm text-gray-500">{category.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: category.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${category.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 ml-3">
                    {formatCurrency(category.amount, selectedCurrency)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Monthly Trends */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                <span className="text-gray-600">Income</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
                <span className="text-gray-600">Expenses</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                <span className="text-gray-600">Savings</span>
              </div>
            </div>
          </div>
          
          <div className="relative h-48">
            <div className="absolute inset-0 flex items-end justify-between">
              {monthlyTrends.map((month, index) => (
                <div key={month.month} className="flex flex-col items-center space-y-2">
                  <div className="flex items-end space-x-1">
                    <motion.div
                      className="bg-green-500 rounded-t w-4"
                      style={{ height: `${(month.income / 4000) * 120}px` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(month.income / 4000) * 120}px` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                    <motion.div
                      className="bg-red-500 rounded-t w-4"
                      style={{ height: `${(month.expenses / 4000) * 120}px` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(month.expenses / 4000) * 120}px` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                    />
                    <motion.div
                      className="bg-blue-500 rounded-t w-4"
                      style={{ height: `${(month.savings / 4000) * 120}px` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(month.savings / 4000) * 120}px` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.4 }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{month.month}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Top Merchants & Transaction Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Merchants */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Merchants</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="space-y-4">
            {topMerchants.map((merchant, index) => (
              <motion.div
                key={merchant.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-blue-600">
                      {merchant.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{merchant.name}</p>
                    <p className="text-sm text-gray-500">
                      {merchant.transactions} transactions • {merchant.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {formatCurrency(merchant.amount, selectedCurrency)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Transaction Flow */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Transaction Flow</h3>
            <Button variant="ghost" size="sm">This Month</Button>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <ArrowDownLeft size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Money In</p>
                  <p className="text-sm text-gray-500">Salary, transfers, investments</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">
                  {formatCurrency(3200, selectedCurrency)}
                </p>
                <p className="text-sm text-green-500">+8.5%</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <ArrowUpRight size={20} className="text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Money Out</p>
                  <p className="text-sm text-gray-500">Purchases, bills, transfers</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-red-600">
                  {formatCurrency(2440, selectedCurrency)}
                </p>
                <p className="text-sm text-red-500">+12.1%</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900">Net Flow</p>
                <p className="text-lg font-bold text-blue-600">
                  {formatCurrency(760, selectedCurrency)}
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Monthly savings increased by 2.8%
              </p>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
