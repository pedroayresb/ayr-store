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
      'INSERT INTO Ayrshop.orders (userId) VALUES (?)',
      [this.userId],
    );
    Promise.all(this.productsId!.map(async (product) => {
      await this.connection.execute<ResultSetHeader>(
        'INSERT INTO Ayrshop.products (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)',
        [insertId, product.id, product.quantity, product.price],
      );
    }));
    const [order] = await this.connection.execute(
      'SELECT * FROM Ayrshop.products WHERE orderId = ?',
      [insertId],
    );
    const [cartId] = await this.connection.execute<ResultSetHeader>(
      'SELECT cartId FROM Ayrshop.users WHERE id = ?',
      [this.userId],
    ) as any;
    await this.connection.execute(
      'DELETE FROM Ayrshop.cart_products WHERE cartId = ?',
      [cartId[0].cartId],
    );
    return order;
  }

  async getFromUser(userId: string) {
    const [orders] = await this.connection.execute(
      `SELECT * FROM Ayrshop.products INNER JOIN Ayrshop.orders ON Ayrshop.products.orderId = Ayrshop.orders.id WHERE Ayrshop.orders.userId = ?`,
      [userId],
    );
    return orders;
  }
}

export default Orders;