import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
  Award,
  ArrowRight,
  UserPlus,
  Settings
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/currency';
import { mockChamas } from '../../utils/mockData';

interface ChamaPageProps {
  selectedCurrency: string;
}

export const ChamaPage: React.FC<ChamaPageProps> = ({ selectedCurrency }) => {
  const [chamas] = useState(mockChamas);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedChama, setSelectedChama] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'inactive':
        return 'text-orange-600 bg-orange-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case 'weekly':
        return Calendar;
      case 'monthly':
        return Clock;
      case 'quarterly':
        return Target;
      default:
        return Calendar;
    }
  };

  const totalChamaValue = chamas.reduce((sum, chama) => sum + chama.myContribution, 0);
  const totalPoolValue = chamas.reduce((sum, chama) => sum + chama.totalPool, 0);

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
          <Users size={24} className="text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Group Savings (Chama)</h1>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Create Chama
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign size={24} className="text-blue-600" />
              </div>
              <span className="text-sm text-blue-600 font-medium">My Total</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(totalChamaValue, selectedCurrency)}
            </h3>
            <p className="text-sm text-gray-600">Across {chamas.length} groups</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp size={24} className="text-green-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">Total Pool</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(totalPoolValue, selectedCurrency)}
            </h3>
            <p className="text-sm text-gray-600">Combined value</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award size={24} className="text-purple-600" />
              </div>
              <span className="text-sm text-purple-600 font-medium">Active Groups</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {chamas.filter(c => c.status === 'active').length}
            </h3>
            <p className="text-sm text-gray-600">Currently participating</p>
          </Card>
        </motion.div>
      </div>

      {/* My Chamas */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">My Chamas</h3>
        <div className="space-y-4">
          {chamas.map((chama, index) => {
            const FrequencyIcon = getFrequencyIcon(chama.contributionFrequency);
            const progress = (chama.myContribution / chama.totalPool) * 100;
            
            return (
              <motion.div
                key={chama.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedChama(chama.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="font-semibold text-gray-900 mr-3">{chama.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(chama.status)}`}>
                        {chama.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{chama.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <Users size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{chama.memberCount} members</span>
                      </div>
                      <div className="flex items-center">
                        <FrequencyIcon size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600 capitalize">{chama.contributionFrequency}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">
                          {formatCurrency(chama.myContribution, selectedCurrency)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Target size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">
                          {formatCurrency(chama.totalPool, selectedCurrency)}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">My contribution</span>
                        <span className="font-medium">{progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </div>

                    {/* Next Contribution */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        Next contribution: {chama.nextContributionDate.toLocaleDateString()}
                      </div>
                      <Button size="sm" variant="outline">
                        Contribute
                      </Button>
                    </div>
                  </div>
                  
                  <ArrowRight size={20} className="text-gray-400 ml-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className="p-4 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => alert('Invite friends feature coming soon!')}
        >
          <div className="flex items-center">
            <UserPlus size={20} className="text-blue-600 mr-3" />
            <div>
              <h4 className="font-medium text-gray-900">Invite Friends</h4>
              <p className="text-sm text-gray-600">Grow your chama network</p>
            </div>
          </div>
        </Card>
        
        <Card 
          className="p-4 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => window.location.hash = '#invest'}
        >
          <div className="flex items-center">
            <TrendingUp size={20} className="text-green-600 mr-3" />
            <div>
              <h4 className="font-medium text-gray-900">Investment Options</h4>
              <p className="text-sm text-gray-600">Grow your chama funds</p>
            </div>
          </div>
        </Card>
        
        <Card 
          className="p-4 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => alert('Group management features coming soon!')}
        >
          <div className="flex items-center">
            <Settings size={20} className="text-purple-600 mr-3" />
            <div>
              <h4 className="font-medium text-gray-900">Manage Groups</h4>
              <p className="text-sm text-gray-600">Edit chama settings</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Create Chama Modal */}
      {showCreateModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h3 className="text-lg font-semibold mb-4">Create New Chama</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chama Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter chama name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  rows={3}
                  placeholder="Describe your chama purpose"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contribution Frequency</label>
                <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => setShowCreateModal(false)}
                >
                  Create Chama
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};