import { IOrder, IOrders, IUser } from '../interface';
import OrderModel from '../models/order.model';

export default class ProductsService {
  orderModel = new OrderModel();

  async getOrders(): Promise<IOrder[]> {
    const users = await this.orderModel.getOrders();
    return users;
  }

  async createOrder(productsIds: number[], user: IUser): Promise<IOrders> {
    const users = await this.orderModel.createOrder(productsIds, user);
    return users;
  }
}