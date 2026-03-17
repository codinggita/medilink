import React, { useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useError } from '../context/ErrorContext';

const ErrorToast = ({ type = 'error', message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    error: <AlertCircle className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
  };

  const colors = {
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  };

  const iconColors = {
    error: 'text-red-500',
    success: 'text-green-500',
    info: 'text-blue-500',
    warning: 'text-yellow-500',
  };

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg animate-in slide-in-from-top-2 ${colors[type]}`}>
      <span className={iconColors[type]}>{icons[type]}</span>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button 
        onClick={onClose}
        className="p-1 hover:bg-black/5 rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const ErrorDisplay = ({ title, message, onRetry, onDismiss }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title || 'Something went wrong'}</h3>
      <p className="text-slate-500 mb-6 max-w-md">{message || 'An error occurred while loading this content.'}</p>
      <div className="flex gap-3">
        {onRetry && (
          <button 
            onClick={onRetry}
            className="px-6 py-2.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        )}
        {onDismiss && (
          <button 
            onClick={onDismiss}
            className="px-6 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
};

const ErrorContainer = () => {
  const { errorStack, clearError } = useError();

  if (errorStack.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {errorStack.map((error) => (
        <ErrorToast
          key={error.id}
          type="error"
          message={error.message}
          onClose={() => clearError(error.id)}
        />
      ))}
    </div>
  );
};

export { ErrorToast, ErrorDisplay, ErrorContainer };
export default ErrorContainer;
