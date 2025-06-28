import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3,
  Target,
  Shield,
  AlertTriangle,
  Plus,
  Eye,
  Calendar,
  Award,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/currency';
import { mockInvestments } from '../../utils/mockData';

interface InvestmentPageProps {
  selectedCurrency: string;
}

export const InvestmentPage: React.FC<InvestmentPageProps> = ({ selectedCurrency }) => {
  const [investments] = useState(mockInvestments);
  const [selectedTab, setSelectedTab] = useState<'portfolio' | 'opportunities' | 'performance'>('portfolio');

  const totalInvestmentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturn = totalInvestmentValue - totalInvested;
  const returnPercentage = (totalReturn / totalInvested) * 100;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-blue-600 bg-blue-100';
      case 'matured':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const investmentOpportunities = [
    {
      id: '1',
      name: 'Government Treasury Bills',
      type: 'treasury_bills',
      minInvestment: 100,
      expectedReturn: '8.5%',
      duration: '91 days',
      riskLevel: 'low',
      description: 'Secure government-backed investment with guaranteed returns'
    },
    {
      id: '2',
      name: 'Blue Chip Stocks',
      type: 'stocks',
      minInvestment: 500,
      expectedReturn: '12-18%',
      duration: '1+ years',
      riskLevel: 'medium',
      description: 'Diversified portfolio of established companies'
    },
    {
      id: '3',
      name: 'Corporate Bonds',
      type: 'bonds',
      minInvestment: 250,
      expectedReturn: '7-9%',
      duration: '2-5 years',
      riskLevel: 'low',
      description: 'Fixed income from reputable corporations'
    },
    {
      id: '4',
      name: 'Mutual Funds',
      type: 'mutual_funds',
      minInvestment: 50,
      expectedReturn: '10-15%',
      duration: '3+ years',
      riskLevel: 'medium',
      description: 'Professionally managed diversified portfolio'
    }
  ];

  const tabs = [
    { id: 'portfolio', label: 'My Portfolio', icon: PieChart },
    { id: 'opportunities', label: 'Opportunities', icon: Target },
    { id: 'performance', label: 'Performance', icon: BarChart3 }
  ];

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
          <TrendingUp size={24} className="text-green-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Investments</h1>
        </div>
        <Button className="flex items-center">
          <Plus size={16} className="mr-2" />
          New Investment
        </Button>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign size={24} className="text-green-600" />
              </div>
              <TrendingUp size={20} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(totalInvestmentValue, selectedCurrency)}
            </h3>
            <p className="text-sm text-gray-600">Total Portfolio Value</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target size={24} className="text-blue-600" />
              </div>
              <ArrowUpRight size={20} className="text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(totalInvested, selectedCurrency)}
            </h3>
            <p className="text-sm text-gray-600">Total Invested</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className={`p-6 bg-gradient-to-br ${
            totalReturn >= 0 ? 'from-green-50 to-emerald-50 border-green-200' : 'from-red-50 to-rose-50 border-red-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                totalReturn >= 0 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {totalReturn >= 0 ? (
                  <TrendingUp size={24} className="text-green-600" />
                ) : (
                  <TrendingDown size={24} className="text-red-600" />
                )}
              </div>
              {totalReturn >= 0 ? (
                <ArrowUpRight size={20} className="text-green-600" />
              ) : (
                <ArrowDownRight size={20} className="text-red-600" />
              )}
            </div>
            <h3 className={`text-2xl font-bold mb-1 ${
              totalReturn >= 0 ? 'text-green-700' : 'text-red-700'
            }`}>
              {totalReturn >= 0 ? '+' : ''}{formatCurrency(totalReturn, selectedCurrency)}
            </h3>
            <p className="text-sm text-gray-600">Total Returns</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award size={24} className="text-purple-600" />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                returnPercentage >= 0 ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
              }`}>
                {returnPercentage >= 0 ? '+' : ''}{returnPercentage.toFixed(1)}%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {investments.length}
            </h3>
            <p className="text-sm text-gray-600">Active Investments</p>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
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
      {selectedTab === 'portfolio' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">My Investment Portfolio</h3>
          <div className="space-y-4">
            {investments.map((investment, index) => {
              const returnAmount = investment.currentValue - investment.amount;
              const returnPercent = ((returnAmount / investment.amount) * 100);
              
              return (
                <motion.div
                  key={investment.id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="font-semibold text-gray-900 mr-3">{investment.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(investment.riskLevel)}`}>
                          {investment.riskLevel} risk
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${getStatusColor(investment.status)}`}>
                          {investment.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Invested</p>
                          <p className="font-semibold">{formatCurrency(investment.amount, selectedCurrency)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Current Value</p>
                          <p className="font-semibold">{formatCurrency(investment.currentValue, selectedCurrency)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Returns</p>
                          <p className={`font-semibold ${returnAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {returnAmount >= 0 ? '+' : ''}{formatCurrency(returnAmount, selectedCurrency)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Performance</p>
                          <p className={`font-semibold ${returnPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {returnPercent >= 0 ? '+' : ''}{returnPercent.toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          Duration: {investment.duration}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye size={14} className="mr-1" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      )}

      {selectedTab === 'opportunities' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Opportunities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {investmentOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{opportunity.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{opportunity.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Expected Return</span>
                        <span className="font-medium text-green-600">{opportunity.expectedReturn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Min. Investment</span>
                        <span className="font-medium">{formatCurrency(opportunity.minInvestment, selectedCurrency)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Duration</span>
                        <span className="font-medium">{opportunity.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(opportunity.riskLevel)}`}>
                        {opportunity.riskLevel} risk
                      </span>
                      <Button 
                        size="sm"
                        onClick={() => alert(`Investing in ${opportunity.name} - Feature coming soon!`)}
                      >
                        Invest Now
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {selectedTab === 'performance' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Performance chart coming soon</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Risk Distribution</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                    <span className="text-sm">Low Risk</span>
                  </div>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                    <span className="text-sm">Medium Risk</span>
                  </div>
                  <span className="text-sm font-medium">35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                    <span className="text-sm">High Risk</span>
                  </div>
                  <span className="text-sm font-medium">5%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Investment Tips</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Shield size={16} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Diversify your portfolio across different asset classes</p>
                </div>
                <div className="flex items-start">
                  <Target size={16} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Set clear investment goals and timelines</p>
                </div>
                <div className="flex items-start">
                  <AlertTriangle size={16} className="text-orange-600 mr-2 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Only invest what you can afford to lose</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </motion.div>
  );
};