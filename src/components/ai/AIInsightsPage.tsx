import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  AlertTriangle,
  Lightbulb,
  PieChart,
  BarChart3,
  Zap,
  DollarSign
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/currency';
import { Transaction, BudgetCategory, Goal } from '../../types';

interface AIInsight {
  id: string;
  type: 'spending' | 'saving' | 'investment' | 'goal' | 'budget' | 'risk';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  recommendation?: string;
  potentialSaving?: number;
  confidence: number;
}

interface AIInsightsProps {
  transactions: Transaction[];
  budgetCategories: BudgetCategory[];
  goals: Goal[];
  selectedCurrency: string;
}

export const AIInsightsPage: React.FC<AIInsightsProps> = ({
  transactions,
  budgetCategories,
  goals,
  selectedCurrency
}) => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    generateAIInsights();
  }, [transactions, budgetCategories, goals]);

  const generateAIInsights = async () => {
    setIsLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedInsights: AIInsight[] = [];

    // Spending Pattern Analysis
    const recentTransactions = transactions.slice(0, 10);
    const totalSpent = recentTransactions
      .filter(t => t.type === 'send' || t.type === 'withdrawal')
      .reduce((sum, t) => sum + t.amount, 0);

    if (totalSpent > 500) {
      generatedInsights.push({
        id: '1',
        type: 'spending',
        title: 'High Spending Detected',
        description: `You've spent ${formatCurrency(totalSpent, selectedCurrency)} in recent transactions, which is 23% higher than usual.`,
        impact: 'high',
        actionable: true,
        recommendation: 'Consider reviewing your recent purchases and setting up spending alerts.',
        confidence: 87
      });
    }

    // Budget Analysis
    const overBudgetCategories = budgetCategories.filter(cat => cat.spent > cat.allocated);
    if (overBudgetCategories.length > 0) {
      generatedInsights.push({
        id: '2',
        type: 'budget',
        title: 'Budget Exceeded',
        description: `You've exceeded your budget in ${overBudgetCategories.length} categories this month.`,
        impact: 'medium',
        actionable: true,
        recommendation: 'Adjust your spending or increase budget allocation for these categories.',
        confidence: 95
      });
    }

    // Goal Progress Analysis
    const activeGoals = goals.filter(g => g.isActive);
    const strugglingGoals = activeGoals.filter(g => {
      const progress = g.currentAmount / g.targetAmount;
      const timeProgress = (Date.now() - Date.now()) / (g.targetDate.getTime() - Date.now());
      return progress < timeProgress * 0.8;
    });

    if (strugglingGoals.length > 0) {
      generatedInsights.push({
        id: '3',
        type: 'goal',
        title: 'Goals Behind Schedule',
        description: `${strugglingGoals.length} of your financial goals are behind schedule.`,
        impact: 'medium',
        actionable: true,
        recommendation: 'Consider increasing your monthly contributions or adjusting goal timelines.',
        confidence: 78
      });
    }

    // Investment Opportunity
    const availableBalance = 1250; // Mock calculation
    if (availableBalance > 1000) {
      generatedInsights.push({
        id: '4',
        type: 'investment',
        title: 'Investment Opportunity',
        description: 'You have excess funds that could be earning returns through investments.',
        impact: 'high',
        actionable: true,
        recommendation: 'Consider investing in low-risk treasury bills or diversified portfolios.',
        potentialSaving: availableBalance * 0.08, // 8% annual return
        confidence: 82
      });
    }

    // Savings Optimization
    const avgMonthlySpending = totalSpent;
    if (avgMonthlySpending > 0) {
      generatedInsights.push({
        id: '5',
        type: 'saving',
        title: 'Savings Optimization',
        description: 'AI detected potential savings in your spending patterns.',
        impact: 'medium',
        actionable: true,
        recommendation: 'Switch to more cost-effective alternatives for recurring expenses.',
        potentialSaving: avgMonthlySpending * 0.15,
        confidence: 71
      });
    }

    // Risk Assessment
    const riskFactors = calculateRiskFactors();
    if (riskFactors > 3) {
      generatedInsights.push({
        id: '6',
        type: 'risk',
        title: 'Financial Risk Assessment',
        description: 'Your financial profile shows some risk factors that need attention.',
        impact: 'high',
        actionable: true,
        recommendation: 'Build an emergency fund and diversify your income sources.',
        confidence: 89
      });
    }

    setInsights(generatedInsights);
    setIsLoading(false);
  };

  const calculateRiskFactors = (): number => {
    let risk = 0;
    
    // High spending ratio
    if (transactions.length > 0) risk += 1;
    
    // No emergency fund
    const emergencyGoal = goals.find(g => g.category === 'emergency');
    if (!emergencyGoal || emergencyGoal.currentAmount < emergencyGoal.targetAmount * 0.5) {
      risk += 2;
    }
    
    // Over-budget spending
    if (budgetCategories.some(cat => cat.spent > cat.allocated)) {
      risk += 1;
    }
    
    return risk;
  };

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'spending':
        return TrendingDown;
      case 'saving':
        return DollarSign;
      case 'investment':
        return TrendingUp;
      case 'goal':
        return Target;
      case 'budget':
        return PieChart;
      case 'risk':
        return AlertTriangle;
      default:
        return Lightbulb;
    }
  };

  const getImpactColor = (impact: AIInsight['impact']) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
    }
  };

  const filteredInsights = selectedCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.type === selectedCategory);

  const categories = [
    { value: 'all', label: 'All Insights' },
    { value: 'spending', label: 'Spending' },
    { value: 'saving', label: 'Savings' },
    { value: 'investment', label: 'Investment' },
    { value: 'goal', label: 'Goals' },
    { value: 'budget', label: 'Budget' },
    { value: 'risk', label: 'Risk' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">AI Financial Insights</h1>
        </div>
        <p className="text-gray-600">
          Personalized recommendations powered by artificial intelligence
        </p>
      </div>

      {/* AI Status */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">AI Analysis Status</p>
              <p className="text-xs text-gray-600">
                {isLoading ? 'Analyzing your financial data...' : `Generated ${insights.length} insights`}
              </p>
            </div>
          </div>
          <Button
            onClick={generateAIInsights}
            disabled={isLoading}
            size="sm"
          >
            {isLoading ? 'Analyzing...' : 'Refresh Analysis'}
          </Button>
        </div>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <div className="animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Insights List */}
      {!isLoading && (
        <div className="space-y-4">
          {filteredInsights.map((insight, index) => {
            const IconComponent = getInsightIcon(insight.type);
            
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {insight.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                            {insight.impact} impact
                          </span>
                          <span className="text-xs text-gray-500">
                            {insight.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">
                        {insight.description}
                      </p>
                      
                      {insight.recommendation && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-blue-900">Recommendation</p>
                              <p className="text-sm text-blue-700">{insight.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {insight.potentialSaving && (
                        <div className="flex items-center gap-2 text-green-600 mb-3">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            Potential annual saving: {formatCurrency(insight.potentialSaving, selectedCurrency)}
                          </span>
                        </div>
                      )}
                      
                      {insight.actionable && (
                        <div className="flex gap-2">
                          <Button size="sm">
                            Take Action
                          </Button>
                          <Button variant="outline" size="sm">
                            Learn More
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
          
          {filteredInsights.length === 0 && !isLoading && (
            <Card className="p-8 text-center">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Insights Available</h3>
              <p className="text-gray-600">
                {selectedCategory === 'all' 
                  ? 'AI analysis found no actionable insights at this time.'
                  : `No insights available for ${selectedCategory} category.`
                }
              </p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
