import { ShoppingCart } from 'lucide-react';

interface CartFooterProps {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
}

export const CartFooter = ({
  totalItems,
  totalPrice,
  onCheckout,
}: CartFooterProps) => {
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 z-40">
      <div className="max-w-md mx-auto flex items-center gap-3">
        <div className="flex-1 flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-gray-300">
            <ShoppingCart size={18} />
            <span className="font-semibold">{totalItems}</span>
          </div>
          <div className="text-sm text-gray-400">
            Total: <span className="text-xl font-bold text-white">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={onCheckout}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-lg text-white font-bold transition-all touch-manipulation whitespace-nowrap"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
