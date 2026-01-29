import type { Product } from '@/services/types';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  isLoading?: boolean;
}

export const ProductList = ({
  products,
  onProductClick,
  isLoading,
}: ProductListProps) => {
  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-800 animate-pulse"
          >
            <div className="w-10 h-10 bg-gray-800 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-800 rounded w-3/4" />
              <div className="h-3 bg-gray-800 rounded w-1/2" />
              <div className="h-2 bg-gray-800 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-gray-400 text-center">No products available</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-in fade-in slide-in-from-bottom-2 duration-300"
          style={{ animationDelay: `${index * 30}ms` }}
        >
          <ProductCard product={product} onAddClick={onProductClick} />
        </div>
      ))}
    </div>
  );
};
