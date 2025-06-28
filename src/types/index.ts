export interface Currency {
  code: string;
  symbol: string;
  flag: string;
  rate: number;
  name: string;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'exchange' | 'chama' | 'investment' | 'deposit' | 'withdrawal';
  amount: number;
  currency: string;
  description: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  recipient?: string;
  category?: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  balance: Record<string, number>;
  chamaBalance: number;
  investments: number;
  pendingRemittances: number;
  kycStatus: 'pending' | 'verified' | 'rejected';
}

export interface Chama {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  contributionFrequency: 'weekly' | 'monthly' | 'quarterly';
  myContribution: number;
  totalPool: number;
  status: 'active' | 'inactive' | 'completed';
  nextContributionDate: Date;
  members: Array<{
    id: string;
    name: string;
    avatar?: string;
    contribution: number;
  }>;
}

export interface Investment {
  id: string;
  name: string;
  type: 'treasury_bills' | 'stocks' | 'bonds' | 'mutual_funds' | 'crypto';
  amount: number;
  currentValue: number;
  returnPercentage: number;
  riskLevel: 'low' | 'medium' | 'high';
  duration: string;
  status: 'active' | 'matured' | 'pending';
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: Date;
  trend: 'up' | 'down' | 'stable';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export interface BiometricData {
  enabled: boolean;
  type: 'fingerprint' | 'face' | 'voice' | null;
  lastUsed?: Date;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  biometric: BiometricData;
  loginAttempts: number;
  lastLogin: Date;
  trustedDevices: string[];
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'mobile_money' | 'crypto';
  name: string;
  details: string;
  isDefault: boolean;
  isVerified: boolean;
  lastUsed?: Date;
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
  icon: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  category: 'emergency' | 'vacation' | 'education' | 'business' | 'other';
  isActive: boolean;
}