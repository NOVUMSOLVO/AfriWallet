import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Heart, 
  Car, 
  Home, 
  Briefcase,
  Plus,
  Calendar,
  DollarSign,
  Check,
  FileText,
  Phone,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/currency';

interface InsurancePageProps {
  selectedCurrency: string;
}

interface InsuranceProduct {
  id: string;
  name: string;
  type: 'health' | 'life' | 'auto' | 'home' | 'business';
  provider: string;
  premium: number;
  coverage: number;
  description: string;
  features: string[];
  popular?: boolean;
  recommended?: boolean;
}

interface Policy {
  id: string;
  product: string;
  provider: string;
  type: 'health' | 'life' | 'auto' | 'home' | 'business';
  premium: number;
  coverage: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired' | 'pending' | 'cancelled';
  nextPayment: Date;
}

interface Claim {
  id: string;
  policy: string;
  amount: number;
  status: 'pending' | 'approved' | 'processing' | 'rejected';
  description: string;
  submittedDate: Date;
  expectedDate?: Date;
}

export const InsurancePage: React.FC<InsurancePageProps> = ({
  selectedCurrency
}) => {
  const [activeTab, setActiveTab] = useState<'policies' | 'products' | 'claims'>('policies');
  const [selectedProduct, setSelectedProduct] = useState<InsuranceProduct | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);

  const insuranceProducts: InsuranceProduct[] = [
    {
      id: '1',
      name: 'Essential Health Cover',
      type: 'health',
      provider: 'First Mutual Health',
      premium: 25,
      coverage: 5000,
      description: 'Basic health insurance for individuals and families',
      features: [
        'Doctor consultations',
        'Emergency treatment',
        'Prescription medications',
        'Preventive care'
      ],
      popular: true
    },
    {
      id: '2',
      name: 'Term Life Insurance',
      type: 'life',
      provider: 'Old Mutual',
      premium: 15,
      coverage: 50000,
      description: 'Affordable life insurance protection',
      features: [
        'Death benefit',
        'Disability coverage',
        'Premium waivers',
        'Conversion options'
      ],
      recommended: true
    },
    {
      id: '3',
      name: 'Comprehensive Auto',
      type: 'auto',
      provider: 'Zimnat General Insurance',
      premium: 45,
      coverage: 15000,
      description: 'Full vehicle protection including theft and damage',
      features: [
        'Collision coverage',
        'Theft protection',
        'Third-party liability',
        '24/7 roadside assistance'
      ]
    },
    {
      id: '4',
      name: 'Homeowner Protection',
      type: 'home',
      provider: 'Sanctuary Insurance',
      premium: 35,
      coverage: 100000,
      description: 'Protect your home and belongings',
      features: [
        'Property damage',
        'Personal belongings',
        'Liability coverage',
        'Temporary accommodation'
      ]
    },
    {
      id: '5',
      name: 'Business Protect',
      type: 'business',
      provider: 'Fidelity Life',
      premium: 80,
      coverage: 25000,
      description: 'Comprehensive business insurance',
      features: [
        'Property protection',
        'Business interruption',
        'Professional liability',
        'Employee coverage'
      ]
    }
  ];

  const myPolicies: Policy[] = [
    {
      id: '1',
      product: 'Essential Health Cover',
      provider: 'First Mutual Health',
      type: 'health',
      premium: 25,
      coverage: 5000,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      status: 'active',
      nextPayment: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      product: 'Term Life Insurance',
      provider: 'Old Mutual',
      type: 'life',
      premium: 15,
      coverage: 50000,
      startDate: new Date('2024-03-01'),
      endDate: new Date('2025-03-01'),
      status: 'active',
      nextPayment: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }
  ];

  const myClaims: Claim[] = [
    {
      id: '1',
      policy: 'Essential Health Cover',
      amount: 250,
      status: 'approved',
      description: 'Doctor consultation and medication',
      submittedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      expectedDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      policy: 'Essential Health Cover',
      amount: 180,
      status: 'processing',
      description: 'Emergency room visit',
      submittedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      expectedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'health':
        return Heart;
      case 'life':
        return Shield;
      case 'auto':
        return Car;
      case 'home':
        return Home;
      case 'business':
        return Briefcase;
      default:
        return Shield;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'expired':
        return 'text-red-600 bg-red-50';
      case 'pending':
        return 'text-orange-600 bg-orange-50';
      case 'cancelled':
        return 'text-gray-600 bg-gray-50';
      case 'approved':
        return 'text-green-600 bg-green-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const handleProductSelect = (product: InsuranceProduct) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleQuote = () => {
    setShowProductModal(false);
    alert('Quote request submitted! We will contact you within 24 hours.');
  };

  const totalCoverage = myPolicies.reduce((sum, policy) => sum + policy.coverage, 0);
  const monthlyPremiums = myPolicies.reduce((sum, policy) => sum + policy.premium, 0);

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
          <Shield size={24} className="text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Insurance</h1>
        </div>
        <Button className="flex items-center">
          <Plus size={16} className="mr-2" />
          Get Quote
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <Shield size={24} className="text-blue-600" />
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-600 mb-1">Total Coverage</p>
              <p className="text-2xl font-bold text-blue-700">
                {formatCurrency(totalCoverage, selectedCurrency)}
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="flex items-center justify-between mb-4">
              <DollarSign size={24} className="text-green-600" />
              <Calendar size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-green-600 mb-1">Monthly Premiums</p>
              <p className="text-2xl font-bold text-green-700">
                {formatCurrency(monthlyPremiums, selectedCurrency)}
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-orange-50 border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <FileText size={24} className="text-orange-600" />
              <Clock size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-orange-600 mb-1">Active Policies</p>
              <p className="text-2xl font-bold text-orange-700">{myPolicies.length}</p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'policies', label: 'My Policies' },
          { id: 'products', label: 'Browse Products' },
          { id: 'claims', label: 'Claims' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'policies' | 'products' | 'claims')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* My Policies Tab */}
      {activeTab === 'policies' && (
        <div className="space-y-4">
          {myPolicies.map((policy, index) => {
            const Icon = getTypeIcon(policy.type);
            const daysUntilPayment = Math.ceil((policy.nextPayment.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
            
            return (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <Icon size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{policy.product}</h3>
                        <p className="text-sm text-gray-500">{policy.provider}</p>
                        <div className="flex items-center mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(policy.status)}`}>
                            {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {formatCurrency(policy.coverage, selectedCurrency)}
                      </p>
                      <p className="text-sm text-gray-500">Coverage</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500">Monthly Premium</p>
                      <p className="font-medium text-gray-900">
                        {formatCurrency(policy.premium, selectedCurrency)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Policy Period</p>
                      <p className="font-medium text-gray-900">
                        {policy.startDate.toLocaleDateString()} - {policy.endDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Next Payment</p>
                      <p className={`font-medium ${daysUntilPayment <= 7 ? 'text-orange-600' : 'text-gray-900'}`}>
                        {daysUntilPayment > 0 ? `In ${daysUntilPayment} days` : 'Overdue'}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <Button variant="outline" size="sm">
                      <FileText size={16} className="mr-2" />
                      View Policy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone size={16} className="mr-2" />
                      Contact Agent
                    </Button>
                    <Button variant="outline" size="sm">
                      Make Claim
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}

          {myPolicies.length === 0 && (
            <Card className="p-12 text-center">
              <Shield size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Policies</h3>
              <p className="text-gray-500 mb-6">Get started by browsing our insurance products</p>
              <Button onClick={() => setActiveTab('products')}>
                Browse Insurance Products
              </Button>
            </Card>
          )}
        </div>
      )}

      {/* Browse Products Tab */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insuranceProducts.map((product, index) => {
            const Icon = getTypeIcon(product.type);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Icon size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.provider}</p>
                      </div>
                    </div>
                    {product.popular && (
                      <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-medium">
                        Popular
                      </span>
                    )}
                    {product.recommended && (
                      <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium">
                        Recommended
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                  <div className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <Check size={14} className="text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500">From</p>
                        <p className="text-lg font-bold text-gray-900">
                          {formatCurrency(product.premium, selectedCurrency)}/month
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Coverage up to</p>
                        <p className="text-lg font-bold text-gray-900">
                          {formatCurrency(product.coverage, selectedCurrency)}
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleProductSelect(product)}
                      className="w-full"
                    >
                      Get Quote
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Claims Tab */}
      {activeTab === 'claims' && (
        <div className="space-y-4">
          {myClaims.map((claim, index) => (
            <motion.div
              key={claim.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{claim.description}</h3>
                    <p className="text-sm text-gray-500 mt-1">{claim.policy}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(claim.status)}`}>
                        {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500 ml-3">
                        Submitted: {claim.submittedDate.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(claim.amount, selectedCurrency)}
                    </p>
                    {claim.expectedDate && (
                      <p className="text-sm text-gray-500">
                        Expected: {claim.expectedDate.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-3 mt-4">
                  <Button variant="outline" size="sm">
                    <FileText size={16} className="mr-2" />
                    View Details
                  </Button>
                  {claim.status === 'pending' && (
                    <Button variant="outline" size="sm">
                      Add Documents
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}

          {myClaims.length === 0 && (
            <Card className="p-12 text-center">
              <FileText size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Claims</h3>
              <p className="text-gray-500">You haven't submitted any insurance claims yet</p>
            </Card>
          )}
        </div>
      )}

      {/* Product Quote Modal */}
      {showProductModal && selectedProduct && (
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
              <h3 className="text-lg font-semibold text-gray-900">Get Quote: {selectedProduct.name}</h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Monthly Premium</span>
                  <span className="font-medium">{formatCurrency(selectedProduct.premium, selectedCurrency)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Coverage Amount</span>
                  <span className="font-medium">{formatCurrency(selectedProduct.coverage, selectedCurrency)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">What's included:</p>
                {selectedProduct.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <Check size={14} className="text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowProductModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleQuote}
                className="flex-1"
              >
                Request Quote
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
