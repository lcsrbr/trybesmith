import { IOrder } from '../interface';
import OrderModel from '../models/order.model';

export default class ProductsService {
  orderModel = new OrderModel();

  async getOrders(): Promise<IOrder[]> {
    const users = await this.orderModel.getOrders();
    return users;
  }
}