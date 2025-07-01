import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  LineChart, 
  Calendar, 
  Download, 
  Filter, 
  RefreshCw, 
  Eye, 
  Target, 
  DollarSign, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  MapPin,
  CreditCard,
  Smartphone,
  Globe,
  Activity,
  Zap,
  Award
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  ComposedChart
} from 'recharts';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { formatCurrency } from '../../utils/currency';

interface ReportsPageProps {
  selectedCurrency: string;
  userData?: any;
  transactions?: any[];
}

interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: any;
  color: string;
  description: string;
}

interface ReportSection {
  id: string;
  title: string;
  description: string;
  charts: any[];
  insights: string[];
}

export const AdvancedReportsPage: React.FC<ReportsPageProps> = ({ 
  selectedCurrency, 
  userData,
  transactions = [] 
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('last_30_days');
  const [selectedReport, setSelectedReport] = useState<'overview' | 'spending' | 'income' | 'investments' | 'comparative'>('overview');
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock data for demonstrations
  const monthlyData = [
    { month: 'Jan', income: 3200, expenses: 2100, savings: 1100, investments: 500 },
    { month: 'Feb', income: 3400, expenses: 2300, savings: 1100, investments: 600 },
    { month: 'Mar', income: 3100, expenses: 2200, savings: 900, investments: 550 },
    { month: 'Apr', income: 3600, expenses: 2400, savings: 1200, investments: 700 },
    { month: 'May', income: 3300, expenses: 2150, savings: 1150, investments: 650 },
    { month: 'Jun', income: 3500, expenses: 2250, savings: 1250, investments: 750 }
  ];

  const spendingByCategory = [
    { name: 'Food & Dining', value: 850, percentage: 35, color: '#ef4444' },
    { name: 'Transportation', value: 420, percentage: 17, color: '#f97316' },
    { name: 'Entertainment', value: 380, percentage: 16, color: '#eab308' },
    { name: 'Shopping', value: 290, percentage: 12, color: '#22c55e' },
    { name: 'Bills & Utilities', value: 250, percentage: 10, color: '#3b82f6' },
    { name: 'Healthcare', value: 150, percentage: 6, color: '#8b5cf6' },
    { name: 'Others', value: 110, percentage: 4, color: '#6b7280' }
  ];

  const incomeStreams = [
    { source: 'Primary Job', amount: 2800, percentage: 80 },
    { source: 'Freelancing', amount: 500, percentage: 14 },
    { source: 'Investments', amount: 150, percentage: 4 },
    { source: 'Others', amount: 50, percentage: 2 }
  ];

  const investmentPerformance = [
    { month: 'Jan', portfolio: 5000, returns: 250 },
    { month: 'Feb', portfolio: 5300, returns: 300 },
    { month: 'Mar', portfolio: 5100, returns: 100 },
    { month: 'Apr', portfolio: 5600, returns: 500 },
    { month: 'May', portfolio: 5800, returns: 200 },
    { month: 'Jun', portfolio: 6200, returns: 400 }
  ];

  const metrics: MetricCard[] = [
    {
      id: 'total_balance',
      title: 'Total Balance',
      value: formatCurrency(8540, selectedCurrency),
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-green-50 text-green-600',
      description: 'vs last month'
    },
    {
      id: 'monthly_income',
      title: 'Monthly Income',
      value: formatCurrency(3500, selectedCurrency),
      change: '+6.2%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-blue-50 text-blue-600',
      description: 'vs last month'
    },
    {
      id: 'monthly_expenses',
      title: 'Monthly Expenses',
      value: formatCurrency(2250, selectedCurrency),
      change: '-3.1%',
      changeType: 'positive',
      icon: TrendingDown,
      color: 'bg-orange-50 text-orange-600',
      description: 'vs last month'
    },
    {
      id: 'savings_rate',
      title: 'Savings Rate',
      value: '35.7%',
      change: '+2.4%',
      changeType: 'positive',
      icon: Target,
      color: 'bg-purple-50 text-purple-600',
      description: 'of income'
    },
    {
      id: 'investment_returns',
      title: 'Investment Returns',
      value: '+15.2%',
      change: '+3.8%',
      changeType: 'positive',
      icon: Award,
      color: 'bg-emerald-50 text-emerald-600',
      description: 'YTD performance'
    },
    {
      id: 'transactions',
      title: 'Transactions',
      value: '247',
      change: '+18',
      changeType: 'neutral',
      icon: Activity,
      color: 'bg-indigo-50 text-indigo-600',
      description: 'this month'
    }
  ];

  const generateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
    
    // Trigger download (mock)
    const element = document.createElement('a');
    element.href = 'data:text/plain;charset=utf-8,Financial Report Generated';
    element.download = `financial-report-${selectedPeriod}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${metric.color}`}>
                    <IconComponent size={24} />
                  </div>
                  <div className={`flex items-center text-sm ${
                    metric.changeType === 'positive' ? 'text-green-600' : 
                    metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.changeType === 'positive' && <ArrowUpRight size={16} className="mr-1" />}
                    {metric.changeType === 'negative' && <ArrowDownRight size={16} className="mr-1" />}
                    {metric.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                <p className="text-sm text-gray-600">{metric.title}</p>
                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                formatter={(value: any, name: string) => [
                  formatCurrency(value, selectedCurrency),
                  name.charAt(0).toUpperCase() + name.slice(1)
                ]}
              />
              <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} />
            </RechartsLineChart>
          </ResponsiveContainer>
        </Card>

        {/* Spending Categories */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={spendingByCategory}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {spendingByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => formatCurrency(value, selectedCurrency)} />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {spendingByCategory.map((category) => (
              <div key={category.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-xs text-gray-600 truncate">{category.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Savings Growth */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings & Investment Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                formatter={(value: any, name: string) => [
                  formatCurrency(value, selectedCurrency),
                  name.charAt(0).toUpperCase() + name.slice(1)
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="savings" 
                stackId="1"
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="investments" 
                stackId="1"
                stroke="#8b5cf6" 
                fill="#8b5cf6" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Financial Health Score */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Health Score</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={[
                { name: 'Score', value: 87, fill: '#10b981' }
              ]}>
                <RadialBar dataKey="value" cornerRadius={10} fill="#10b981" />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-gray-900">
                  87
                </text>
                <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className="text-sm fill-gray-600">
                  Excellent
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Emergency Fund</span>
              <span className="text-sm font-medium text-green-600">95%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Debt Ratio</span>
              <span className="text-sm font-medium text-green-600">12%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Savings Rate</span>
              <span className="text-sm font-medium text-green-600">36%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderSpendingAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Trends</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  formatter={(value: any, name: string) => [
                    formatCurrency(value, selectedCurrency),
                    name.charAt(0).toUpperCase() + name.slice(1)
                  ]}
                />
                <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Top Spending Categories</h4>
            <div className="space-y-3">
              {spendingByCategory.slice(0, 5).map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(category.value, selectedCurrency)}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Spending Insights</h4>
            <div className="space-y-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-800 font-medium">⚠️ High Food Spending</p>
                <p className="text-xs text-orange-600 mt-1">35% above recommended budget</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 font-medium">✅ Entertainment on Track</p>
                <p className="text-xs text-green-600 mt-1">Within healthy spending range</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">💡 Opportunity</p>
                <p className="text-xs text-blue-600 mt-1">Reduce dining out by 20% to save $170/month</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderIncomeAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Income Streams</h3>
          <div className="space-y-4">
            {incomeStreams.map((stream, index) => (
              <div key={stream.source} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{stream.source}</span>
                  <span className="text-sm text-gray-600">{stream.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${stream.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(stream.amount, selectedCurrency)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Income Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                formatter={(value: any) => formatCurrency(value, selectedCurrency)}
              />
              <Area 
                type="monotone" 
                dataKey="income" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );

  const renderInvestmentAnalysis = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Performance</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={investmentPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              formatter={(value: any, name: string) => [
                formatCurrency(value, selectedCurrency),
                name === 'portfolio' ? 'Portfolio Value' : 'Monthly Returns'
              ]}
            />
            <Bar dataKey="returns" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="portfolio" stroke="#10b981" strokeWidth={3} />
          </ComposedChart>
        </ResponsiveContainer>
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
          <BarChart3 size={24} className="text-blue-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Advanced Reports</h1>
            <p className="text-gray-600">Comprehensive financial analytics and insights</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Select
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
            options={[
              { value: 'last_7_days', label: 'Last 7 Days' },
              { value: 'last_30_days', label: 'Last 30 Days' },
              { value: 'last_3_months', label: 'Last 3 Months' },
              { value: 'last_6_months', label: 'Last 6 Months' },
              { value: 'last_year', label: 'Last Year' }
            ]}
          />
          <Button
            onClick={generateReport}
            disabled={isGenerating}
            className="flex items-center"
          >
            {isGenerating ? (
              <RefreshCw size={16} className="mr-2 animate-spin" />
            ) : (
              <Download size={16} className="mr-2" />
            )}
            {isGenerating ? 'Generating...' : 'Export Report'}
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: Eye },
          { id: 'spending', label: 'Spending', icon: TrendingDown },
          { id: 'income', label: 'Income', icon: TrendingUp },
          { id: 'investments', label: 'Investments', icon: PieChart }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedReport(tab.id as any)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedReport === tab.id
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

      {/* Report Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedReport}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {selectedReport === 'overview' && renderOverview()}
          {selectedReport === 'spending' && renderSpendingAnalysis()}
          {selectedReport === 'income' && renderIncomeAnalysis()}
          {selectedReport === 'investments' && renderInvestmentAnalysis()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
