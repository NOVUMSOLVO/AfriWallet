import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Fingerprint, 
  Key, 
  AlertTriangle, 
  CheckCircle, 
  Settings, 
  UserCheck, 
  Clock, 
  Map, 
  Globe, 
  Download, 
  Trash2,
  RefreshCw,
  Bell,
  Database,
  FileText,
  Camera,
  Wifi,
  WifiOff
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';

interface SecurityPageProps {}

interface SecurityEvent {
  id: string;
  type: 'login' | 'transaction' | 'settings_change' | 'suspicious';
  description: string;
  timestamp: Date;
  location: string;
  device: string;
  ipAddress: string;
  status: 'success' | 'failed' | 'blocked';
}

interface BiometricOption {
  id: string;
  name: string;
  description: string;
  icon: any;
  enabled: boolean;
  available: boolean;
}

interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  category: 'data' | 'sharing' | 'tracking' | 'communication';
}

export const AdvancedSecurityPage: React.FC<SecurityPageProps> = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'biometrics' | 'privacy' | 'activity' | 'devices'>('overview');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [securityScore, setSecurityScore] = useState(85);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [biometricOptions, setBiometricOptions] = useState<BiometricOption[]>([
    {
      id: 'fingerprint',
      name: 'Fingerprint',
      description: 'Use your fingerprint to unlock the app',
      icon: Fingerprint,
      enabled: true,
      available: true
    },
    {
      id: 'face',
      name: 'Face Recognition',
      description: 'Use facial recognition for authentication',
      icon: Eye,
      enabled: false,
      available: true
    },
    {
      id: 'voice',
      name: 'Voice Recognition',
      description: 'Use your voice pattern for verification',
      icon: Smartphone,
      enabled: false,
      available: false
    }
  ]);

  const [privacySettings, setPrivacySettings] = useState<PrivacySetting[]>([
    {
      id: 'analytics',
      title: 'Analytics & Performance',
      description: 'Help improve the app by sharing anonymous usage data',
      enabled: true,
      category: 'data'
    },
    {
      id: 'location',
      title: 'Location Services',
      description: 'Allow location access for fraud detection and nearby services',
      enabled: true,
      category: 'data'
    },
    {
      id: 'marketing',
      title: 'Marketing Communications',
      description: 'Receive personalized offers and financial tips',
      enabled: false,
      category: 'communication'
    },
    {
      id: 'data_sharing',
      title: 'Data Sharing with Partners',
      description: 'Share anonymized data with trusted financial partners',
      enabled: false,
      category: 'sharing'
    },
    {
      id: 'cross_app',
      title: 'Cross-App Tracking',
      description: 'Prevent other apps from tracking your activity',
      enabled: true,
      category: 'tracking'
    }
  ]);

  const securityEvents: SecurityEvent[] = [
    {
      id: '1',
      type: 'login',
      description: 'Successful login',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      location: 'Nairobi, Kenya',
      device: 'iPhone 14 Pro',
      ipAddress: '196.216.xxx.xxx',
      status: 'success'
    },
    {
      id: '2',
      type: 'transaction',
      description: 'Money transfer to John Doe',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      location: 'Nairobi, Kenya',
      device: 'iPhone 14 Pro',
      ipAddress: '196.216.xxx.xxx',
      status: 'success'
    },
    {
      id: '3',
      type: 'suspicious',
      description: 'Login attempt blocked from unusual location',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      location: 'Lagos, Nigeria',
      device: 'Unknown Device',
      ipAddress: '197.xxx.xxx.xxx',
      status: 'blocked'
    }
  ];

  const connectedDevices = [
    {
      id: '1',
      name: 'iPhone 14 Pro',
      type: 'Mobile',
      lastActive: new Date(),
      location: 'Nairobi, Kenya',
      current: true
    },
    {
      id: '2',
      name: 'MacBook Pro',
      type: 'Desktop',
      lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      location: 'Nairobi, Kenya',
      current: false
    }
  ];

  useEffect(() => {
    // Calculate security score based on enabled features
    let score = 40; // Base score
    if (twoFactorEnabled) score += 25;
    if (biometricOptions.some(opt => opt.enabled)) score += 20;
    if (privacySettings.filter(setting => setting.category === 'tracking' && setting.enabled).length > 0) score += 15;
    setSecurityScore(Math.min(score, 100));
  }, [twoFactorEnabled, biometricOptions, privacySettings]);

  const toggleBiometric = (id: string) => {
    setBiometricOptions(prev => 
      prev.map(opt => 
        opt.id === id ? { ...opt, enabled: !opt.enabled } : opt
      )
    );
  };

  const togglePrivacySetting = (id: string) => {
    setPrivacySettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getEventIcon = (type: string, status: string) => {
    if (status === 'blocked') return <Shield className="text-red-600" size={16} />;
    if (status === 'failed') return <AlertTriangle className="text-orange-600" size={16} />;
    
    switch (type) {
      case 'login': return <UserCheck className="text-blue-600" size={16} />;
      case 'transaction': return <Database className="text-green-600" size={16} />;
      case 'settings_change': return <Settings className="text-purple-600" size={16} />;
      default: return <CheckCircle className="text-gray-600" size={16} />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Security Score */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Security Score</h3>
            <p className="text-sm text-gray-600">Your overall security rating</p>
          </div>
          <div className={`px-4 py-2 rounded-full ${getScoreColor(securityScore)}`}>
            <span className="text-2xl font-bold">{securityScore}</span>
            <span className="text-sm">/100</span>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${securityScore}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <CheckCircle size={24} className="text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-blue-800">Strong Password</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Fingerprint size={24} className="text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-green-800">Biometrics Active</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <AlertTriangle size={24} className="text-orange-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-orange-800">Enable 2FA</p>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Two-Factor Authentication</h4>
          <p className="text-sm text-gray-600 mb-4">
            Add an extra layer of security to your account
          </p>
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-sm ${
              twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </span>
            <Button 
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              variant={twoFactorEnabled ? 'outline' : 'default'}
            >
              {twoFactorEnabled ? 'Disable' : 'Enable'}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Password Management</h4>
          <p className="text-sm text-gray-600 mb-4">
            Update your password regularly for better security
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Last changed: 2 months ago</span>
            <Button onClick={() => setShowPasswordModal(true)}>
              Change Password
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Security Events */}
      <Card className="p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Recent Security Events</h4>
        <div className="space-y-3">
          {securityEvents.slice(0, 3).map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                {getEventIcon(event.type, event.status)}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{event.description}</p>
                  <p className="text-xs text-gray-500">{event.location} • {event.timestamp.toLocaleString()}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                event.status === 'success' ? 'bg-green-100 text-green-800' :
                event.status === 'blocked' ? 'bg-red-100 text-red-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {event.status}
              </span>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          View All Activity
        </Button>
      </Card>
    </div>
  );

  const renderBiometrics = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Biometric Authentication</h3>
        <p className="text-gray-600 mb-6">Use your unique biological features to secure your account</p>
        
        <div className="space-y-4">
          {biometricOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div key={option.id} className={`p-4 border rounded-lg ${
                option.available ? 'border-gray-200' : 'border-gray-100 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <IconComponent size={24} className={`mr-4 ${
                      option.available ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <div>
                      <h4 className={`font-medium ${
                        option.available ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {option.name}
                      </h4>
                      <p className={`text-sm ${
                        option.available ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {!option.available && (
                      <span className="text-xs text-gray-400">Not Available</span>
                    )}
                    <button
                      onClick={() => option.available && toggleBiometric(option.id)}
                      disabled={!option.available}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        option.enabled && option.available ? 'bg-blue-600' : 'bg-gray-200'
                      } ${!option.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          option.enabled && option.available ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Biometric Data Management</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="font-medium text-blue-900">Fingerprint Templates</p>
              <p className="text-sm text-blue-700">3 fingerprints enrolled</p>
            </div>
            <Button size="sm" variant="outline">Manage</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Face Recognition</p>
              <p className="text-sm text-gray-600">Not set up</p>
            </div>
            <Button size="sm">Set Up</Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Controls</h3>
        <p className="text-gray-600 mb-6">Manage how your data is collected and used</p>
        
        <div className="space-y-6">
          {['data', 'sharing', 'tracking', 'communication'].map((category) => {
            const categorySettings = privacySettings.filter(setting => setting.category === category);
            const categoryNames = {
              data: 'Data Collection',
              sharing: 'Data Sharing',
              tracking: 'Privacy Protection',
              communication: 'Communications'
            };
            
            return (
              <div key={category}>
                <h4 className="font-medium text-gray-900 mb-3">{categoryNames[category as keyof typeof categoryNames]}</h4>
                <div className="space-y-3">
                  {categorySettings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{setting.title}</h5>
                        <p className="text-sm text-gray-600">{setting.description}</p>
                      </div>
                      <button
                        onClick={() => togglePrivacySetting(setting.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          setting.enabled ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            setting.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Data Rights</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="flex items-center justify-center p-4">
            <Download size={16} className="mr-2" />
            Export Data
          </Button>
          <Button variant="outline" className="flex items-center justify-center p-4">
            <FileText size={16} className="mr-2" />
            Privacy Report
          </Button>
          <Button variant="outline" className="flex items-center justify-center p-4 text-red-600 border-red-200 hover:bg-red-50">
            <Trash2 size={16} className="mr-2" />
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Security Activity</h3>
          <Button size="sm" variant="outline">
            <RefreshCw size={14} className="mr-2" />
            Refresh
          </Button>
        </div>
        
        <div className="space-y-4">
          {securityEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  {getEventIcon(event.type, event.status)}
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">{event.description}</h4>
                    <div className="mt-1 space-y-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={12} className="mr-1" />
                        {event.timestamp.toLocaleString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Map size={12} className="mr-1" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Smartphone size={12} className="mr-1" />
                        {event.device}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Globe size={12} className="mr-1" />
                        {event.ipAddress}
                      </div>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  event.status === 'success' ? 'bg-green-100 text-green-800' :
                  event.status === 'blocked' ? 'bg-red-100 text-red-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {event.status}
                </span>
              </div>
              {event.status === 'blocked' && (
                <div className="mt-3 p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-800">
                    This activity was blocked by our security system. If this was you, please contact support.
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderDevices = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Devices</h3>
        <p className="text-gray-600 mb-6">Manage devices that have access to your account</p>
        
        <div className="space-y-4">
          {connectedDevices.map((device) => (
            <div key={device.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Smartphone size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {device.name}
                      {device.current && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Current
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-600">{device.type}</p>
                    <p className="text-sm text-gray-500">
                      Last active: {device.lastActive.toLocaleDateString()} • {device.location}
                    </p>
                  </div>
                </div>
                {!device.current && (
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Device Security</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle size={20} className="text-green-600 mr-3" />
              <div>
                <p className="font-medium text-green-900">Device Encryption</p>
                <p className="text-sm text-green-700">Your device is encrypted</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <Wifi size={20} className="text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-blue-900">Secure Connection</p>
                <p className="text-sm text-blue-700">Connected via encrypted network</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

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
          <Shield size={24} className="text-blue-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Security & Privacy</h1>
            <p className="text-gray-600">Protect your account and manage your privacy</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full ${getScoreColor(securityScore)}`}>
            <span className="text-sm font-medium">Security Score: {securityScore}/100</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview', icon: Shield },
          { id: 'biometrics', label: 'Biometrics', icon: Fingerprint },
          { id: 'privacy', label: 'Privacy', icon: Eye },
          { id: 'activity', label: 'Activity', icon: Clock },
          { id: 'devices', label: 'Devices', icon: Smartphone }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                selectedTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon size={16} className="mr-2" />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {selectedTab === 'overview' && renderOverview()}
          {selectedTab === 'biometrics' && renderBiometrics()}
          {selectedTab === 'privacy' && renderPrivacy()}
          {selectedTab === 'activity' && renderActivity()}
          {selectedTab === 'devices' && renderDevices()}
        </motion.div>
      </AnimatePresence>

      {/* Password Change Modal */}
      <Modal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)}>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
          <div className="space-y-4">
            <Input type="password" placeholder="Current Password" />
            <Input type="password" placeholder="New Password" />
            <Input type="password" placeholder="Confirm New Password" />
          </div>
          <div className="flex space-x-3 mt-6">
            <Button variant="outline" onClick={() => setShowPasswordModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={() => setShowPasswordModal(false)} className="flex-1">
              Update Password
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};
