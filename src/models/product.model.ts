import { RowDataPacket } from 'mysql2';
import { Pool, ResultSetHeader } from 'mysql2/promise';
import mysql from './connection';

import { IProduct } from '../interface';

// forma funcional
// const insertProducts = async (name: string, amount: string): Promise<IProduct[]> => {
//   const [result] = await connection.execute<IProduct[] & RowDataPacket[]>(`INSERT INTO
//           Trybesmith.Products (name,amount)
//           VALUES(?, ?)`, [name, amount]);
  
//   const [dataInserted] = result;
    
//   const { insertId } = dataInserted;
//   const obj: IProduct[] = { 
//     id: insertId,
//     name,
//     amount,
//   };
    
//   return obj; 
// };

// export default insertProducts;

// Classes
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
