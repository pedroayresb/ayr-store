export interface ProductsInterface {
  id: string;
  quantity: number;
  price: number;
}

export interface OrdersInterface {
  id: number;
  userId: string;
  productId: string;
  quantity: number;
}