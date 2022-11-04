import { RowDataPacket } from 'mysql2';
import { ResultSetHeader } from 'mysql2/promise';
import mysql from './connection';

import { IProduct } from '../interface';

export default class ProductModel {
  connection = mysql;

  public async insertProducts(name: string, amount: string): Promise<IProduct> {
    const [{ insertId }] = await this
      .connection.execute<ResultSetHeader>(` INSERT INTO
      Trybesmith.Products (name,amount)
      VALUES(?, ?)`, [name, amount]);
        
    return { id: insertId, name, amount }; 
  }

  public async getProducts(): Promise<IProduct[]> {
    const [result] = await this
      .connection.execute<IProduct[] & RowDataPacket[]>('SELECT * FROM Trybesmith.Products;');
    return result; 
  }
}
