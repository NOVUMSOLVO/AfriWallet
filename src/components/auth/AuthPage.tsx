import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone,
  Wallet,
  Shield,
  Globe
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../hooks/useLanguage';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const { login, register, isLoading, error } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      await login(formData.email, formData.password);
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
    }
  };

  const features = [
    { icon: Wallet, title: 'Multi-Currency Wallet', desc: 'Support for 15+ African currencies' },
    { icon: Shield, title: 'Bank-Level Security', desc: 'Biometric & 2FA authentication' },
    { icon: Globe, title: 'Cross-Border Remittance', desc: 'Send money across Africa instantly' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding & Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Afri<span className="text-blue-600">Wallet</span>
            </h1>
            <p className="text-xl text-gray-600">
              Africa's leading digital wallet for the modern age
            </p>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="p-3 bg-blue-100 rounded-lg">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600 mt-2">
              {isLogin ? 'Sign in to your AfriWallet account' : 'Join millions using AfriWallet'}
            </p>
          </div>

          {/* Demo Credentials */}
          {isLogin && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 font-medium">Demo Credentials:</p>
              <p className="text-sm text-blue-600">Email: demo@afriwallet.com</p>
              <p className="text-sm text-blue-600">Password: demo123</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <Input
                  label="Full Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Mukamuri"
                  leftIcon={<User />}
                  required
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+263 77 123 4567"
                  leftIcon={<Phone />}
                  required
                />
              </>
            )}

            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              leftIcon={<Mail />}
              required
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              leftIcon={<Lock />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-gray-700"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              }
              required
            />

            {!isLogin && (
              <Input
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                leftIcon={<Lock />}
                required
              />
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
