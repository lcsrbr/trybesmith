import { RowDataPacket } from 'mysql2';
// import { ResultSetHeader } from 'mysql2/promise';
import mysql from './connection';

import { IOrder } from '../interface';

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
}
