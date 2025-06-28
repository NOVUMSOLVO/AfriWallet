import React from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Plus, 
  Minus, 
  ArrowLeftRight, 
  TrendingUp, 
  Users,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Transaction } from '../../types';
import { formatCurrency } from '../../utils/currency';
import { Card } from '../ui/Card';

interface TransactionListProps {
  transactions: Transaction[];
  selectedCurrency: string;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  selectedCurrency
}) => {
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'send':
        return Send;
      case 'receive':
        return Plus;
      case 'deposit':
        return Plus;
      case 'withdrawal':
        return Minus;
      case 'exchange':
        return ArrowLeftRight;
      case 'investment':
        return TrendingUp;
      case 'chama':
        return Users;
      default:
        return ArrowLeftRight;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'receive':
      case 'deposit':
        return 'text-green-600 bg-green-100';
      case 'send':
      case 'withdrawal':
        return 'text-red-600 bg-red-100';
      case 'exchange':
        return 'text-purple-600 bg-purple-100';
      case 'investment':
        return 'text-orange-600 bg-orange-100';
      case 'chama':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'failed':
        return XCircle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-orange-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <button 
          className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
          onClick={() => alert('Full transaction history coming soon!')}
        >
          View All
        </button>
      </div>
      
      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((transaction) => {
            const Icon = getTransactionIcon(transaction.type);
            const StatusIcon = getStatusIcon(transaction.status);
            const iconColor = getTransactionColor(transaction.type);
            const statusColor = getStatusColor(transaction.status);
            const isPositive = ['receive', 'deposit', 'chama'].includes(transaction.type);

            return (
              <motion.div
                key={transaction.id}
                variants={itemVariants}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColor}`}>
                    <Icon size={18} />
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-gray-700">
                      {transaction.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-xs text-gray-500">
                        {formatTimeAgo(transaction.timestamp)}
                      </p>
                      {transaction.recipient && (
                        <>
                          <span className="text-gray-300">•</span>
                          <p className="text-xs text-gray-500">
                            to {transaction.recipient}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className={`font-semibold ${
                      isPositive ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {isPositive ? '+' : ''}{formatCurrency(transaction.amount, transaction.currency)}
                    </p>
                    <div className="flex items-center justify-end mt-1">
                      <StatusIcon size={12} className={`mr-1 ${statusColor}`} />
                      <span className={`text-xs capitalize ${statusColor}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowLeftRight size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 mb-2">No transactions yet</p>
            <p className="text-sm text-gray-400">Your transaction history will appear here</p>
          </motion.div>
        )}
      </motion.div>
    </Card>
  );
};