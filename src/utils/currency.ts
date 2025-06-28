import { Currency } from '../types';

export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', flag: '🇺🇸', rate: 1, name: 'US Dollar' },
  { code: 'GBP', symbol: '£', flag: '🇬🇧', rate: 0.79, name: 'British Pound' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺', rate: 0.85, name: 'Euro' },
  { code: 'ZWL', symbol: 'Z$', flag: '🇿🇼', rate: 680, name: 'Zimbabwean Dollar' },
  { code: 'ZAR', symbol: 'R', flag: '🇿🇦', rate: 18.5, name: 'South African Rand' },
  { code: 'KES', symbol: 'KSh', flag: '🇰🇪', rate: 130, name: 'Kenyan Shilling' },
  { code: 'NGN', symbol: '₦', flag: '🇳🇬', rate: 815, name: 'Nigerian Naira' },
  { code: 'GHS', symbol: '₵', flag: '🇬🇭', rate: 12, name: 'Ghanaian Cedi' },
  { code: 'UGX', symbol: 'USh', flag: '🇺🇬', rate: 3700, name: 'Ugandan Shilling' },
  { code: 'TZS', symbol: 'TSh', flag: '🇹🇿', rate: 2500, name: 'Tanzanian Shilling' },
  { code: 'ETB', symbol: 'Br', flag: '🇪🇹', rate: 55, name: 'Ethiopian Birr' },
  { code: 'RWF', symbol: 'FRw', flag: '🇷🇼', rate: 1100, name: 'Rwandan Franc' },
  { code: 'XOF', symbol: 'CFA', flag: '🇸🇳', rate: 600, name: 'West African CFA Franc' },
  { code: 'XAF', symbol: 'FCFA', flag: '🇨🇲', rate: 600, name: 'Central African CFA Franc' },
  { code: 'MAD', symbol: 'DH', flag: '🇲🇦', rate: 10, name: 'Moroccan Dirham' },
  { code: 'EGP', symbol: 'E£', flag: '🇪🇬', rate: 31, name: 'Egyptian Pound' },
  { code: 'BWP', symbol: 'P', flag: '🇧🇼', rate: 13.5, name: 'Botswana Pula' },
  { code: 'NAD', symbol: 'N$', flag: '🇳🇦', rate: 18.5, name: 'Namibian Dollar' },
  { code: 'SZL', symbol: 'L', flag: '🇸🇿', rate: 18.5, name: 'Swazi Lilangeni' },
  { code: 'LSL', symbol: 'M', flag: '🇱🇸', rate: 18.5, name: 'Lesotho Loti' }
];

export const formatCurrency = (amount: number, currencyCode: string = 'USD'): string => {
  const currency = currencies.find(c => c.code === currencyCode);
  if (!currency) return `$${amount.toLocaleString()}`;
  
  return `${currency.symbol}${amount.toLocaleString(undefined, {
    minimumFractionDigits: currencyCode === 'USD' ? 2 : 0,
    maximumFractionDigits: currencyCode === 'USD' ? 2 : 0
  })}`;
};

export const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1;
  const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1;
  
  // Convert to USD first, then to target currency
  const usdAmount = amount / fromRate;
  return usdAmount * toRate;
};

export const getCurrencyByCode = (code: string): Currency | undefined => {
  return currencies.find(c => c.code === code);
};