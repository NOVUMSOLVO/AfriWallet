import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Smartphone, 
  Eye, 
  Fingerprint, 
  Key, 
  AlertTriangle,
  CheckCircle,
  Settings,
  Bell,
  Globe,
  Plus
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { LanguageSelector } from '../language/LanguageSelector';
import { useLanguage } from '../../hooks/useLanguage';

export const SecurityPage: React.FC = () => {
  const { t } = useLanguage();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const securityFeatures = [
    {
      icon: Lock,
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      enabled: twoFactorEnabled,
      toggle: () => setTwoFactorEnabled(!twoFactorEnabled),
      status: twoFactorEnabled ? 'Enabled' : 'Disabled',
      color: twoFactorEnabled ? 'text-green-600' : 'text-orange-600'
    },
    {
      icon: Fingerprint,
      title: 'Biometric Login',
      description: 'Use fingerprint or face recognition to sign in',
      enabled: biometricEnabled,
      toggle: () => setBiometricEnabled(!biometricEnabled),
      status: biometricEnabled ? 'Enabled' : 'Disabled',
      color: biometricEnabled ? 'text-green-600' : 'text-gray-600'
    },
    {
      icon: Bell,
      title: 'Security Notifications',
      description: 'Get notified of suspicious account activity',
      enabled: notificationsEnabled,
      toggle: () => setNotificationsEnabled(!notificationsEnabled),
      status: notificationsEnabled ? 'Enabled' : 'Disabled',
      color: notificationsEnabled ? 'text-green-600' : 'text-orange-600'
    }
  ];

  const recentActivity = [
    {
      action: 'Login from new device',
      location: 'Harare, Zimbabwe',
      time: '2 hours ago',
      status: 'success',
      ip: '196.43.xxx.xxx'
    },
    {
      action: 'Password changed',
      location: 'Harare, Zimbabwe',
      time: '1 day ago',
      status: 'success',
      ip: '196.43.xxx.xxx'
    },
    {
      action: 'Failed login attempt',
      location: 'Unknown location',
      time: '3 days ago',
      status: 'warning',
      ip: '185.220.xxx.xxx'
    }
  ];

  const trustedDevices = [
    {
      name: 'iPhone 13 Pro',
      type: 'Mobile',
      lastUsed: '2 hours ago',
      location: 'Harare, Zimbabwe',
      current: true
    },
    {
      name: 'MacBook Pro',
      type: 'Desktop',
      lastUsed: '1 day ago',
      location: 'Harare, Zimbabwe',
      current: false
    },
    {
      name: 'Samsung Galaxy S21',
      type: 'Mobile',
      lastUsed: '1 week ago',
      location: 'Bulawayo, Zimbabwe',
      current: false
    }
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Security Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Shield size={24} className="text-green-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">{t('settings')} & Privacy</h1>
        </div>
        <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg">
          <CheckCircle size={16} className="text-green-600 mr-2" />
          <span className="text-sm font-medium text-green-700">Account Secured</span>
        </div>
      </div>

      {/* Security Score */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Security Score</h3>
          <span className="text-2xl font-bold text-green-600">85/100</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <motion.div
            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '85%' }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <CheckCircle size={20} className="text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Strong Password</p>
          </div>
          <div className="text-center">
            <CheckCircle size={20} className="text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">2FA Enabled</p>
          </div>
          <div className="text-center">
            <AlertTriangle size={20} className="text-orange-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Enable Biometrics</p>
          </div>
        </div>
      </Card>

      {/* Security Features */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Features</h3>
        <div className="space-y-4">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 shadow-sm">
                    <Icon size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                    <span className={`text-xs font-medium ${feature.color}`}>
                      {feature.status}
                    </span>
                  </div>
                </div>
                
                <motion.button
                  onClick={feature.toggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    feature.enabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                    animate={{ x: feature.enabled ? 24 : 4 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Recent Security Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Security Activity</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  activity.status === 'success' ? 'bg-green-100' : 'bg-orange-100'
                }`}>
                  {activity.status === 'success' ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : (
                    <AlertTriangle size={16} className="text-orange-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">
                    {activity.location} • {activity.ip}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Trusted Devices */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Trusted Devices</h3>
          <Button variant="outline" size="sm">
            <Plus size={16} className="mr-2" />
            Add Device
          </Button>
        </div>
        
        <div className="space-y-3">
          {trustedDevices.map((device, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mr-4">
                  <Smartphone size={20} className="text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium text-gray-900 mr-2">{device.name}</h4>
                    {device.current && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{device.type} • {device.location}</p>
                  <p className="text-xs text-gray-500">Last used: {device.lastUsed}</p>
                </div>
              </div>
              
              {!device.current && (
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  Remove
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className="p-4 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => alert('Password change feature coming soon!')}
        >
          <div className="flex items-center">
            <Key size={20} className="text-blue-600 mr-3" />
            <div>
              <h4 className="font-medium text-gray-900">Change Password</h4>
              <p className="text-sm text-gray-600">Update your account password</p>
            </div>
          </div>
        </Card>
        
        <Card 
          className="p-4 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => alert('Privacy settings coming soon!')}
        >
          <div className="flex items-center">
            <Globe size={20} className="text-green-600 mr-3" />
            <div>
              <h4 className="font-medium text-gray-900">Privacy Settings</h4>
              <p className="text-sm text-gray-600">Manage your privacy preferences</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Language Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Language Preferences</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Language / Sarudza Mutauro / Khetha Ulimi
            </label>
            <LanguageSelector />
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">🌍 African Languages Supported</h4>
            <p className="text-sm text-blue-600 mb-2">
              AfriWallet supports over 40 African languages including:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-blue-700">
              <div>🇿🇼 Shona (ChiShona)</div>
              <div>🇿🇼 Ndebele (IsiNdebele)</div>
              <div>🇰🇪 Swahili (Kiswahili)</div>
              <div>🇳🇬 Yoruba (Yorùbá)</div>
              <div>🇿🇦 Zulu (IsiZulu)</div>
              <div>🇪🇹 Amharic (አማርኛ)</div>
              <div>🇬🇭 Twi</div>
              <div>🇳🇬 Hausa</div>
              <div>🇳🇬 Igbo</div>
              <div>🇸🇳 Wolof</div>
              <div>🇲🇦 Berber (Tamazight)</div>
              <div>🇲🇬 Malagasy</div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};