import { ResultSetHeader } from 'mysql2';
import { Pool } from 'mysql2/promise';
import connection from './connection';

class User {
  private connection: Pool;

  username?: string;

  password?: string;

  email?: string;

  experience?: number;


  constructor(username: string, password: string, email: string, experience: number) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.experience = experience;
    this.connection = connection;
  }

  async save(): Promise<number> {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Ayrshop.users (username, password, email, experience) VALUES (?, ?, ?, ?)',
      [this.username, this.password, this.email, 1],
    );
    return insertId as number;
  }

  public async login(user: string): Promise<User[]> {
    const [users] = await this.connection.execute(`
      SELECT * FROM Ayrshop.users 
      WHERE username = '${user}'`);
    return users as User[];
  }
}

export default User;