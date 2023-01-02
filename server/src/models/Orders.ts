
import { ResultSetHeader } from 'mysql2';
import { Pool } from 'mysql2/promise';
import connection from './connection';

class Orders {
  private connection: Pool;

  userId?: string;

  productsId?: string[];


  constructor(userId: string, productsId: string[]) {
    this.userId = userId;
    this.productsId = productsId;
    this.connection = connection;
  }

  public async getFromUser(user: string): Promise<Orders[]> {
    const [users] = await this.connection.execute(`
      SELECT * FROM Ayrshop.orders 
      WHERE userId = '${user}'`);
    return users as Orders[];
  }
  
  async save(): Promise<Orders[]> {
    Promise.all(this.productsId!.map(async (product) => {
      await this.connection.execute<ResultSetHeader>(
        'INSERT INTO Ayrshop.orders (userId, productId) VALUES (?, ?)',
        [this.userId, product],
      );
    }));
    const exp = Number(this.productsId!.length * 10);
    await this.connection.execute<ResultSetHeader>(
      `UPDATE Ayrshop.users SET experience = experience + ${exp} WHERE id = ?`,
      [this.userId],
    );
    const added = await this.getFromUser(this.userId!);
    return added;
  }

}

export default Orders;