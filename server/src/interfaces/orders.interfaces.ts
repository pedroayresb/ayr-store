export interface ProductsInterface {
  id: string;
  quantity: number;
}

export interface OrdersInterface {
  id: number;
  userId: string;
  productId: string;
  quantity: number;
}