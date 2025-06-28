import React from 'react';
import { motion } from 'framer-motion';
import { Send, Plus, ArrowLeftRight, TrendingUp, Smartphone, CreditCard } from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bgColor: string;
  hoverColor: string;
  onClick: () => void;
}

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const actions: QuickAction[] = [
    {
      id: 'send',
      label: 'Send Money',
      icon: Send,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      onClick: () => onActionClick('remit')
    },
    {
      id: 'add',
      label: 'Add Money',
      icon: Plus,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
      onClick: () => onActionClick('add')
    },
    {
      id: 'exchange',
      label: 'Exchange',
      icon: ArrowLeftRight,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100',
      onClick: () => onActionClick('exchange')
    },
    {
      id: 'invest',
      label: 'Invest',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      hoverColor: 'hover:bg-orange-100',
      onClick: () => onActionClick('invest')
    },
    {
      id: 'mobile',
      label: 'Mobile Top-up',
      icon: Smartphone,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      hoverColor: 'hover:bg-indigo-100',
      onClick: () => onActionClick('mobile')
    },
    {
      id: 'bills',
      label: 'Pay Bills',
      icon: CreditCard,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      hoverColor: 'hover:bg-pink-100',
      onClick: () => onActionClick('bills')
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
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-3 lg:grid-cols-6 gap-4 mb-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <motion.button
            key={action.id}
            variants={itemVariants}
            onClick={action.onClick}
            className={`
              ${action.bgColor} ${action.hoverColor} ${action.color}
              p-4 rounded-xl text-center transition-all duration-200 group
              hover:shadow-lg hover:scale-105 active:scale-95
            `}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon 
              size={24} 
              className={`mx-auto mb-2 ${action.color} group-hover:scale-110 transition-transform duration-200`} 
            />
            <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
              {action.label}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
};