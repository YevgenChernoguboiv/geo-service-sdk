import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ProductList } from '@/components/ProductList';
import { NumpadModal } from '@/components/NumpadModal';
import { CartFooter } from '@/components/CartFooter';
import { CheckoutModal } from '@/components/CheckoutModal';
import { Toast } from '@/components/Toast';
import { getProducts } from '@/services/api';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/services/types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isNumpadOpen, setIsNumpadOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    visible: boolean;
  }>({ message: '', type: 'success', visible: false });

  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getTotal,
    getTotalItems,
  } = useCartStore();

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      showToast('Failed to load products', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' = 'success'
  ) => {
    setToast({ message, type, visible: true });
  };

  const hideToast = () => {
    setToast({ ...toast, visible: false });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsNumpadOpen(true);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
    showToast(`Added ${quantity}× ${product.name}`, 'success');
  };

  const handleConfirmOrder = () => {
    clearCart();
    setIsCheckoutOpen(false);
    showToast('✓ Order sent to 1C', 'success');
  };

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <Header onRefresh={loadProducts} isLoading={isLoading} />
      
      <ProductList
        products={products}
        onProductClick={handleProductClick}
        isLoading={isLoading}
      />

      <CartFooter
        totalItems={getTotalItems()}
        totalPrice={getTotal()}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      <NumpadModal
        isOpen={isNumpadOpen}
        product={selectedProduct}
        onClose={() => setIsNumpadOpen(false)}
        onAdd={handleAddToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        cartItems={cart}
        onClose={() => setIsCheckoutOpen(false)}
        onConfirm={handleConfirmOrder}
        onRemoveItem={removeFromCart}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={hideToast}
      />
    </div>
  );
}

export default App;
