export interface Product {
  id: string;
  name: string;
  article: string;
  price: number;
  stock_quantity: number;
  incoming_quantity: number;
  image_url: string;
}

export interface CartItem {
  product: Product;
  selected_quantity: number;
}
