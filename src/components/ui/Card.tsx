import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick 
}) => {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 ${hover ? 'cursor-pointer' : ''} ${className}`}
      whileHover={hover ? { y: -2, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};