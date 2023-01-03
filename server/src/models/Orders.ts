import { ResultSetHeader } from 'mysql2';
import { Pool } from 'mysql2/promise';
import connection from './connection';
import { ProductsInterface } from '../interfaces/orders.interfaces';

class Orders {
  private connection: Pool;

  userId?: string;

  productsId?: ProductsInterface[];


  constructor(userId: string, products: ProductsInterface[]) {
    this.connection = connection;
    this.userId = userId;
    this.productsId = products;
  }

  async save() {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.orders (user_id) VALUES (?)',
      [this.userId],
    );
    Promise.all(this.productsId!.map(async (product) => {
      await this.connection.execute<ResultSetHeader>(
        'INSERT INTO Trybesmith.products (order_id, product_id, quantity) VALUES (?, ?)',
        [insertId, product.id, product.quantity],
      );
    }));
    const [order] = await this.connection.execute(
      'SELECT * FROM Trybesmith.products WHERE order_id = ?',
      [insertId],
    );
    return order;
  }

  async getFromUser(userId: string) {
    const [orders] = await this.connection.execute(
      `SELECT product_id, quantity 
      FROM Trybesmith.products 
      INNER JOIN Trybesmith.orders
      ON Trybesmith.products.order_id = Trybesmith.orders.id
      WHERE Trybesmith.orders.user_id = ?`,
      [userId],
    );
    return orders;
  }
}

export default Orders;