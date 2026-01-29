import { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({
  message,
  type = 'success',
  isVisible,
  onClose,
  duration = 2500,
}: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: <CheckCircle size={20} className="text-green-400" />,
    error: <AlertCircle size={20} className="text-red-400" />,
    info: <AlertCircle size={20} className="text-blue-400" />,
  };

  const bgColors = {
    success: 'bg-green-900/90',
    error: 'bg-red-900/90',
    info: 'bg-blue-900/90',
  };

  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex justify-center animate-in slide-in-from-top duration-300">
      <div
        className={`${bgColors[type]} backdrop-blur-sm rounded-lg p-4 shadow-lg flex items-center gap-3 max-w-md w-full border border-gray-700`}
      >
        {icons[type]}
        <p className="text-white font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-white/10 active:scale-95 transition-transform"
          aria-label="Close"
        >
          <X size={16} className="text-gray-300" />
        </button>
      </div>
    </div>
  );
};
