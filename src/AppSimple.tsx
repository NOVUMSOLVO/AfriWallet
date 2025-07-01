import { useState } from 'react';
import { Dashboard } from './components/dashboard/Dashboard';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { LanguageProvider } from './components/language/LanguageProvider';
import { mockUserData, mockTransactions, mockNotifications } from './utils/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [showBalance, setShowBalance] = useState(true);

  console.log('App component rendered successfully');

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
  };

  const handleNotificationClick = (notification: unknown) => {
    console.log('Notification clicked:', notification);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Header
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          notifications={mockNotifications}
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
              {activeTab === 'dashboard' ? (
                <Dashboard
                  userData={mockUserData}
                  selectedCurrency={selectedCurrency}
                  setSelectedCurrency={setSelectedCurrency}
                  showBalance={showBalance}
                  setShowBalance={setShowBalance}
                  isOnline={true}
                  pendingTransactions={[]}
                  transactions={mockTransactions}
                  onQuickAction={handleQuickAction}
                />
              ) : (
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold">Feature Coming Soon</h1>
                  <p className="text-gray-600 mt-2">This feature is under development.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
