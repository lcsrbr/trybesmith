import { RowDataPacket } from 'mysql2';
// import { ResultSetHeader } from 'mysql2/promise';
import mysql from './connection';

import { ILogin, IUser } from '../interface';

export default class LoginModel {
  connection = mysql;

  public async loginValidate(login: ILogin): Promise<IUser[]> {
    const { username, password } = login;
    const [result] = await this
      .connection.execute<IUser[] & RowDataPacket[]>(`
      SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?;`, [username, password]);
      
    return result; 
  }
}
