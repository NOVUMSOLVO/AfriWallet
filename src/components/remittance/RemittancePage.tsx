import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Globe, 
  Clock, 
  DollarSign, 
  User, 
  CreditCard,
  Smartphone,
  Building,
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Calculator,
  Shield,
  Zap
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrency, currencies, convertCurrency } from '../../utils/currency';

interface RemittancePageProps {
  selectedCurrency: string;
  isOnline: boolean;
  onAddPendingTransaction: (transaction: any) => void;
}

export const RemittancePage: React.FC<RemittancePageProps> = ({
  selectedCurrency,
  isOnline,
  onAddPendingTransaction
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    toCountry: '',
    recipient: '',
    amount: '',
    deliveryMethod: '',
    fromCurrency: selectedCurrency,
    toCurrency: ''
  });

  const countries = [
    { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', currency: 'USD', popular: true },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currency: 'ZAR', popular: true },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪', currency: 'KES', popular: true },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currency: 'NGN', popular: true },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭', currency: 'GHS', popular: false },
    { code: 'UG', name: 'Uganda', flag: '🇺🇬', currency: 'UGX', popular: false },
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', currency: 'TZS', popular: false },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', popular: true },
    { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', popular: true }
  ];

  const deliveryMethods = [
    {
      id: 'mobile_money',
      name: 'Mobile Money',
      icon: Smartphone,
      description: 'EcoCash, M-Pesa, MTN Money',
      time: 'Instant',
      fee: 0,
      popular: true
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: Building,
      description: 'Direct to bank account',
      time: '1-2 business days',
      fee: 2.99,
      popular: true
    },
    {
      id: 'cash_pickup',
      name: 'Cash Pickup',
      icon: MapPin,
      description: 'Pickup at agent locations',
      time: '15 minutes',
      fee: 4.99,
      popular: false
    },
    {
      id: 'home_delivery',
      name: 'Home Delivery',
      icon: User,
      description: 'Cash delivered to door',
      time: '2-4 hours',
      fee: 7.99,
      popular: false
    }
  ];

  const exchangeRate = formData.toCurrency ? 
    currencies.find(c => c.code === formData.toCurrency)?.rate || 1 : 1;
  
  const convertedAmount = formData.amount ? 
    convertCurrency(parseFloat(formData.amount), formData.fromCurrency, formData.toCurrency) : 0;

  const selectedDeliveryMethod = deliveryMethods.find(m => m.id === formData.deliveryMethod);
  const totalFee = selectedDeliveryMethod?.fee || 0;
  const totalCost = (parseFloat(formData.amount) || 0) + totalFee;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSend = () => {
    const transaction = {
      type: 'remittance',
      amount: parseFloat(formData.amount),
      fromCurrency: formData.fromCurrency,
      toCurrency: formData.toCurrency,
      recipient: formData.recipient,
      country: formData.toCountry,
      deliveryMethod: formData.deliveryMethod,
      fee: totalFee,
      convertedAmount,
      timestamp: new Date()
    };

    if (isOnline) {
      console.log('Processing remittance:', transaction);
      setStep(5); // Success step
    } else {
      onAddPendingTransaction(transaction);
      setStep(5);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Destination Country</h3>
            
            {/* Popular Countries */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Destinations</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {countries.filter(c => c.popular).map((country) => (
                  <motion.button
                    key={country.code}
                    onClick={() => {
                      setFormData(prev => ({ 
                        ...prev, 
                        toCountry: country.name,
                        toCurrency: country.currency 
                      }));
                      handleNext();
                    }}
                    className="p-3 border rounded-lg hover:bg-gray-50 transition-colors text-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-2xl mb-1">{country.flag}</div>
                    <div className="text-sm font-medium">{country.name}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* All Countries */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">All Countries</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {countries.map((country) => (
                  <motion.button
                    key={country.code}
                    onClick={() => {
                      setFormData(prev => ({ 
                        ...prev, 
                        toCountry: country.name,
                        toCurrency: country.currency 
                      }));
                      handleNext();
                    }}
                    className="w-full flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                    whileHover={{ scale: 1.01 }}
                  >
                    <span className="text-xl mr-3">{country.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium">{country.name}</div>
                      <div className="text-sm text-gray-500">Currency: {country.currency}</div>
                    </div>
                    <ArrowRight size={16} className="text-gray-400" />
                  </motion.button>
                ))}
              </div>
            </div>
          </Card>
        );

      case 2:
        return (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipient Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Name *
                </label>
                <input 
                  type="text" 
                  value={formData.recipient}
                  onChange={(e) => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address (Optional)
                </label>
                <input 
                  type="email" 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter email address"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={handleNext} 
                  disabled={!formData.recipient}
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </div>
          </Card>
        );

      case 3:
        return (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Amount & Delivery Method</h3>
            
            <div className="space-y-6">
              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Send
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-16" 
                    placeholder="0.00"
                    min="1"
                    step="0.01"
                  />
                  <span className="absolute right-3 top-3 text-gray-500">{formData.fromCurrency}</span>
                </div>
                {formData.amount && (
                  <p className="text-sm text-gray-600 mt-1">
                    Recipient will receive: {formatCurrency(convertedAmount, formData.toCurrency)}
                  </p>
                )}
              </div>

              {/* Delivery Methods */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Delivery Method
                </label>
                <div className="space-y-3">
                  {deliveryMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <motion.label
                        key={method.id}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.deliveryMethod === method.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'hover:bg-gray-50'
                        }`}
                        whileHover={{ scale: 1.01 }}
                      >
                        <input 
                          type="radio" 
                          name="delivery" 
                          value={method.id}
                          checked={formData.deliveryMethod === method.id}
                          onChange={(e) => setFormData(prev => ({ ...prev, deliveryMethod: e.target.value }))}
                          className="mr-3" 
                        />
                        <Icon size={20} className="text-blue-600 mr-3" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">{method.name}</p>
                            <div className="flex items-center">
                              <Clock size={14} className="text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600">{method.time}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">{method.description}</p>
                          <p className="text-sm font-medium text-green-600 mt-1">
                            Fee: {method.fee === 0 ? 'Free' : formatCurrency(method.fee, formData.fromCurrency)}
                          </p>
                        </div>
                      </motion.label>
                    );
                  })}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={handleNext} 
                  disabled={!formData.amount || !formData.deliveryMethod}
                  className="flex-1"
                >
                  Review
                </Button>
              </div>
            </div>
          </Card>
        );

      case 4:
        return (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review & Confirm</h3>
            
            <div className="space-y-6">
              {/* Transaction Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Transaction Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium">{formData.recipient}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Country:</span>
                    <span className="font-medium">{formData.toCountry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">{formatCurrency(parseFloat(formData.amount), formData.fromCurrency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exchange Rate:</span>
                    <span className="font-medium">1 {formData.fromCurrency} = {exchangeRate} {formData.toCurrency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Recipient Gets:</span>
                    <span className="font-medium text-green-600">{formatCurrency(convertedAmount, formData.toCurrency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Method:</span>
                    <span className="font-medium">{selectedDeliveryMethod?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Time:</span>
                    <span className="font-medium">{selectedDeliveryMethod?.time}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transfer Fee:</span>
                    <span className="font-medium">{formatCurrency(totalFee, formData.fromCurrency)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Cost:</span>
                    <span>{formatCurrency(totalCost, formData.fromCurrency)}</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                <Shield size={16} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">Secure Transfer</p>
                  <p className="text-blue-600">Your transaction is protected by bank-level security</p>
                </div>
              </div>

              {!isOnline && (
                <div className="flex items-start p-3 bg-orange-50 rounded-lg">
                  <AlertCircle size={16} className="text-orange-600 mr-2 mt-1 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-orange-800">Offline Mode</p>
                    <p className="text-orange-600">Transfer will be processed when connection is restored</p>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleSend} className="flex-1">
                  {isOnline ? 'Send Money' : 'Queue Transfer'}
                </Button>
              </div>
            </div>
          </Card>
        );

      case 5:
        return (
          <Card className="p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isOnline ? 'Transfer Sent!' : 'Transfer Queued!'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isOnline 
                  ? `Your money is on its way to ${formData.recipient} in ${formData.toCountry}`
                  : `Your transfer will be processed when connection is restored`
                }
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                <p className="font-mono text-lg">#TXN{Date.now().toString().slice(-8)}</p>
              </div>

              <Button 
                onClick={() => {
                  setStep(1);
                  setFormData({
                    toCountry: '',
                    recipient: '',
                    amount: '',
                    deliveryMethod: '',
                    fromCurrency: selectedCurrency,
                    toCurrency: ''
                  });
                }}
                className="w-full"
              >
                Send Another Transfer
              </Button>
            </motion.div>
          </Card>
        );

      default:
        return null;
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
          <Send size={24} className="text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Send Money</h1>
        </div>
        {step < 5 && (
          <div className="text-sm text-gray-500">
            Step {step} of 4
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {step < 5 && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: '25%' }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* Step Content */}
      {renderStep()}

      {/* Features */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <Zap size={24} className="text-yellow-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">Fast Transfers</h4>
            <p className="text-sm text-gray-600">Money delivered in minutes</p>
          </Card>
          
          <Card className="p-4 text-center">
            <Shield size={24} className="text-green-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">Secure & Safe</h4>
            <p className="text-sm text-gray-600">Bank-level security</p>
          </Card>
          
          <Card className="p-4 text-center">
            <DollarSign size={24} className="text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">Best Rates</h4>
            <p className="text-sm text-gray-600">Competitive exchange rates</p>
          </Card>
        </div>
      )}
    </motion.div>
  );
};