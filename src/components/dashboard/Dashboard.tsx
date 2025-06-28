import React from 'react';
import { motion } from 'framer-motion';
import { WifiOff, RefreshCw, AlertTriangle } from 'lucide-react';
import { BalanceCard } from './BalanceCard';
import { QuickActions } from './QuickActions';
import { TransactionList } from './TransactionList';
import { FinancialInsights } from './FinancialInsights';
import { GoalsWidget } from './GoalsWidget';
import { SpendingChart } from './SpendingChart';
import { Card } from '../ui/Card';
import { UserData, Transaction } from '../../types';
import { mockBudgetCategories, mockGoals } from '../../utils/mockData';

interface DashboardProps {
  userData: UserData;
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  showBalance: boolean;
  setShowBalance: (show: boolean) => void;
  isOnline: boolean;
  pendingTransactions: any[];
  transactions: Transaction[];
  onQuickAction: (action: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  userData,
  selectedCurrency,
  setSelectedCurrency,
  showBalance,
  setShowBalance,
  isOnline,
  pendingTransactions,
  transactions,
  onQuickAction
}) => {
  const [timeframe, setTimeframe] = React.useState<'week' | 'month' | 'year'>('month');
  
  const handleCreateGoal = () => {
    console.log('Create new goal');
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Offline Status Banner */}
      {!isOnline && (
        <motion.div
          className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <WifiOff size={20} className="text-yellow-600 mr-3 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-yellow-800">You're currently offline</p>
            <p className="text-xs text-yellow-600 mt-1">
              Transactions will sync automatically when connection is restored
            </p>
          </div>
        </motion.div>
      )}

      {/* Balance Card */}
      <BalanceCard
        userData={userData}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        showBalance={showBalance}
        setShowBalance={setShowBalance}
        isOnline={isOnline}
      />

      {/* Quick Actions */}
      <QuickActions onActionClick={onQuickAction} />

      {/* Financial Insights and Goals Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinancialInsights
          selectedCurrency={selectedCurrency}
          budgetCategories={mockBudgetCategories}
          goals={mockGoals}
          monthlySpending={1850}
          monthlyIncome={3200}
        />
        <GoalsWidget
          goals={mockGoals}
          selectedCurrency={selectedCurrency}
          onCreateGoal={handleCreateGoal}
        />
      </div>

      {/* Spending Chart */}
      <SpendingChart
        selectedCurrency={selectedCurrency}
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
      />

      {/* Pending Sync Alert */}
      {pendingTransactions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-4 border-orange-200 bg-orange-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle size={20} className="text-orange-600 mr-3" />
                <div>
                  <h4 className="font-medium text-orange-800">Pending Sync</h4>
                  <p className="text-sm text-orange-600">
                    {pendingTransactions.length} transaction(s) waiting to sync
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw size={20} className="text-orange-600" />
              </motion.div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Recent Transactions */}
      <TransactionList 
        transactions={transactions} 
        selectedCurrency={selectedCurrency}
      />

      {/* KYC Status */}
      {userData.kycStatus !== 'verified' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-blue-800">Complete Your Verification</h4>
                <p className="text-sm text-blue-600 mt-1">
                  Verify your identity to unlock higher transaction limits
                </p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Verify Now
              </button>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};