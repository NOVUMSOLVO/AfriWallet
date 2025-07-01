import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { WalletPage } from './components/wallet/WalletPage';
import { SecurityPage } from './components/security/SecurityPage';
import { ChamaPage } from './components/chama/ChamaPage';
import { ExchangePage } from './components/exchange/ExchangePage';
import { InvestmentPage } from './components/investment/InvestmentPage';
import { RemittancePage } from './components/remittance/RemittancePage';
import { GoalsPage } from './components/goals/GoalsPage';
import { BudgetPage } from './components/budget/BudgetPage';
// New optional enhancement imports
import { AnalyticsPage } from './components/analytics/AnalyticsPage';
import { OfflinePage } from './components/offline/OfflinePage';
import { MarketplacePage } from './components/marketplace/MarketplacePage';
import { InsurancePage } from './components/insurance/InsurancePage';
import { CreditPage } from './components/credit/CreditPage';
// Advanced feature imports
import { FinancialAdvisorPage } from './components/advisor/FinancialAdvisorPage';
import { AdvancedSecurityPage } from './components/security/AdvancedSecurityPage';
import { AdvancedReportsPage } from './components/reports/AdvancedReportsPage';
import { TradingPlatformPage } from './components/trading/TradingPlatformPage';
import { QRPaymentPage } from './components/qr/QRPaymentPage';
import { AIInsightsPage } from './components/ai/AIInsightsPage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { LanguageProvider } from './components/language/LanguageProvider';
import { NotificationProvider } from './contexts/NotificationContext';
import { 
  mockUserData, 
  mockTransactions, 
  mockNotifications 
} from './utils/mockData';
import { UserData, Transaction, NotificationItem } from './types';

function App() {
  console.log('App component starting...');
  
  const [activeTab, setActiveTab] = useLocalStorage('activeTab', 'dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useLocalStorage('selectedCurrency', 'USD');
  const [showBalance, setShowBalance] = useLocalStorage('showBalance', true);
  const [pendingTransactions, setPendingTransactions] = useLocalStorage<Transaction[]>('pendingTransactions', []);
  const [userData] = useLocalStorage<UserData>('userData', mockUserData);
  const [transactions] = useLocalStorage<Transaction[]>('transactions', mockTransactions);
  const [notifications, setNotifications] = useLocalStorage<NotificationItem[]>('notifications', mockNotifications);
  
  console.log('App state initialized', { activeTab, selectedCurrency });
  
  const { isOnline } = useNetworkStatus();

  // Sync pending transactions when online
  useEffect(() => {
    if (isOnline && pendingTransactions.length > 0) {
      const syncTimer = setTimeout(() => {
        setPendingTransactions([]);
        // Here you would typically sync with your backend
        console.log('Syncing pending transactions...');
      }, 2000);

      return () => clearTimeout(syncTimer);
    }
  }, [isOnline, pendingTransactions, setPendingTransactions]);

  // Close mobile menu when tab changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activeTab]);

  const addPendingTransaction = useCallback((transaction: Partial<Transaction>) => {
    setPendingTransactions((prev: Transaction[]) => [...prev, { ...transaction, id: Date.now().toString() } as Transaction]);
  }, [setPendingTransactions]);

  const handleQuickAction = useCallback((action: string) => {
    switch (action) {
      case 'remit':
        setActiveTab('remit');
        break;
      case 'exchange':
        setActiveTab('exchange');
        break;
      case 'invest':
        setActiveTab('invest');
        break;
      case 'add':
        setActiveTab('wallet');
        break;
      case 'mobile':
        setActiveTab('wallet');
        break;
      case 'bills':
        setActiveTab('wallet');
        break;
      default:
        break;
    }
  }, [setActiveTab]);

  const handleNotificationClick = useCallback((notification: NotificationItem) => {
    // Mark notification as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    
    // Handle notification action
    if (notification.actionUrl) {
      // Navigate to specific page
      console.log('Navigate to:', notification.actionUrl);
    }
  }, [setNotifications]);

  const renderContent = () => {
    const pageVariants = {
      initial: { opacity: 0, x: 20 },
      in: { opacity: 1, x: 0 },
      out: { opacity: 0, x: -20 }
    };

    const pageTransition = {
      type: 'tween',
      ease: 'anticipate',
      duration: 0.3
    };

    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div
            key="dashboard"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Dashboard
              userData={userData}
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
              showBalance={showBalance}
              setShowBalance={setShowBalance}
              isOnline={isOnline}
              pendingTransactions={pendingTransactions}
              transactions={transactions}
              onQuickAction={handleQuickAction}
            />
          </motion.div>
        );
      
      case 'wallet':
        return (
          <motion.div
            key="wallet"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <WalletPage
              selectedCurrency={selectedCurrency}
              userData={userData}
            />
          </motion.div>
        );
      
      case 'chama':
        return (
          <motion.div
            key="chama"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ChamaPage selectedCurrency={selectedCurrency} />
          </motion.div>
        );
      
      case 'exchange':
        return (
          <motion.div
            key="exchange"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ExchangePage 
              selectedCurrency={selectedCurrency}
              isOnline={isOnline}
              onAddPendingTransaction={addPendingTransaction}
            />
          </motion.div>
        );
      
      case 'invest':
        return (
          <motion.div
            key="invest"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <InvestmentPage selectedCurrency={selectedCurrency} />
          </motion.div>
        );
      
      case 'remit':
        return (
          <motion.div
            key="remit"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <RemittancePage 
              selectedCurrency={selectedCurrency}
              isOnline={isOnline}
              onAddPendingTransaction={addPendingTransaction}
            />
          </motion.div>
        );
      
      case 'settings':
        return (
          <motion.div
            key="settings"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <SecurityPage />
          </motion.div>
        );
      
      case 'goals':
        return (
          <motion.div
            key="goals"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <GoalsPage selectedCurrency={selectedCurrency} />
          </motion.div>
        );
      
      case 'budget':
        return (
          <motion.div
            key="budget"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <BudgetPage selectedCurrency={selectedCurrency} />
          </motion.div>
        );
      
      case 'qr':
        return (
          <motion.div
            key="qr"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <QRPaymentPage
              selectedCurrency={selectedCurrency}
              onPaymentComplete={(amount: number, currency: string) => {
                console.log(`Payment completed: ${amount} ${currency}`);
              }}
            />
          </motion.div>
        );
      
      case 'ai-insights':
        return (
          <motion.div
            key="ai-insights"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AIInsightsPage
              transactions={transactions}
              budgetCategories={[]}
              goals={[]}
              selectedCurrency={selectedCurrency}
            />
          </motion.div>
        );
      
      case 'analytics':
        return (
          <motion.div
            key="analytics"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AnalyticsPage
              selectedCurrency={selectedCurrency}
              transactions={transactions}
              userData={userData}
            />
          </motion.div>
        );
      
      case 'offline':
        return (
          <motion.div
            key="offline"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <OfflinePage
              isOnline={isOnline}
              pendingTransactions={pendingTransactions}
              onSyncData={() => {
                console.log('Syncing data...');
                setPendingTransactions([]);
              }}
            />
          </motion.div>
        );
      
      case 'marketplace':
        return (
          <motion.div
            key="marketplace"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <MarketplacePage selectedCurrency={selectedCurrency} />
          </motion.div>
        );
      
      case 'insurance':
        return (
          <motion.div
            key="insurance"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <InsurancePage selectedCurrency={selectedCurrency} />
          </motion.div>
        );
      
      case 'credit':
        return (
          <motion.div
            key="credit"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <CreditPage selectedCurrency={selectedCurrency} />
          </motion.div>
        );
      
      case 'advisor':
        return (
          <motion.div
            key="advisor"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <FinancialAdvisorPage 
              selectedCurrency={selectedCurrency}
              userData={userData}
              transactions={transactions}
            />
          </motion.div>
        );
      
      case 'security-advanced':
        return (
          <motion.div
            key="security-advanced"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AdvancedSecurityPage />
          </motion.div>
        );
      
      case 'reports':
        return (
          <motion.div
            key="reports"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AdvancedReportsPage 
              selectedCurrency={selectedCurrency}
              userData={userData}
              transactions={transactions}
            />
          </motion.div>
        );
      
      case 'trading':
        return (
          <motion.div
            key="trading"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <TradingPlatformPage 
              selectedCurrency={selectedCurrency}
              isOnline={isOnline}
              onAddPendingTransaction={addPendingTransaction}
            />
          </motion.div>
        );
      
      default:
        return (
          <motion.div
            key="dashboard"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Dashboard
              userData={userData}
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
              showBalance={showBalance}
              setShowBalance={setShowBalance}
              isOnline={isOnline}
              pendingTransactions={pendingTransactions}
              transactions={transactions}
              onQuickAction={handleQuickAction}
            />
          </motion.div>
        );
    }
  };

  console.log('App about to render, activeTab:', activeTab);

  return (
    <LanguageProvider>
      <NotificationProvider>
        <div className="min-h-screen bg-gray-50">
          <Header
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            notifications={notifications}
            onNotificationClick={handleNotificationClick}
          />

          <div className="flex">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />

            <main className="flex-1 lg:ml-0 w-full">
              <div className="max-w-7xl mx-auto p-4 lg:p-6">
                <AnimatePresence mode="wait">
                  {renderContent()}
                </AnimatePresence>
              </div>
            </main>
          </div>
        </div>
      </NotificationProvider>
    </LanguageProvider>
  );
}

export default App;