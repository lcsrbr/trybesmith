import { RowDataPacket } from 'mysql2';
import { ResultSetHeader } from 'mysql2/promise';
import mysql from './connection';

import { IUser } from '../interface';

export default class UserModel {
  connection = mysql;

  public async insertUser(user: IUser): Promise<IUser> {
    const { username, classe, level, password } = user;
    const [{ insertId }] = await this
      .connection.execute<ResultSetHeader>(` INSERT INTO
      Trybesmith.Users (username, classe, level, password)
      VALUES(?, ?, ?, ?)`, [username, classe, level, password]);
        
    return { id: insertId, username, classe, level, password }; 
  }

  public async findByUser(username: string): Promise<IUser[]> {
    const [result] = await this.connection
      .execute<IUser[] & RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ?',
      [username],
    );
    return result; 
  }
}
