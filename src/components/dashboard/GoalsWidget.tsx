import React from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Calendar, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/currency';
import { Goal } from '../../types';

interface GoalsWidgetProps {
  goals: Goal[];
  selectedCurrency: string;
  onCreateGoal: () => void;
}

export const GoalsWidget: React.FC<GoalsWidgetProps> = ({
  goals,
  selectedCurrency,
  onCreateGoal
}) => {
  const getGoalIcon = (category: Goal['category']) => {
    switch (category) {
      case 'emergency':
        return '🛡️';
      case 'vacation':
        return '✈️';
      case 'education':
        return '🎓';
      case 'business':
        return '💼';
      default:
        return '🎯';
    }
  };

  const getDaysRemaining = (targetDate: Date) => {
    const now = new Date();
    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
        <div className="flex items-center">
          <Target size={20} className="text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Savings Goals</h3>
        </div>
        <motion.button
          onClick={onCreateGoal}
          className="flex items-center text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} className="mr-1" />
          New Goal
        </motion.button>
      </div>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {goals.slice(0, 3).map((goal, index) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const daysRemaining = getDaysRemaining(goal.targetDate);
          const isNearDeadline = daysRemaining <= 30;
          
          return (
            <motion.div
              key={goal.id}
              variants={itemVariants}
              className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100 hover:shadow-md transition-shadow cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{getGoalIcon(goal.category)}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{goal.title}</h4>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-600">
                    {progress.toFixed(0)}%
                  </p>
                  <div className={`flex items-center text-xs ${
                    isNearDeadline ? 'text-orange-600' : 'text-gray-500'
                  }`}>
                    <Calendar size={12} className="mr-1" />
                    {daysRemaining}d left
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {formatCurrency(goal.currentAmount, selectedCurrency)}
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(goal.targetAmount, selectedCurrency)}
                  </span>
                </div>
                
                <div className="w-full bg-white rounded-full h-2 shadow-inner">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">
                    {formatCurrency(goal.targetAmount - goal.currentAmount, selectedCurrency)} to go
                  </span>
                  <motion.button
                    className="bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-purple-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add Funds
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}

        {goals.length === 0 && (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target size={24} className="text-purple-600" />
            </div>
            <p className="text-gray-500 mb-2">No savings goals yet</p>
            <p className="text-sm text-gray-400 mb-4">Set goals to track your financial progress</p>
            <motion.button
              onClick={onCreateGoal}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Your First Goal
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </Card>
  );
};