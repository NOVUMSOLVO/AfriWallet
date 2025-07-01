import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  MessageCircle, 
  Send, 
  TrendingUp, 
  PieChart, 
  Target, 
  AlertTriangle, 
  Lightbulb,
  BookOpen,
  Calculator,
  Shield,
  Smartphone,
  Clock,
  CheckCircle,
  Star,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { formatCurrency } from '../../utils/currency';

interface FinancialAdvisorPageProps {
  selectedCurrency: string;
  userData?: any;
  transactions?: any[];
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: 'general' | 'investment' | 'saving' | 'budgeting' | 'goals';
  confidence?: number;
  sources?: string[];
}

interface FinancialInsight {
  id: string;
  title: string;
  description: string;
  category: 'spending' | 'saving' | 'investment' | 'debt' | 'goal';
  priority: 'high' | 'medium' | 'low';
  action: string;
  impact: string;
  timeframe: string;
  icon: any;
}

export const FinancialAdvisorPage: React.FC<FinancialAdvisorPageProps> = ({ 
  selectedCurrency, 
  userData,
  transactions = [] 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'chat' | 'insights' | 'planning' | 'education'>('chat');

  // Mock AI insights based on user data
  const insights: FinancialInsight[] = [
    {
      id: '1',
      title: 'Optimize Your Spending',
      description: 'You\'re spending 15% more on dining out compared to last month. Consider meal planning to save money.',
      category: 'spending',
      priority: 'medium',
      action: 'Set a dining budget of $200/month',
      impact: 'Save $150-200 monthly',
      timeframe: '1 month',
      icon: PieChart
    },
    {
      id: '2',
      title: 'Emergency Fund Goal',
      description: 'Your emergency fund covers only 2 months of expenses. Aim for 6 months for better financial security.',
      category: 'saving',
      priority: 'high',
      action: 'Increase emergency savings by $300/month',
      impact: 'Full emergency fund in 12 months',
      timeframe: '12 months',
      icon: Shield
    },
    {
      id: '3',
      title: 'Investment Opportunity',
      description: 'You have $500 idle in checking. Consider investing in a diversified portfolio for better returns.',
      category: 'investment',
      priority: 'medium',
      action: 'Move $300 to investment account',
      impact: '7-10% annual returns vs 0.1% savings',
      timeframe: '1 week',
      icon: TrendingUp
    }
  ];

  const quickQuestions = [
    "How can I save more money?",
    "What investments should I consider?",
    "How to create a budget?",
    "Should I pay off debt or invest?",
    "Help me set financial goals"
  ];

  const educationalTopics = [
    {
      title: "Personal Finance Basics",
      description: "Learn fundamental concepts of managing your money",
      icon: BookOpen,
      topics: ["Budgeting 101", "Emergency Funds", "Debt Management", "Credit Scores"]
    },
    {
      title: "Investment Guide",
      description: "Understanding different investment options and strategies",
      icon: TrendingUp,
      topics: ["Stocks vs Bonds", "Risk vs Return", "Diversification", "Long-term Investing"]
    },
    {
      title: "African Financial Markets",
      description: "Navigate financial opportunities across Africa",
      icon: Target,
      topics: ["Local Investment Options", "Currency Exchange", "Mobile Money", "Microfinance"]
    }
  ];

  useEffect(() => {
    // Welcome message
    const welcomeMessage: ChatMessage = {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Financial Advisor. I've analyzed your spending patterns and I'm here to help you achieve your financial goals. What would you like to discuss today?",
      timestamp: new Date(),
      category: 'general',
      confidence: 1.0
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (userInput: string): ChatMessage => {
    const lowerInput = userInput.toLowerCase();
    let response = '';
    let category: ChatMessage['category'] = 'general';

    if (lowerInput.includes('save') || lowerInput.includes('saving')) {
      category = 'saving';
      response = `Based on your spending patterns, I recommend the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings. You could save an additional ${formatCurrency(200, selectedCurrency)} monthly by optimizing your discretionary spending. Would you like me to create a personalized savings plan?`;
    } else if (lowerInput.includes('invest') || lowerInput.includes('investment')) {
      category = 'investment';
      response = `Given your current financial situation, I'd recommend starting with low-risk investments like treasury bills or index funds. You have ${formatCurrency(500, selectedCurrency)} that could be invested. A diversified portfolio could potentially earn 7-12% annually. Shall we explore investment options suitable for your risk profile?`;
    } else if (lowerInput.includes('budget')) {
      category = 'budgeting';
      response = `Let's create a budget that works for you! I notice you spend about ${formatCurrency(1850, selectedCurrency)} monthly. I can help you categorize expenses and identify areas for optimization. Would you like me to suggest a budget breakdown based on your income and goals?`;
    } else if (lowerInput.includes('goal') || lowerInput.includes('goals')) {
      category = 'goals';
      response = `Financial goals are crucial for success! I see you have some goals set up. For better results, I recommend SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound). What's your most important financial goal right now? I can help you create an action plan.`;
    } else {
      response = `I understand you're looking for financial guidance. I can help with budgeting, saving strategies, investment advice, debt management, and goal planning. What specific area would you like to focus on? Feel free to ask anything about your finances!`;
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
      category,
      confidence: 0.9,
      sources: ['Personal Analysis', 'Financial Best Practices', 'Market Data']
    };
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    handleSendMessage();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const renderChat = () => (
    <div className="space-y-6">
      {/* Chat Messages */}
      <Card className="h-96 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {message.type === 'ai' && (
                  <div className="flex items-center mb-2">
                    <Brain size={16} className="text-blue-600 mr-2" />
                    <span className="text-xs font-medium text-blue-600">AI Advisor</span>
                    {message.confidence && (
                      <span className="text-xs text-gray-500 ml-2">
                        {Math.round(message.confidence * 100)}% confident
                      </span>
                    )}
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                  {message.type === 'ai' && (
                    <div className="flex space-x-1">
                      <button className="p-1 rounded hover:bg-gray-200">
                        <ThumbsUp size={12} />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-200">
                        <ThumbsDown size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 px-4 py-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </motion.div>
        )}
      </Card>

      {/* Quick Questions */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Quick Questions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {quickQuestions.map((question, index) => (
            <motion.button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {question}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="flex space-x-3">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask me anything about your finances..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
          <Send size={16} />
        </Button>
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight, index) => {
          const IconComponent = insight.icon;
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-6 border-l-4 ${getPriorityColor(insight.priority)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <IconComponent size={20} className="mr-3" />
                    <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(insight.priority)}`}>
                    {insight.priority}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{insight.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Target size={14} className="text-blue-600 mr-2" />
                    <span className="text-sm font-medium">Action:</span>
                    <span className="text-sm text-gray-600 ml-2">{insight.action}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <TrendingUp size={14} className="text-green-600 mr-2" />
                    <span className="text-sm font-medium">Impact:</span>
                    <span className="text-sm text-gray-600 ml-2">{insight.impact}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock size={14} className="text-orange-600 mr-2" />
                    <span className="text-sm font-medium">Timeline:</span>
                    <span className="text-sm text-gray-600 ml-2">{insight.timeframe}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    Learn More
                  </Button>
                  <Button size="sm" className="flex-1">
                    Take Action
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderPlanning = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Financial Planning</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Smart Budget Allocation</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Essential Expenses (50%)</span>
                <span className="text-sm font-medium">{formatCurrency(1600, selectedCurrency)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '50%' }} />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Investment Strategy</h4>
            <div className="text-sm text-gray-600">
              Based on your risk profile and goals, I recommend:
              <ul className="mt-2 space-y-1">
                <li>• 60% Low-risk (Treasury bills, bonds)</li>
                <li>• 30% Medium-risk (Index funds)</li>
                <li>• 10% High-risk (Individual stocks)</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {educationalTopics.map((topic, index) => {
          const IconComponent = topic.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center mb-4">
                  <IconComponent size={24} className="text-blue-600 mr-3" />
                  <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{topic.description}</p>
                <div className="space-y-2">
                  {topic.topics.map((subtopic, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle size={14} className="text-green-600 mr-2" />
                      <span className="text-sm text-gray-700">{subtopic}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Start Learning
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </div>
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
          <Brain size={24} className="text-purple-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Financial Advisor</h1>
            <p className="text-gray-600">Personalized financial guidance powered by AI</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
            <span className="text-sm font-medium">AI Online</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'chat', label: 'Chat', icon: MessageCircle },
          { id: 'insights', label: 'Insights', icon: Lightbulb },
          { id: 'planning', label: 'Planning', icon: Calculator },
          { id: 'education', label: 'Education', icon: BookOpen }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === tab.id
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
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {selectedCategory === 'chat' && renderChat()}
          {selectedCategory === 'insights' && renderInsights()}
          {selectedCategory === 'planning' && renderPlanning()}
          {selectedCategory === 'education' && renderEducation()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
