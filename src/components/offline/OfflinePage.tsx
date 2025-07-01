import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  WifiOff, 
  Wifi, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  Clock,
  Database,
  Upload,
  Download,
  Settings
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Transaction } from '../../types';

interface OfflinePageProps {
  isOnline: boolean;
  pendingTransactions: Transaction[];
  onSyncData: () => void;
}

interface SyncItem {
  id: string;
  type: 'transaction' | 'profile' | 'chama' | 'investment';
  description: string;
  timestamp: Date;
  status: 'pending' | 'syncing' | 'synced' | 'failed';
  data?: Transaction;
}

export const OfflinePage: React.FC<OfflinePageProps> = ({
  isOnline,
  onSyncData
}) => {
  const [syncItems, setSyncItems] = useState<SyncItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Mock sync items
  useEffect(() => {
    const mockSyncItems: SyncItem[] = [
      {
        id: '1',
        type: 'transaction',
        description: 'Transfer to Sarah - $150 USD',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        status: isOnline ? 'synced' : 'pending'
      },
      {
        id: '2',
        type: 'chama',
        description: 'Chama contribution update',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'pending'
      },
      {
        id: '3',
        type: 'profile',
        description: 'Profile settings changed',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        status: isOnline ? 'synced' : 'failed'
      }
    ];
    setSyncItems(mockSyncItems);
  }, [isOnline]);

  const handleSync = async () => {
    setIsSyncing(true);
    
    // Simulate sync process
    for (let i = 0; i < syncItems.length; i++) {
      if (syncItems[i].status === 'pending') {
        setSyncItems(prev => prev.map(item => 
          item.id === syncItems[i].id 
            ? { ...item, status: 'syncing' } 
            : item
        ));
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSyncItems(prev => prev.map(item => 
          item.id === syncItems[i].id 
            ? { ...item, status: 'synced' } 
            : item
        ));
      }
    }
    
    setIsSyncing(false);
    setLastSyncTime(new Date());
    onSyncData();
  };

  const getStatusIcon = (status: SyncItem['status']) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="text-orange-500" />;
      case 'syncing':
        return <RefreshCw size={16} className="text-blue-500 animate-spin" />;
      case 'synced':
        return <Check size={16} className="text-green-500" />;
      case 'failed':
        return <AlertCircle size={16} className="text-red-500" />;
    }
  };

  const getStatusColor = (status: SyncItem['status']) => {
    switch (status) {
      case 'pending':
        return 'text-orange-600 bg-orange-50';
      case 'syncing':
        return 'text-blue-600 bg-blue-50';
      case 'synced':
        return 'text-green-600 bg-green-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
    }
  };

  const pendingCount = syncItems.filter(item => item.status === 'pending').length;
  const failedCount = syncItems.filter(item => item.status === 'failed').length;
  const syncedCount = syncItems.filter(item => item.status === 'synced').length;

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
          <Database size={24} className="text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Offline & Sync</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`flex items-center px-3 py-2 rounded-lg ${
            isOnline ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
          }`}>
            {isOnline ? <Wifi size={16} className="mr-2" /> : <WifiOff size={16} className="mr-2" />}
            {isOnline ? 'Online' : 'Offline'}
          </div>
          <Button 
            onClick={handleSync} 
            disabled={!isOnline || isSyncing}
            className="flex items-center"
          >
            <RefreshCw size={16} className={`mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-orange-50 border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <Clock size={24} className="text-orange-600" />
              <span className="text-2xl font-bold text-orange-700">{pendingCount}</span>
            </div>
            <div>
              <p className="text-sm text-orange-600 mb-1">Pending Sync</p>
              <p className="text-xs text-orange-500">Waiting for connection</p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="flex items-center justify-between mb-4">
              <Check size={24} className="text-green-600" />
              <span className="text-2xl font-bold text-green-700">{syncedCount}</span>
            </div>
            <div>
              <p className="text-sm text-green-600 mb-1">Synced</p>
              <p className="text-xs text-green-500">Successfully uploaded</p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-red-50 border-red-200">
            <div className="flex items-center justify-between mb-4">
              <AlertCircle size={24} className="text-red-600" />
              <span className="text-2xl font-bold text-red-700">{failedCount}</span>
            </div>
            <div>
              <p className="text-sm text-red-600 mb-1">Failed</p>
              <p className="text-xs text-red-500">Needs attention</p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <Database size={24} className="text-blue-600" />
              <span className="text-sm font-bold text-blue-700">
                {lastSyncTime ? lastSyncTime.toLocaleTimeString() : 'Never'}
              </span>
            </div>
            <div>
              <p className="text-sm text-blue-600 mb-1">Last Sync</p>
              <p className="text-xs text-blue-500">
                {lastSyncTime ? 'Recently synced' : 'No sync yet'}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Sync Queue */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Sync Queue</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {pendingCount + failedCount} items pending
            </span>
            <Button variant="ghost" size="sm">
              <Settings size={16} className="mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {syncItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg mr-4">
                  {getStatusIcon(item.status)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.description}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-500 mr-3">
                      {item.timestamp.toLocaleTimeString()}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              {item.status === 'failed' && (
                <Button variant="ghost" size="sm" className="text-red-600">
                  Retry
                </Button>
              )}
            </motion.div>
          ))}
        </div>

        {syncItems.length === 0 && (
          <div className="text-center py-12">
            <Database size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No sync items found</p>
            <p className="text-sm text-gray-400">All data is up to date</p>
          </div>
        )}
      </Card>

      {/* Offline Capabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Offline</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Check size={16} className="text-green-500 mr-3" />
              <span className="text-gray-700">View account balances</span>
            </div>
            <div className="flex items-center">
              <Check size={16} className="text-green-500 mr-3" />
              <span className="text-gray-700">Browse transaction history</span>
            </div>
            <div className="flex items-center">
              <Check size={16} className="text-green-500 mr-3" />
              <span className="text-gray-700">Queue transactions for sync</span>
            </div>
            <div className="flex items-center">
              <Check size={16} className="text-green-500 mr-3" />
              <span className="text-gray-700">Manage chama information</span>
            </div>
            <div className="flex items-center">
              <Check size={16} className="text-green-500 mr-3" />
              <span className="text-gray-700">Update profile settings</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Requires Connection</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <AlertCircle size={16} className="text-orange-500 mr-3" />
              <span className="text-gray-700">Real-time exchange rates</span>
            </div>
            <div className="flex items-center">
              <AlertCircle size={16} className="text-orange-500 mr-3" />
              <span className="text-gray-700">Live transaction processing</span>
            </div>
            <div className="flex items-center">
              <AlertCircle size={16} className="text-orange-500 mr-3" />
              <span className="text-gray-700">Investment market data</span>
            </div>
            <div className="flex items-center">
              <AlertCircle size={16} className="text-orange-500 mr-3" />
              <span className="text-gray-700">Chama group messaging</span>
            </div>
            <div className="flex items-center">
              <AlertCircle size={16} className="text-orange-500 mr-3" />
              <span className="text-gray-700">Push notifications</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Data Usage */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-3">
              <Download size={24} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">2.4 MB</p>
            <p className="text-sm text-gray-500">Downloaded today</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-lg mx-auto mb-3">
              <Upload size={24} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">850 KB</p>
            <p className="text-sm text-gray-500">Uploaded today</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-lg mx-auto mb-3">
              <Database size={24} className="text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">12.3 MB</p>
            <p className="text-sm text-gray-500">Stored offline</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
