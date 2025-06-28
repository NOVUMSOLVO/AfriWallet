import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  CreditCard, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  MoreHorizontal,
  Shield,
  Smartphone,
  Building,
  Bitcoin
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/currency';
import { mockPaymentMethods } from '../../utils/mockData';
import { PaymentMethod } from '../../types';

interface WalletPageProps {
  selectedCurrency: string;
  userData: any;
}

export const WalletPage: React.FC<WalletPageProps> = ({
  selectedCurrency,
  userData
}) => {
  const [paymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [activeCard, setActiveCard] = useState(0);

  const getPaymentIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'card':
        return CreditCard;
      case 'mobile_money':
        return Smartphone;
      case 'bank':
        return Building;
      case 'crypto':
        return Bitcoin;
      default:
        return Wallet;
    }
  };

  const getPaymentColor = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'card':
        return 'from-blue-500 to-purple-600';
      case 'mobile_money':
        return 'from-green-500 to-teal-600';
      case 'bank':
        return 'from-gray-500 to-gray-700';
      case 'crypto':
        return 'from-orange-500 to-yellow-600';
      default:
        return 'from-blue-500 to-purple-600';
    }
  };

  const getPaymentMethodBrand = (name: string) => {
    const brandColors = {
      'EcoCash': 'from-red-500 to-red-600',
      'Mukuru': 'from-blue-500 to-blue-600',
      'NetOne Money': 'from-purple-500 to-purple-600',
      'PayNow': 'from-green-500 to-green-600',
      'Telecel Cash': 'from-indigo-500 to-indigo-600',
      'M-Pesa': 'from-green-600 to-green-700',
      'MTN Mobile Money': 'from-yellow-500 to-yellow-600',
      'Visa Debit': 'from-blue-600 to-blue-700',
      'Mastercard Credit': 'from-red-600 to-orange-600',
      'CBZ Bank': 'from-blue-800 to-blue-900',
      'Steward Bank': 'from-green-700 to-green-800',
      'Standard Chartered': 'from-blue-700 to-teal-700',
      'FBC Bank': 'from-red-700 to-red-800',
      'Bitcoin Wallet': 'from-orange-500 to-yellow-500',
      'Ethereum Wallet': 'from-purple-600 to-blue-600'
    };
    return brandColors[name] || getPaymentColor('card');
  };

  const quickActions = [
    {
      icon: ArrowUpRight,
      label: 'Send Money',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      action: () => window.location.hash = '#remit'
    },
    {
      icon: ArrowDownLeft,
      label: 'Request Money',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: () => alert('Request money feature coming soon!')
    },
    {
      icon: Plus,
      label: 'Add Money',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: () => alert('Add money feature - Connect your bank account or mobile money wallet')
    },
    {
      icon: MoreHorizontal,
      label: 'More',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      action: () => alert('More payment options coming soon!')
    }
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Wallet Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Wallet size={24} className="text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">My Wallet</h1>
        </div>
        <Button variant="outline" className="flex items-center">
          <Plus size={16} className="mr-2" />
          Add Payment Method
        </Button>
      </div>

      {/* Payment Methods Carousel */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
        
        <div className="relative">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {paymentMethods.map((method, index) => {
              const Icon = getPaymentIcon(method.type);
              const gradientColor = getPaymentMethodBrand(method.name);
              
              return (
                <motion.div
                  key={method.id}
                  className={`min-w-[280px] h-40 bg-gradient-to-br ${gradientColor} rounded-xl p-6 text-white cursor-pointer relative overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCard(index)}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8" />
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <Icon size={24} />
                      {method.isDefault && (
                        <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                          Default
                        </span>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-white/80 text-sm mb-1">{method.name}</p>
                      <p className="text-lg font-semibold">{method.details}</p>
                      <div className="flex items-center mt-2">
                        {method.isVerified && (
                          <div className="flex items-center text-xs">
                            <Shield size={12} className="mr-1" />
                            Verified
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {paymentMethods.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeCard ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                onClick={() => setActiveCard(index)}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.label}
                onClick={action.action}
                className={`${action.bgColor} p-4 rounded-xl text-center hover:shadow-md transition-all duration-200`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Icon size={24} className={`mx-auto mb-2 ${action.color}`} />
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </motion.button>
            );
          })}
        </div>
      </Card>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(userData.balance).map(([currency, amount], index) => (
          <motion.div
            key={currency}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{currency}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  currency === selectedCurrency 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {currency === selectedCurrency ? 'Active' : 'Available'}
                </span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(amount as number, currency)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Available balance
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Wallet Activity</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        
        <div className="space-y-3">
          {[
            { type: 'add', amount: 100, method: 'EcoCash', time: '2 hours ago' },
            { type: 'send', amount: -50, method: 'Bank Transfer', time: '1 day ago' },
            { type: 'receive', amount: 75, method: 'Mobile Money', time: '2 days ago' }
          ].map((activity, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  activity.type === 'add' ? 'bg-green-100' :
                  activity.type === 'send' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {activity.type === 'add' ? (
                    <ArrowDownLeft size={16} className="text-green-600" />
                  ) : activity.type === 'send' ? (
                    <ArrowUpRight size={16} className="text-red-600" />
                  ) : (
                    <ArrowDownLeft size={16} className="text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 capitalize">
                    {activity.type} Money
                  </p>
                  <p className="text-sm text-gray-500">{activity.method} • {activity.time}</p>
                </div>
              </div>
              <span className={`font-semibold ${
                activity.amount > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {activity.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(activity.amount), selectedCurrency)}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};