import { useState, useEffect } from 'react';
import type { Product } from '@/services/types';
import { X, Delete, ShoppingCart } from 'lucide-react';

interface NumpadModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onAdd: (product: Product, quantity: number) => void;
}

export const NumpadModal = ({
  isOpen,
  product,
  onClose,
  onAdd,
}: NumpadModalProps) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (isOpen) {
      setInput('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const maxQuantity = product.stock_quantity + product.incoming_quantity;
  const currentValue = parseInt(input) || 0;
  const isOverLimit = currentValue > maxQuantity;
  const canAdd = currentValue > 0 && !isOverLimit;

  const handleNumberClick = (num: string) => {
    if (input.length < 6) {
      const newValue = input + num;
      setInput(newValue);
    }
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const handleMax = () => {
    setInput(maxQuantity.toString());
  };

  const handlePack = () => {
    const newValue = currentValue + 12;
    if (newValue <= maxQuantity) {
      setInput(newValue.toString());
    }
  };

  const handleAdd = () => {
    if (canAdd) {
      onAdd(product, currentValue);
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md bg-gray-900 rounded-t-3xl border-t border-gray-800 animate-in slide-in-from-bottom duration-300 touch-manipulation">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 pr-2">
              <h3 className="font-bold text-white text-base leading-tight mb-1">
                {product.name}
              </h3>
              <p className="text-xs text-gray-400">{product.article}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-800 active:scale-95 transition-transform flex-shrink-0"
              aria-label="Close"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold text-white">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-400">
              Available: <span className="font-semibold text-white">{maxQuantity}</span>
            </p>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <div className="bg-gray-800 rounded-lg p-4 border-2 border-gray-700">
              <div className="text-3xl font-bold text-white text-center min-h-[48px] flex items-center justify-center">
                {input || '0'}
              </div>
              {isOverLimit && (
                <p className="text-red-400 text-xs text-center mt-2 font-semibold">
                  Only {maxQuantity} available
                </p>
              )}
              {currentValue > 0 && !isOverLimit && (
                <p className="text-gray-400 text-xs text-center mt-2">
                  Total: ${(product.price * currentValue).toFixed(2)}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num)}
                className="aspect-square bg-gray-800 hover:bg-gray-700 active:scale-95 rounded-lg text-white font-semibold text-xl transition-all touch-manipulation"
              >
                {num}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            <button
              onClick={handleMax}
              className="aspect-square bg-purple-600 hover:bg-purple-700 active:scale-95 rounded-lg text-white font-semibold text-sm transition-all touch-manipulation"
            >
              MAX
            </button>
            <button
              onClick={() => handleNumberClick('0')}
              className="aspect-square bg-gray-800 hover:bg-gray-700 active:scale-95 rounded-lg text-white font-semibold text-xl transition-all touch-manipulation"
            >
              0
            </button>
            <button
              onClick={handleBackspace}
              className="aspect-square bg-gray-800 hover:bg-gray-700 active:scale-95 rounded-lg text-white font-semibold transition-all flex items-center justify-center touch-manipulation"
            >
              <Delete size={24} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={handlePack}
              className="py-3 bg-orange-600 hover:bg-orange-700 active:scale-95 rounded-lg text-white font-semibold text-sm transition-all touch-manipulation"
            >
              PACK (+12)
            </button>
            <button
              onClick={onClose}
              className="py-3 bg-gray-700 hover:bg-gray-600 active:scale-95 rounded-lg text-white font-semibold transition-all touch-manipulation"
            >
              CANCEL
            </button>
          </div>

          <button
            onClick={handleAdd}
            disabled={!canAdd}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-lg text-white font-bold text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
          >
            <ShoppingCart size={20} />
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};
