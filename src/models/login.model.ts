import { RowDataPacket } from 'mysql2';
// import { ResultSetHeader } from 'mysql2/promise';
import mysql from './connection';

import { ILogin } from '../interface';

export default class LoginModel {
  connection = mysql;

  public async loginValidate(login: ILogin): Promise<ILogin[]> {
    const { username, password } = login;
    const [result] = await this
      .connection.execute<ILogin[] & RowDataPacket[]>(`
      SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?;`, [username, password]);
      
    return result; 
  }
}
