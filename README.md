# AfriWallet

AfriWallet is a comprehensive digital wallet and financial management application designed to serve the unique needs of African users. It offers a multilingual, multi-currency platform for managing personal and group finances (chamas), remittances, investments, and currency exchange—all in one place.

## 🚀 Features

### 📱 **Core Wallet Features**
- **Multi-Currency Digital Wallet**: Support for 15+ African and international currencies
- **Mobile Money Integration**: EcoCash, Mukuru, NetOne Money, PayNow, M-Pesa, MTN Mobile Money
- **Bank Integration**: CBZ Bank, Steward Bank, Standard Chartered, FBC Bank
- **Cryptocurrency Support**: Bitcoin, Ethereum wallets

### 👥 **Chama Management**
- Create and manage group savings pools ("chamas")
- Track contributions, membership, and collective goals
- Weekly, monthly, and quarterly contribution schedules
- Member management and contribution tracking

### 💱 **Currency Exchange**
- Real-time exchange rates for African currencies
- Live rate updates with trend indicators
- Currency conversion calculator
- Offline transaction queueing

### 📈 **Investment Platform**
- Treasury Bills investment tracking
- Stock portfolio management
- Corporate Bonds monitoring
- Investment performance analytics
- Risk assessment indicators

### 🌍 **Remittance Services**
- Cross-border money transfers
- Multiple delivery methods (bank, mobile money, cash pickup)
- Real-time transfer tracking
- Competitive exchange rates

### 🎯 **Financial Planning**
- **Goals Tracker**: Emergency funds, vacation, education, business goals
- **Budget Manager**: Category-based spending tracking
- **Financial Insights**: Spending analytics and trends
- **Visual Charts**: Interactive spending and savings charts

### 🔒 **Security Features**
- Biometric authentication (fingerprint, face, voice)
- Two-factor authentication
- Device management
- KYC verification system

### 🌍 **Multi-Language Support**
Available in 7 languages:
- **English** (Default)
- **Shona** (ChiShona) - Zimbabwe
- **Swahili** (Kiswahili) - East Africa
- **Yoruba** - Nigeria/West Africa
- **Ndebele** (IsiNdebele) - Zimbabwe
- **Zulu** (IsiZulu) - South Africa
- **Amharic** (አማርኛ) - Ethiopia

## 🛠 Technologies Used

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React hooks + localStorage persistence
- **Internationalization**: Custom translation system

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/NOVUMSOLVO/AfriWallet.git
   cd AfriWallet
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   - Navigate to `http://localhost:5173`
   - The app will auto-reload when you make changes

### Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🏗 Project Structure

```
src/
├── components/
│   ├── dashboard/       # Dashboard widgets & analytics
│   ├── wallet/          # Wallet management interface
│   ├── chama/           # Group savings management
│   ├── exchange/        # Currency exchange interface
│   ├── investment/      # Investment tracking
│   ├── remittance/      # Money transfer interface
│   ├── security/        # Security settings
│   ├── goals/           # Financial goals tracker
│   ├── budget/          # Budget management
│   ├── language/        # Language switching
│   ├── layout/          # Header, sidebar, navigation
│   └── ui/              # Reusable UI components
├── hooks/               # Custom React hooks
├── types/               # TypeScript interfaces
├── utils/               # Utility functions & mock data
└── App.tsx             # Main application component
```

## 🎨 UI Components

The app includes a comprehensive set of reusable UI components:

- **Button**: Primary, secondary, outline, ghost variants
- **Card**: Content containers with shadows and borders
- **Modal**: Overlay dialogs for forms and confirmations
- **Input**: Form inputs with labels, errors, and icons
- **Select**: Dropdown selections with validation
- **LoadingSpinner**: Loading states and transitions

## 📊 Mock Data & Testing

The app comes with comprehensive mock data for testing:

- **User Data**: Sample profiles with multi-currency balances
- **Transactions**: Various transaction types and statuses
- **Chamas**: Sample group savings with different schedules
- **Investments**: Portfolio with different risk levels
- **Notifications**: System alerts and updates
- **Exchange Rates**: Real-time rate simulation

## 🌐 Internationalization

Translation keys are organized by feature:
- Navigation terms
- Common actions
- Financial terminology
- Status indicators
- Form labels
- Messages and alerts

Example usage:
```tsx
import { useLanguage } from './hooks/useLanguage';

const { t } = useLanguage();
return <button>{t('send')}</button>; // "Send" / "Tumira" / "Tuma"
```

## 🚀 Deployment

### Vite Build
```bash
npm run build
# Generates optimized build in dist/ folder
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
# Build first
npm run build

# Deploy dist/ folder to Netlify
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Add tests if applicable**
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and patterns
- Add appropriate TypeScript types
- Update translations for new text
- Test on different screen sizes
- Ensure accessibility standards

## 📱 Responsive Design

AfriWallet is fully responsive and optimized for:
- **Mobile devices** (320px+)
- **Tablets** (768px+)
- **Desktop** (1024px+)
- **Large screens** (1280px+)

## 🔮 Future Features

- [ ] Real API integrations
- [ ] Push notifications
- [ ] Offline-first architecture
- [ ] Advanced analytics dashboard
- [ ] Social features for chamas
- [ ] Merchant payment gateway
- [ ] QR code payments
- [ ] Voice commands
- [ ] AI-powered financial insights

## 📄 License

MIT License - see [LICENSE.md](LICENSE.md) for details

## 🙏 Acknowledgments

- African mobile money providers for inspiration
- React and TypeScript communities
- Tailwind CSS for amazing styling
- Lucide for beautiful icons
- Framer Motion for smooth animations

---

**AfriWallet** - Empowering financial inclusion across Africa 🌍

Built with ❤️ for the African community
