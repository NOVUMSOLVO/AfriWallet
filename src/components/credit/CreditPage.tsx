import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown,
  Star,
  Shield,
  AlertCircle,
  CheckCircle,
  CreditCard,
  Calendar,
  Target,
  Info,
  Lightbulb,
  RefreshCw,
  Eye,
  Lock
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/currency';

interface CreditPageProps {
  selectedCurrency: string;
}

interface CreditFactor {
  name: string;
  impact: 'high' | 'medium' | 'low';
  score: number;
  maxScore: number;
  description: string;
  recommendations: string[];
}

interface CreditHistoryEntry {
  date: Date;
  score: number;
  change: number;
  reason: string;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'moderate' | 'hard';
  timeframe: string;
  completed: boolean;
}

export const CreditPage: React.FC<CreditPageProps> = ({
  selectedCurrency
}) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'factors' | 'history' | 'tips'>('overview');
  const [showDetails, setShowDetails] = useState(false);

  // Mock credit data
  const currentScore = 720;
  const previousScore = 695;
  const scoreChange = currentScore - previousScore;
  const scoreCategory = currentScore >= 750 ? 'Excellent' : 
                       currentScore >= 700 ? 'Good' : 
                       currentScore >= 650 ? 'Fair' : 'Poor';

  const creditFactors: CreditFactor[] = [
    {
      name: 'Payment History',
      impact: 'high',
      score: 95,
      maxScore: 100,
      description: 'Your track record of making payments on time',
      recommendations: [
        'Continue making all payments on time',
        'Set up automatic payments for bills',
        'Pay at least the minimum amount due'
      ]
    },
    {
      name: 'Credit Utilization',
      impact: 'high',
      score: 78,
      maxScore: 100,
      description: 'How much of your available credit you are using',
      recommendations: [
        'Keep credit utilization below 30%',
        'Pay down existing balances',
        'Consider requesting credit limit increases'
      ]
    },
    {
      name: 'Length of Credit History',
      impact: 'medium',
      score: 85,
      maxScore: 100,
      description: 'How long you have been using credit',
      recommendations: [
        'Keep old accounts open',
        'Avoid closing your oldest credit cards',
        'Be patient as this improves with time'
      ]
    },
    {
      name: 'Credit Mix',
      impact: 'low',
      score: 70,
      maxScore: 100,
      description: 'The variety of credit accounts you have',
      recommendations: [
        'Consider a mix of credit cards and loans',
        'Add an installment loan if appropriate',
        'Manage different types of credit responsibly'
      ]
    },
    {
      name: 'New Credit',
      impact: 'medium',
      score: 82,
      maxScore: 100,
      description: 'Recent credit inquiries and new accounts',
      recommendations: [
        'Limit new credit applications',
        'Space out credit applications over time',
        'Only apply for credit when needed'
      ]
    }
  ];

  const creditHistory: CreditHistoryEntry[] = [
    { date: new Date('2024-06-01'), score: 720, change: 25, reason: 'Reduced credit utilization' },
    { date: new Date('2024-05-01'), score: 695, change: -5, reason: 'New credit inquiry' },
    { date: new Date('2024-04-01'), score: 700, change: 15, reason: 'On-time payments' },
    { date: new Date('2024-03-01'), score: 685, change: 10, reason: 'Paid down debt' },
    { date: new Date('2024-02-01'), score: 675, change: -10, reason: 'Missed payment' },
    { date: new Date('2024-01-01'), score: 685, change: 0, reason: 'No change' }
  ];

  const recommendations: Recommendation[] = [
    {
      id: '1',
      title: 'Lower Your Credit Utilization',
      description: 'Pay down your credit card balances to below 30% of your credit limits',
      impact: 'high',
      difficulty: 'moderate',
      timeframe: '1-2 months',
      completed: false
    },
    {
      id: '2',
      title: 'Set Up Automatic Payments',
      description: 'Ensure you never miss a payment by setting up autopay for all your bills',
      impact: 'high',
      difficulty: 'easy',
      timeframe: '1 week',
      completed: false
    },
    {
      id: '3',
      title: 'Check Your Credit Report',
      description: 'Review your credit report for errors and dispute any inaccuracies',
      impact: 'medium',
      difficulty: 'easy',
      timeframe: '2 weeks',
      completed: true
    },
    {
      id: '4',
      title: 'Request Credit Limit Increase',
      description: 'Ask for higher credit limits on existing cards to improve utilization ratio',
      impact: 'medium',
      difficulty: 'easy',
      timeframe: '1 month',
      completed: false
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600 bg-green-50';
    if (score >= 700) return 'text-blue-600 bg-blue-50';
    if (score >= 650) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-orange-600 bg-orange-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-50';
      case 'moderate':
        return 'text-orange-600 bg-orange-50';
      case 'hard':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

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
          <Star size={24} className="text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Credit Score</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center">
            <RefreshCw size={16} className="mr-2" />
            Update Score
          </Button>
          <Button variant="outline" className="flex items-center">
            <Eye size={16} className="mr-2" />
            Full Report
          </Button>
        </div>
      </div>

      {/* Credit Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Score Card */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="relative inline-block mb-6">
              <svg width="200" height="200" className="transform -rotate-90">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 80}`}
                  initial={{ strokeDashoffset: `${2 * Math.PI * 80}` }}
                  animate={{ strokeDashoffset: `${2 * Math.PI * 80 * (1 - (currentScore - 300) / 550)}` }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <motion.div
                    className="text-4xl font-bold text-gray-900"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    {currentScore}
                  </motion.div>
                  <div className="text-sm text-gray-500">300-850</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(currentScore)}`}>
                {scoreCategory}
              </div>
              <div className="flex items-center justify-center">
                {scoreChange > 0 ? (
                  <TrendingUp size={16} className="text-green-500 mr-2" />
                ) : scoreChange < 0 ? (
                  <TrendingDown size={16} className="text-red-500 mr-2" />
                ) : null}
                <span className={`text-sm font-medium ${
                  scoreChange > 0 ? 'text-green-600' : 
                  scoreChange < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {scoreChange > 0 ? '+' : ''}{scoreChange} points this month
                </span>
              </div>
              <p className="text-xs text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4">
            <div className="flex items-center">
              <Shield size={20} className="text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Credit Health</p>
                <p className="text-xs text-gray-500">Good standing</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center">
              <CreditCard size={20} className="text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Utilization</p>
                <p className="text-xs text-gray-500">28% of credit limit</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center">
              <Calendar size={20} className="text-purple-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Credit Age</p>
                <p className="text-xs text-gray-500">5 years, 3 months</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center">
              <Target size={20} className="text-orange-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Next Goal</p>
                <p className="text-xs text-gray-500">750+ score</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'factors', label: 'Score Factors' },
          { id: 'history', label: 'History' },
          { id: 'tips', label: 'Improvement Tips' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              selectedTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What Affects Your Score</h3>
            <div className="space-y-4">
              {creditFactors.slice(0, 3).map((factor, index) => (
                <div key={factor.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      factor.impact === 'high' ? 'bg-red-500' :
                      factor.impact === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                    }`} />
                    <span className="text-sm font-medium text-gray-700">{factor.name}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <motion.div
                        className="bg-blue-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(factor.score / factor.maxScore) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{factor.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {creditHistory.slice(0, 4).map((entry, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{entry.reason}</p>
                    <p className="text-xs text-gray-500">{entry.date.toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center">
                    {entry.change > 0 ? (
                      <TrendingUp size={14} className="text-green-500 mr-1" />
                    ) : entry.change < 0 ? (
                      <TrendingDown size={14} className="text-red-500 mr-1" />
                    ) : null}
                    <span className={`text-sm font-medium ${
                      entry.change > 0 ? 'text-green-600' : 
                      entry.change < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {entry.change > 0 ? '+' : ''}{entry.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Score Factors Tab */}
      {selectedTab === 'factors' && (
        <div className="space-y-6">
          {creditFactors.map((factor, index) => (
            <motion.div
              key={factor.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 mr-3">{factor.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getImpactColor(factor.impact)}`}>
                        {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)} Impact
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{factor.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{factor.score}%</div>
                    <div className="text-sm text-gray-500">Score</div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(factor.score / factor.maxScore) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Recommendations:</h4>
                  <ul className="space-y-1">
                    {factor.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* History Tab */}
      {selectedTab === 'history' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Credit Score History</h3>
          
          {/* Simple Chart Representation */}
          <div className="relative h-64 mb-6">
            <div className="absolute inset-0 flex items-end justify-between">
              {creditHistory.reverse().map((entry, index) => (
                <div key={index} className="flex flex-col items-center">
                  <motion.div
                    className="bg-blue-500 rounded-t w-8"
                    style={{ height: `${((entry.score - 600) / 250) * 200}px` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${((entry.score - 600) / 250) * 200}px` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium text-gray-900">{entry.score}</div>
                    <div className="text-xs text-gray-500">{entry.date.toLocaleDateString('en-US', { month: 'short' })}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* History Table */}
          <div className="space-y-3">
            {creditHistory.reverse().map((entry, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                    entry.change > 0 ? 'bg-green-100' : 
                    entry.change < 0 ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    {entry.change > 0 ? (
                      <TrendingUp size={16} className="text-green-600" />
                    ) : entry.change < 0 ? (
                      <TrendingDown size={16} className="text-red-600" />
                    ) : (
                      <Info size={16} className="text-gray-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{entry.reason}</p>
                    <p className="text-sm text-gray-500">{entry.date.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{entry.score}</p>
                  <p className={`text-sm font-medium ${
                    entry.change > 0 ? 'text-green-600' : 
                    entry.change < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {entry.change > 0 ? '+' : ''}{entry.change}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {/* Tips Tab */}
      {selectedTab === 'tips' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-6 ${rec.completed ? 'bg-green-50 border-green-200' : ''}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                      rec.completed ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      {rec.completed ? (
                        <CheckCircle size={16} className="text-green-600" />
                      ) : (
                        <Lightbulb size={16} className="text-blue-600" />
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                  </div>
                  {rec.completed && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                      Completed
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4">{rec.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getImpactColor(rec.impact)}`}>
                      {rec.impact.charAt(0).toUpperCase() + rec.impact.slice(1)} Impact
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(rec.difficulty)}`}>
                      {rec.difficulty.charAt(0).toUpperCase() + rec.difficulty.slice(1)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{rec.timeframe}</span>
                </div>

                {!rec.completed && (
                  <Button size="sm" className="w-full">
                    Start This Action
                  </Button>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
