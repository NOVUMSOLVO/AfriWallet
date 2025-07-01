import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  QrCode, 
  Scan, 
  Copy, 
  Share, 
  Download,
  Camera,
  Upload,
  CheckCircle
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Modal } from '../ui/Modal';
import { formatCurrency, currencies } from '../../utils/currency';
import { useNotificationHelpers } from '../../contexts/NotificationContext';

interface QRPaymentProps {
  selectedCurrency: string;
  onPaymentComplete: (amount: number, currency: string) => void;
}

export const QRPaymentPage: React.FC<QRPaymentProps> = ({ 
  selectedCurrency, 
  onPaymentComplete 
}) => {
  const [activeTab, setActiveTab] = useState<'generate' | 'scan'>('generate');
  const [showQRModal, setShowQRModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState(selectedCurrency);
  const [description, setDescription] = useState('');
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { notifySuccess, notifyError } = useNotificationHelpers();

  const currencyOptions = currencies.map(curr => ({
    value: curr.code,
    label: `${curr.code} - ${curr.name}`
  }));

  const generateQRCode = () => {
    if (!amount || parseFloat(amount) <= 0) {
      notifyError('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    // In a real app, this would generate an actual QR code
    const paymentData = {
      amount: parseFloat(amount),
      currency,
      description,
      recipient: 'john.mukamuri@afriwallet.com',
      timestamp: Date.now()
    };

    // Mock QR code generation
    setGeneratedQR(JSON.stringify(paymentData));
    setShowQRModal(true);
    
    notifySuccess('QR Code Generated', 'Share this code to receive payment');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Mock QR code scanning from image
      setTimeout(() => {
        processScannedQR('{"amount":50,"currency":"USD","description":"Lunch payment","sender":"alice@afriwallet.com"}');
      }, 1000);
    }
  };

  const startCameraScanning = () => {
    setIsScanning(true);
    // Mock camera scanning
    setTimeout(() => {
      setIsScanning(false);
      processScannedQR('{"amount":25,"currency":"USD","description":"Coffee payment","sender":"bob@afriwallet.com"}');
    }, 3000);
  };

  const processScannedQR = (qrData: string) => {
    try {
      const paymentData = JSON.parse(qrData);
      
      // Show confirmation modal or process payment
      const confirmed = window.confirm(
        `Receive ${formatCurrency(paymentData.amount, paymentData.currency)} from ${paymentData.sender}?\n\nDescription: ${paymentData.description || 'No description'}`
      );
      
      if (confirmed) {
        onPaymentComplete(paymentData.amount, paymentData.currency);
        notifySuccess(
          'Payment Received',
          `${formatCurrency(paymentData.amount, paymentData.currency)} added to your wallet`
        );
      }
    } catch (error) {
      notifyError('Invalid QR Code', 'Could not process the scanned QR code');
    }
  };

  const copyToClipboard = () => {
    if (generatedQR) {
      navigator.clipboard.writeText(generatedQR);
      notifySuccess('Copied', 'Payment details copied to clipboard');
    }
  };

  const shareQRCode = () => {
    if (navigator.share && generatedQR) {
      navigator.share({
        title: 'AfriWallet Payment Request',
        text: `Please pay ${formatCurrency(parseFloat(amount), currency)}`,
        url: `afriwallet://pay?data=${encodeURIComponent(generatedQR)}`
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">QR Payments</h1>
        <p className="text-gray-600">Generate or scan QR codes for instant payments</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('generate')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'generate'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <QrCode className="h-4 w-4 inline mr-2" />
          Generate QR
        </button>
        <button
          onClick={() => setActiveTab('scan')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'scan'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Scan className="h-4 w-4 inline mr-2" />
          Scan QR
        </button>
      </div>

      {/* Generate QR Tab */}
      {activeTab === 'generate' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Generate Payment QR Code
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
              
              <Select
                label="Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                options={currencyOptions}
              />
            </div>

            <Input
              label="Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this payment for?"
            />

            <Button
              onClick={generateQRCode}
              className="w-full"
              disabled={!amount || parseFloat(amount) <= 0}
            >
              <QrCode className="h-4 w-4 mr-2" />
              Generate QR Code
            </Button>
          </div>
        </Card>
      )}

      {/* Scan QR Tab */}
      {activeTab === 'scan' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Scan QR Code
            </h2>
            
            <div className="space-y-4">
              <Button
                onClick={startCameraScanning}
                className="w-full"
                disabled={isScanning}
              >
                <Camera className="h-4 w-4 mr-2" />
                {isScanning ? 'Scanning...' : 'Scan with Camera'}
              </Button>

              <div className="text-center text-gray-500">or</div>

              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload QR Code Image
                </Button>
              </div>
            </div>
          </Card>

          {/* Camera Preview Mock */}
          {isScanning && (
            <Card className="p-6">
              <div className="aspect-square bg-gray-900 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-white rounded-lg animate-pulse">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500"></div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                  Position QR code within the frame
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* QR Code Modal */}
      <Modal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        title="Payment QR Code"
        size="md"
      >
        <div className="text-center space-y-6">
          {/* Mock QR Code Display */}
          <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
            <div className="grid grid-cols-8 gap-1">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {formatCurrency(parseFloat(amount), currency)}
            </h3>
            {description && (
              <p className="text-gray-600">{description}</p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={copyToClipboard}
              className="flex-1"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button
              variant="outline"
              onClick={shareQRCode}
              className="flex-1"
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
