import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class OrderController {
  orderService = new OrderService();

  async getOrders(req: Request, res: Response) {
    const orders = await this.orderService.getOrders();
    res.status(200).json(orders);
  }

  async createOrder(req: Request, res: Response) {
    const { productsIds } = req.body;
    const { user } = req.body.user;
    const orders = await this.orderService.createOrder(productsIds, user);
    
    return res.status(201).json(orders);
  }
}