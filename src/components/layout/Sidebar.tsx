import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Wallet, 
  Users, 
  ArrowLeftRight, 
  TrendingUp, 
  Send, 
  Settings,
  HelpCircle,
  MessageCircle
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: number;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'dashboard', icon: Home },
  { id: 'wallet', label: 'wallet', icon: Wallet },
  { id: 'chama', label: 'chama', icon: Users, badge: 2 },
  { id: 'exchange', label: 'exchange', icon: ArrowLeftRight },
  { id: 'invest', label: 'invest', icon: TrendingUp },
  { id: 'remit', label: 'remit', icon: Send },
  { id: 'settings', label: 'settings', icon: Settings }
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const { t } = useLanguage();
  
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-100 lg:shadow-none sidebar-container"
        variants={sidebarVariants}
        initial="closed"
        animate={mobileMenuOpen ? 'open' : 'closed'}
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm border border-blue-100' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <Icon 
                      size={20} 
                      className={`mr-3 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} 
                    />
                    <span className={`font-medium ${isActive ? 'text-blue-600' : ''}`}>
                      {t(item.label)}
                    </span>
                  </div>
                  
                  {item.badge && (
                    <motion.span
                      className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </nav>
          
          {/* Help Section */}
          <motion.div 
            className="p-4 border-t border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center mb-2">
                <HelpCircle size={20} className="text-blue-600 mr-2" />
                <h4 className="font-semibold text-blue-800">Need Help?</h4>
              </div>
              <p className="text-sm text-blue-600 mb-3">24/7 support available</p>
              <motion.button 
                className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => alert('24/7 Support: +263 77 123 4567 or support@afriwallet.com')}
              >
                <MessageCircle size={16} className="mr-2" />
                Contact Support
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
};