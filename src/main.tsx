import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

console.log('main.tsx: Starting application...');

const rootElement = document.getElementById('root');
console.log('main.tsx: Root element found:', !!rootElement);

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
  console.log('main.tsx: React app rendered');
} else {
  console.error('main.tsx: Root element not found!');
}
