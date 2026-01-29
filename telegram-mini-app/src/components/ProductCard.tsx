import type { Product } from '@/services/types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddClick: (product: Product) => void;
}

export const ProductCard = ({ product, onAddClick }: ProductCardProps) => {
  const stockLevel = 
    product.stock_quantity >= 50 
      ? 'high' 
      : product.stock_quantity >= 10 
      ? 'medium' 
      : 'low';

  const stockColors = {
    high: 'bg-green-500',
    medium: 'bg-yellow-500',
    low: 'bg-red-500',
  };

  const stockTextColors = {
    high: 'text-green-400',
    medium: 'text-yellow-400',
    low: 'text-red-400',
  };

  const progressWidth = 
    product.stock_quantity >= 50 
      ? '100%' 
      : `${Math.min((product.stock_quantity / 50) * 100, 100)}%`;

  return (
    <div
      onClick={() => onAddClick(product)}
      className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 active:scale-[0.98] transition-all cursor-pointer touch-manipulation"
    >
      <img
        src={product.image_url}
        alt={product.name}
        className="w-10 h-10 rounded object-cover flex-shrink-0"
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-white truncate">
              {product.name}
            </h3>
            <p className="text-xs text-gray-400 truncate">{product.article}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddClick(product);
            }}
            className="p-1.5 rounded-md bg-blue-600 hover:bg-blue-700 active:scale-95 transition-transform flex-shrink-0"
            aria-label="Add to cart"
          >
            <Plus size={16} className="text-white" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <p className="text-sm font-bold text-white mb-1">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${stockColors[stockLevel]} transition-all`}
                  style={{ width: progressWidth }}
                />
              </div>
              <div className={`text-xs ${stockTextColors[stockLevel]} whitespace-nowrap ${stockLevel === 'low' ? 'animate-pulse font-bold' : ''}`}>
                {product.stock_quantity}
                {product.incoming_quantity > 0 && (
                  <span className="text-gray-500"> +{product.incoming_quantity}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
