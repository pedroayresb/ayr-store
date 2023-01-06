import { ResultSetHeader } from 'mysql2';
import { OkPacket, Pool } from 'mysql2/promise';
import connection from './connection';
import { ProductsInterface } from '../interfaces/orders.interfaces';
import { AddedUserInterface } from '../interfaces/users.interfaces';

class Cart {
  private connection: Pool;

  userId?: string;

  productsId?: ProductsInterface[];


  constructor(userId: string, products: ProductsInterface[]) {
    this.connection = connection;
    this.userId = userId;
    this.productsId = products;
  }

  async save() {
    const cartId = await this.connection.execute<OkPacket[]>(
      `SELECT cartId FROM Ayrshop.users WHERE id = ?`,
      [this.userId],
    );
    const [Cart] = await this.connection.execute<ResultSetHeader>(
      `INSERT INTO Ayrshop.cart_products (cartId, productId, quantity, price) VALUES (?, ?, ?, ?)`,
      [Object.values(cartId[0][0])[0], this.productsId![0].id, this.productsId![0].quantity, this.productsId![0].price],
    );
    return Cart;
  }

  async update() {
    const cartId = await this.connection.execute<OkPacket[]>(
      `SELECT cartId FROM Ayrshop.users WHERE id = ?`,
      [this.userId],
    );
    const [Cart] = await this.connection.execute<ResultSetHeader>(
      `UPDATE Ayrshop.cart_products SET quantity = ? WHERE cartId = ? AND productId = ?`,
      [this.productsId![0].quantity, Object.values(cartId[0][0])[0], this.productsId![0].id],
    );
    return Cart;
  }

  async delete() {
    const cartId = await this.connection.execute<OkPacket[]>(
      `SELECT cartId FROM Ayrshop.users WHERE id = ?`,
      [this.userId],
    );
    await this.connection.execute<ResultSetHeader>(
      `DELETE FROM Ayrshop.cart_products WHERE cartId = ? AND productId = ?`,
      [Object.values(cartId[0][0])[0], this.productsId![0].id],
    );
    return;
  }

  async getFromUser(userId: string) {
    const cartId = await this.connection.execute<OkPacket[]>(
      `SELECT cartId FROM Ayrshop.users WHERE id = ?`,
      [userId],
    );

    const [Cart] = await this.connection.execute<ResultSetHeader>(
      `SELECT * FROM Ayrshop.cart_products WHERE cartId = ?`,
      [Object.values(cartId[0][0])[0]],
    );
    return Cart;
  }
}

export default Cart;