import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Store, 
  Zap, 
  Car, 
  Smartphone, 
  Tv, 
  Wifi,
  Search,
  ShoppingCart,
  CreditCard,
  Check,
  Star,
  MapPin,
  Clock,
  Filter
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { formatCurrency } from '../../utils/currency';

interface MarketplacePageProps {
  selectedCurrency: string;
}

interface Service {
  id: string;
  name: string;
  category: string;
  provider: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  rating: number;
  reviews: number;
  price?: number;
  processingTime: string;
  available: boolean;
  popular?: boolean;
}

interface Transaction {
  id: string;
  service: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: Date;
  reference: string;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  selectedCurrency
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const categories = [
    { id: 'all', name: 'All Services', icon: Store },
    { id: 'utilities', name: 'Utilities', icon: Zap },
    { id: 'transport', name: 'Transport', icon: Car },
    { id: 'telecom', name: 'Telecom', icon: Smartphone },
    { id: 'entertainment', name: 'Entertainment', icon: Tv },
    { id: 'internet', name: 'Internet', icon: Wifi }
  ];

  const services: Service[] = [
    {
      id: '1',
      name: 'ZESA Prepaid',
      category: 'utilities',
      provider: 'ZESA Holdings',
      icon: Zap,
      description: 'Buy electricity tokens instantly',
      rating: 4.8,
      reviews: 1234,
      processingTime: 'Instant',
      available: true,
      popular: true
    },
    {
      id: '2',
      name: 'Econet Airtime',
      category: 'telecom',
      provider: 'Econet Wireless',
      icon: Smartphone,
      description: 'Top up your Econet line',
      rating: 4.7,
      reviews: 2156,
      processingTime: 'Instant',
      available: true,
      popular: true
    },
    {
      id: '3',
      name: 'Netflix Subscription',
      category: 'entertainment',
      provider: 'Netflix',
      icon: Tv,
      description: 'Monthly Netflix subscription',
      rating: 4.9,
      reviews: 890,
      price: 12.99,
      processingTime: '1-2 minutes',
      available: true
    },
    {
      id: '4',
      name: 'City of Harare Water',
      category: 'utilities',
      provider: 'City of Harare',
      icon: Zap,
      description: 'Pay water bills online',
      rating: 4.2,
      reviews: 567,
      processingTime: '2-4 hours',
      available: true
    },
    {
      id: '5',
      name: 'DSTV Payment',
      category: 'entertainment',
      provider: 'MultiChoice',
      icon: Tv,
      description: 'Pay DSTV subscription',
      rating: 4.6,
      reviews: 1890,
      processingTime: 'Instant',
      available: true
    },
    {
      id: '6',
      name: 'TelOne Internet',
      category: 'internet',
      provider: 'TelOne',
      icon: Wifi,
      description: 'Pay internet bills',
      rating: 4.1,
      reviews: 432,
      processingTime: '1-2 hours',
      available: false
    }
  ];

  const recentTransactions: Transaction[] = [
    {
      id: '1',
      service: 'ZESA Prepaid',
      amount: 50,
      status: 'completed',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      reference: 'ZES123456789'
    },
    {
      id: '2',
      service: 'Econet Airtime',
      amount: 15,
      status: 'completed',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      reference: 'ECO987654321'
    },
    {
      id: '3',
      service: 'Netflix Subscription',
      amount: 12.99,
      status: 'pending',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      reference: 'NET555666777'
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setShowPayment(true);
  };

  const handlePayment = () => {
    setShowPayment(false);
    setSelectedService(null);
    // Add transaction logic here
    alert('Payment processing...');
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-orange-600 bg-orange-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
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
          <Store size={24} className="text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Bills & Services</h1>
        </div>
        <Button variant="outline" className="flex items-center">
          <ShoppingCart size={16} className="mr-2" />
          Cart (0)
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
          />
        </div>
        <Button variant="outline" className="flex items-center">
          <Filter size={16} className="mr-2" />
          Filters
        </Button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon size={16} className="mr-2" />
              {category.name}
            </motion.button>
          );
        })}
      </div>

      {/* Popular Services */}
      {activeCategory === 'all' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.filter(s => s.popular).map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleServiceSelect(service)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Icon size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{service.name}</h4>
                      <p className="text-sm text-gray-500">{service.provider}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">{service.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">{service.processingTime}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-6 hover:shadow-md transition-shadow cursor-pointer ${
                !service.available ? 'opacity-60' : ''
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Icon size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.provider}</p>
                    </div>
                  </div>
                  {service.popular && (
                    <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-medium">
                      Popular
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star size={14} className="text-yellow-500 mr-1" />
                    <span className="text-sm text-gray-600 mr-2">{service.rating}</span>
                    <span className="text-xs text-gray-500">({service.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    {service.processingTime}
                  </div>
                </div>

                {service.price && (
                  <div className="mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(service.price, selectedCurrency)}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">/month</span>
                  </div>
                )}

                <Button
                  onClick={() => handleServiceSelect(service)}
                  disabled={!service.available}
                  className="w-full"
                  variant={service.available ? 'default' : 'outline'}
                >
                  {service.available ? 'Pay Now' : 'Not Available'}
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Transactions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Payments</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>

        <div className="space-y-3">
          {recentTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <CreditCard size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.service}</p>
                  <p className="text-sm text-gray-500">
                    {transaction.timestamp.toLocaleDateString()} • {transaction.reference}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {formatCurrency(transaction.amount, selectedCurrency)}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(transaction.status)}`}>
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Payment Modal */}
      {showPayment && selectedService && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg p-6 w-full max-w-md"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Pay for {selectedService.name}</h3>
              <button
                onClick={() => setShowPayment(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  defaultValue={selectedService.price?.toString()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reference (Optional)</label>
                <Input
                  type="text"
                  placeholder="Account number or reference"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowPayment(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePayment}
                className="flex-1"
              >
                Pay Now
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
