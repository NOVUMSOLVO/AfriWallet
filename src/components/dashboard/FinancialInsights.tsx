import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Target, PiggyBank, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/currency';

interface FinancialInsightsProps {
  selectedCurrency: string;
  budgetCategories: any[];
  goals: any[];
  monthlySpending: number;
  monthlyIncome: number;
}

export const FinancialInsights: React.FC<FinancialInsightsProps> = ({
  selectedCurrency,
  budgetCategories,
  goals,
  monthlySpending,
  monthlyIncome
}) => {
  const savingsRate = ((monthlyIncome - monthlySpending) / monthlyIncome) * 100;
  const totalBudgetAllocated = budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalBudgetSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const budgetUtilization = (totalBudgetSpent / totalBudgetAllocated) * 100;

  const insights = [
    {
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      change: '+2.3%',
      isPositive: true,
      description: 'vs last month',
      icon: PiggyBank,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Budget Usage',
      value: `${budgetUtilization.toFixed(0)}%`,
      change: '-5.2%',
      isPositive: true,
      description: 'of monthly budget',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Goal Progress',
      value: `${goals.length}`,
      change: '+1',
      isPositive: true,
      description: 'active goals',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Financial Insights</h3>
        <button 
          className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
          onClick={() => alert('Detailed financial insights coming soon!')}
        >
          View Details
        </button>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.title}
              variants={itemVariants}
              className={`${insight.bgColor} rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon size={20} className={insight.color} />
                <div className="flex items-center">
                  {insight.isPositive ? (
                    <TrendingUp size={14} className="text-green-500 mr-1" />
                  ) : (
                    <TrendingDown size={14} className="text-red-500 mr-1" />
                  )}
                  <span className={`text-xs font-medium ${
                    insight.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {insight.change}
                  </span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{insight.value}</p>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Budget Overview */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Budget Overview</h4>
        {budgetCategories.map((category, index) => {
          const percentage = (category.spent / category.allocated) * 100;
          const isOverBudget = percentage > 100;
          
          return (
            <motion.div
              key={category.id}
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  {isOverBudget && (
                    <AlertCircle size={14} className="text-red-500 ml-2" />
                  )}
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(category.spent, selectedCurrency)}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">
                    / {formatCurrency(category.allocated, selectedCurrency)}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${
                    isOverBudget ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}
                  style={{ backgroundColor: isOverBudget ? undefined : category.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(percentage, 100)}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
};