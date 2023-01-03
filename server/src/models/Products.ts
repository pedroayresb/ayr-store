import { ResultSetHeader } from 'mysql2';
import { Pool } from 'mysql2/promise';
import connection from './connection';
import { ProductsInterface } from '../interfaces/orders.interfaces';

class Products {
  private connection: Pool;

  orderId?: string;

  productId?: string;

  quantity?: number;


  constructor(userId: string, products: string, quantity: number) {
    this.connection = connection;
    this.orderId = userId;
    this.productId = products;
    this.quantity = quantity;
  }

}

export default Products;