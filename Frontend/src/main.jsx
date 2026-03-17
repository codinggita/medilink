import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ErrorProvider } from './context/ErrorContext';
import { ErrorContainer } from './components/ErrorDisplay';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <ErrorProvider>
          <AuthProvider>
            <ThemeProvider>
              <App />
              <ErrorContainer />
            </ThemeProvider>
          </AuthProvider>
        </ErrorProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
