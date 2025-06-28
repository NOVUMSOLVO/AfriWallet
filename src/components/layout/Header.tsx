import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Bell, 
  User, 
  Wifi, 
  WifiOff,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { NotificationItem } from '../../types';
import { LanguageSelector } from '../language/LanguageSelector';
import { useLanguage } from '../../hooks/useLanguage';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  notifications: NotificationItem[];
  onNotificationClick: (notification: NotificationItem) => void;
}

export const Header: React.FC<HeaderProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  notifications,
  onNotificationClick
}) => {
  const { isOnline, connectionType } = useNetworkStatus();
  const { t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 w-full">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
            
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">AW</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AfriWallet
              </h1>
            </motion.div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Network Status */}
            {/* Language Selector */}
            <LanguageSelector compact />
            
            <motion.div 
              className="hidden sm:flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isOnline ? (
                <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <Wifi size={14} className="mr-1" />
                  <span className="text-xs font-medium">
                    {connectionType !== 'unknown' ? connectionType.toUpperCase() : 'Online'}
                  </span>
                </div>
              ) : (
                <div className="flex items-center text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                  <WifiOff size={14} className="mr-1" />
                  <span className="text-xs font-medium">Offline</span>
                </div>
              )}
            </motion.div>
            
            {/* Notifications */}
            <div className="relative">
              <motion.button
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setShowNotifications(!showNotifications)}
                whileTap={{ scale: 0.95 }}
              >
                <Bell size={20} className="text-gray-600" />
                {unreadCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </motion.span>
                )}
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <motion.div
                            key={notification.id}
                            className={`p-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50 ${
                              !notification.read ? 'bg-blue-50' : ''
                            }`}
                            onClick={() => {
                              onNotificationClick(notification);
                              setShowNotifications(false);
                            }}
                            whileHover={{ backgroundColor: '#f9fafb' }}
                          >
                            <p className="font-medium text-sm text-gray-900">{notification.title}</p>
                            <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.timestamp.toLocaleTimeString()}
                            </p>
                          </motion.div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          <p className="text-sm">No notifications</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* User Menu */}
            <div className="relative">
              <motion.button
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setShowUserMenu(!showUserMenu)}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <ChevronDown size={16} className="text-gray-600 hidden sm:block" />
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-2">
                      <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <User size={16} className="mr-2" />
                        Profile
                      </button>
                      <button 
                        className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => {
                          setShowUserMenu(false);
                          // Navigate to settings - you can implement proper routing here
                          console.log('Navigate to settings');
                        }}
                      >
                        <Settings size={16} className="mr-2" />
                        Settings
                      </button>
                      <hr className="my-2" />
                      <button 
                        className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => {
                          setShowUserMenu(false);
                          if (confirm('Are you sure you want to sign out?')) {
                            alert('Signed out successfully!');
                          }
                        }}
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};