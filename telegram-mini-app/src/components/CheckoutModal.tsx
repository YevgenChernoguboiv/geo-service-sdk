import { useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import type { CartItem } from '@/services/types';

interface CheckoutModalProps {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onConfirm: () => void;
  onRemoveItem: (productId: string) => void;
}

export const CheckoutModal = ({
  isOpen,
  cartItems,
  onClose,
  onConfirm,
  onRemoveItem,
}: CheckoutModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.selected_quantity,
    0
  );
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md bg-gray-900 rounded-t-3xl sm:rounded-2xl border border-gray-800 max-h-[90vh] flex flex-col animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 duration-300 touch-manipulation">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between flex-shrink-0">
          <h2 className="text-xl font-bold text-white">Order Summary</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-800 active:scale-95 transition-transform"
            aria-label="Close"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg"
            >
              <img
                src={item.product.image_url}
                alt={item.product.name}
                className="w-12 h-12 rounded object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-white truncate">
                  {item.product.name}
                </h3>
                <p className="text-xs text-gray-400">{item.product.article}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-gray-400">
                    <span className="font-semibold text-white">{item.selected_quantity}</span> × ${item.product.price.toFixed(2)}
                  </div>
                  <div className="text-sm font-bold text-white">
                    ${(item.product.price * item.selected_quantity).toFixed(2)}
                  </div>
                </div>
              </div>
              <button
                onClick={() => onRemoveItem(item.product.id)}
                className="p-1.5 rounded-lg hover:bg-gray-700 active:scale-95 transition-transform flex-shrink-0"
                aria-label="Remove item"
              >
                <Trash2 size={16} className="text-red-400" />
              </button>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-800 space-y-3 flex-shrink-0">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Tax (15%)</span>
              <span className="text-white font-semibold">${tax.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-700">
              <span className="text-lg font-bold text-white">Total</span>
              <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onClose}
              className="py-3 bg-gray-700 hover:bg-gray-600 active:scale-95 rounded-lg text-white font-semibold transition-all touch-manipulation"
            >
              Edit Order
            </button>
            <button
              onClick={onConfirm}
              className="py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-lg text-white font-bold transition-all touch-manipulation"
            >
              CONFIRM ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
