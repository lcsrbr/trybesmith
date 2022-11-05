import { RowDataPacket } from 'mysql2';
import { ResultSetHeader } from 'mysql2/promise';
import mysql from './connection';

import { IOrder, IOrders, IUser } from '../interface';

export default class OrderModel {
  connection = mysql;

  public async getOrders(): Promise<IOrder[]> {
    const [result] = await this
      .connection.execute<IOrder[] & RowDataPacket[]>(`
    SELECT Orders.id, Orders.userId, JSON_ARRAYAGG(Products.id) AS productsIds
    FROM Trybesmith.Orders AS Orders 
    INNER JOIN Trybesmith.Products AS Products ON Orders.id = Products.orderId
    GROUP BY Orders.id
    ORDER BY Orders.userId;`);
    return result; 
  }

  public async createOrder(productsIds: number[], user: IUser): Promise<IOrders> {
    const [{ insertId }] = await this
      .connection.execute<ResultSetHeader>(`
  INSERT INTO Trybesmith.Orders (userId) VALUES (${user.id})`);
    await Promise.all(productsIds.map(async (pId) => {
      // console.log(insertId, ' retorno retorno retorno');
      await this.connection.execute<ResultSetHeader>(`
      UPDATE Trybesmith.Products SET orderId=${insertId} WHERE id=${+pId}`);
    }));

    const result: IOrders = { userId: user.id as number, productsIds };
    return result; 
  }
}

// INSERT INTO tbl_name (a,b,c)
//     VALUES(1,2,3), (4,5,6), (7,8,9);

// UPDATE table_name SET column1=value1, column2=value2 WHERE condition
