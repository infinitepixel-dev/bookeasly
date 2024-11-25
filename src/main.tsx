import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { BusinessTypeProvider } from './contexts/BusinessTypeContext';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <BusinessTypeProvider>
      <App />
    </BusinessTypeProvider>
  </StrictMode>
);