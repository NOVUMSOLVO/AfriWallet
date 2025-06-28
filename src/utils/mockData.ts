import { UserData, Transaction, Chama, Investment, NotificationItem } from '../types';

export const mockUserData: UserData = {
  id: '1',
  name: 'John Mukamuri',
  email: 'john.mukamuri@email.com',
  phone: '+263 77 123 4567',
  balance: {
    USD: 1250.50,
    GBP: 985.75,
    EUR: 1100.25,
    ZWL: 850000.00,
    ZAR: 2100.25,
    KES: 15000.00,
    NGN: 45000.00,
    GHS: 7500.00,
    UGX: 4650000.00,
    TZS: 2890000.00,
    ETB: 68500.00,
    RWF: 1375000.00,
    XOF: 750000.00,
    MAD: 12500.00,
    EGP: 38750.00,
    BWP: 16875.00
  },
  chamaBalance: 450.00,
  investments: 2100.50,
  pendingRemittances: 3,
  kycStatus: 'verified'
};

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    amount: 50,
    currency: 'USD',
    description: 'EcoCash Deposit',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'completed',
    category: 'deposit'
  },
  {
    id: '2',
    type: 'chama',
    amount: 25,
    currency: 'USD',
    description: 'Harare Investment Group',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: 'completed',
    category: 'savings'
  },
  {
    id: '3',
    type: 'send',
    amount: 100,
    currency: 'USD',
    description: 'Money transfer to Sarah',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: 'completed',
    recipient: 'Sarah Mukamuri',
    category: 'transfer'
  },
  {
    id: '4',
    type: 'investment',
    amount: 200,
    currency: 'USD',
    description: 'Treasury Bills Investment',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'completed',
    category: 'investment'
  }
];

export const mockChamas: Chama[] = [
  {
    id: '1',
    name: 'Harare Investment Group',
    description: 'Weekly investment savings group for young professionals',
    memberCount: 12,
    contributionFrequency: 'weekly',
    myContribution: 450,
    totalPool: 5400,
    status: 'active',
    nextContributionDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    members: [
      { id: '1', name: 'John Mukamuri', contribution: 450 },
      { id: '2', name: 'Sarah Chikwanha', contribution: 450 },
      { id: '3', name: 'Mike Tendai', contribution: 450 }
    ]
  },
  {
    id: '2',
    name: 'Family Savings Circle',
    description: 'Monthly family savings for emergency fund',
    memberCount: 8,
    contributionFrequency: 'monthly',
    myContribution: 180,
    totalPool: 1440,
    status: 'active',
    nextContributionDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    members: [
      { id: '1', name: 'John Mukamuri', contribution: 180 },
      { id: '4', name: 'Grace Mukamuri', contribution: 180 },
      { id: '5', name: 'Peter Mukamuri', contribution: 180 }
    ]
  }
];

export const mockInvestments: Investment[] = [
  {
    id: '1',
    name: 'Treasury Bills',
    type: 'treasury_bills',
    amount: 800,
    currentValue: 868,
    returnPercentage: 8.5,
    riskLevel: 'low',
    duration: '91 days',
    status: 'active'
  },
  {
    id: '2',
    name: 'Diversified Stock Portfolio',
    type: 'stocks',
    amount: 1300,
    currentValue: 1497,
    returnPercentage: 15.2,
    riskLevel: 'medium',
    duration: '1 year',
    status: 'active'
  },
  {
    id: '3',
    name: 'Corporate Bonds',
    type: 'bonds',
    amount: 500,
    currentValue: 535,
    returnPercentage: 7.0,
    riskLevel: 'low',
    duration: '2 years',
    status: 'active'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Chama Contribution Due',
    message: 'Your weekly contribution to Harare Investment Group is due in 2 days',
    type: 'warning',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false
  },
  {
    id: '2',
    title: 'Investment Matured',
    message: 'Your Treasury Bills investment has matured. Funds available for withdrawal.',
    type: 'success',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false
  },
  {
    id: '3',
    title: 'Exchange Rate Alert',
    message: 'USD/ZWL rate has increased by 5%. Good time to exchange!',
    type: 'info',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: true
  }
];

export const mockPaymentMethods = [
  {
    id: '1',
    type: 'mobile_money' as const,
    name: 'EcoCash',
    details: '**** **** 4567',
    isDefault: true,
    isVerified: true,
    lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    type: 'mobile_money' as const,
    name: 'Mukuru',
    details: '**** **** 8901',
    isDefault: false,
    isVerified: true,
    lastUsed: new Date(Date.now() - 6 * 60 * 60 * 1000)
  },
  {
    id: '3',
    type: 'mobile_money' as const,
    name: 'NetOne Money',
    details: '**** **** 2345',
    isDefault: false,
    isVerified: true,
    lastUsed: new Date(Date.now() - 12 * 60 * 60 * 1000)
  },
  {
    id: '4',
    type: 'mobile_money' as const,
    name: 'PayNow',
    details: '**** **** 6789',
    isDefault: false,
    isVerified: true,
    lastUsed: new Date(Date.now() - 18 * 60 * 60 * 1000)
  },
  {
    id: '5',
    type: 'mobile_money' as const,
    name: 'Telecel Cash',
    details: '**** **** 3456',
    isDefault: false,
    isVerified: true,
    lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    id: '6',
    type: 'mobile_money' as const,
    name: 'M-Pesa',
    details: '**** **** 7890',
    isDefault: false,
    isVerified: true,
    lastUsed: new Date(Date.now() - 36 * 60 * 60 * 1000)
  },
  {
    id: '7',
    type: 'mobile_money' as const,
    name: 'MTN Mobile Money',
    details: '**** **** 1234',
    isDefault: false,
    isVerified: true,
    lastUsed: new Date(Date.now() - 48 * 60 * 60 * 1000)
  },
  {
    id: '8',
    type: 'card' as const,
    name: 'Visa Debit',
    details: '**** **** **** 5678',
    isDefault: false,
    isVerified: true,
    lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    id: '9',
    type: 'card' as const,
    name: 'Mastercard Credit',
    details: '**** **** **** 9012',
    isDefault: false,
    isVerified: true,
    lastUsed: new Date(Date.now() - 72 * 60 * 60 * 1000)
  },
  {
    id: '10',
    type: 'bank' as const,
    name: 'CBZ Bank',
    details: 'Account ending in 3456',
    isDefault: false,
    isVerified: true,
    lastUsed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: '11',
    type: 'bank' as const,
    name: 'Steward Bank',
    details: 'Account ending in 7890',
    isDefault: false,
    isVerified: true,
    lastUsed: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  },
  {
    id: '12',
    type: 'bank' as const,
    name: 'Standard Chartered',
    details: 'Account ending in 4567',
    isDefault: false,
    isVerified: true,
    lastUsed: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
  },
  {
    id: '13',
    type: 'bank' as const,
    name: 'FBC Bank',
    details: 'Account ending in 8901',
    isDefault: false,
    isVerified: true,
    lastUsed: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
  },
  {
    id: '14',
    type: 'crypto' as const,
    name: 'Bitcoin Wallet',
    details: '1A1z...Nx7B',
    isDefault: false,
    isVerified: true,
    lastUsed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: '15',
    type: 'crypto' as const,
    name: 'Ethereum Wallet',
    details: '0x742d...35Cc',
    isDefault: false,
    isVerified: false,
    lastUsed: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  }
];

export const mockBudgetCategories = [
  {
    id: '1',
    name: 'Food & Dining',
    allocated: 300,
    spent: 245,
    color: '#10B981',
    icon: 'utensils'
  },
  {
    id: '2',
    name: 'Transportation',
    allocated: 150,
    spent: 120,
    color: '#3B82F6',
    icon: 'car'
  },
  {
    id: '3',
    name: 'Entertainment',
    allocated: 100,
    spent: 85,
    color: '#8B5CF6',
    icon: 'music'
  },
  {
    id: '4',
    name: 'Shopping',
    allocated: 200,
    spent: 180,
    color: '#F59E0B',
    icon: 'shopping-bag'
  }
];

export const mockGoals = [
  {
    id: '1',
    title: 'Emergency Fund',
    description: '6 months of expenses for financial security',
    targetAmount: 5000,
    currentAmount: 2750,
    targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
    category: 'emergency' as const,
    isActive: true
  },
  {
    id: '2',
    title: 'Vacation to Cape Town',
    description: 'Family vacation to South Africa',
    targetAmount: 2500,
    currentAmount: 1200,
    targetDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
    category: 'vacation' as const,
    isActive: true
  },
  {
    id: '3',
    title: 'Business Investment',
    description: 'Capital for expanding my business',
    targetAmount: 10000,
    currentAmount: 3500,
    targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    category: 'business' as const,
    isActive: true
  }
];