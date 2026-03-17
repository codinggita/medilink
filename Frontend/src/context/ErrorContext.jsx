import React, { createContext, useContext, useState, useCallback } from 'react';

const ErrorContext = createContext(null);

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [errorStack, setErrorStack] = useState([]);

  const showError = useCallback((message, duration = 5000) => {
    const newError = {
      id: Date.now(),
      message,
      timestamp: new Date().toISOString(),
    };
    
    setErrorStack(prev => [...prev, newError]);
    setError(newError);
    
    if (duration > 0) {
      setTimeout(() => {
        setErrorStack(prev => prev.filter(e => e.id !== newError.id));
        setError(prev => prev?.id === newError.id ? null : prev);
      }, duration);
    }
  }, []);

  const clearError = useCallback((errorId = null) => {
    if (errorId) {
      setErrorStack(prev => prev.filter(e => e.id !== errorId));
      setError(prev => prev?.id === errorId ? null : prev);
    } else {
      setError(null);
      setErrorStack([]);
    }
  }, []);

  const clearAllErrors = useCallback(() => {
    setError(null);
    setErrorStack([]);
  }, []);

  return (
    <ErrorContext.Provider value={{ error, errorStack, showError, clearError, clearAllErrors }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

export default ErrorContext;
