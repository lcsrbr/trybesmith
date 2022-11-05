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
    if (!productsIds) {
      return res.status(400).json({ message: '"productsIds" is required' });
    }
    if (!Array.isArray(productsIds)) {
      return res.status(422).json({ message: '"productsIds" must be an array' });
    }
    const validateNumber = productsIds.every((pId: number) => typeof pId === 'number');
    if (!validateNumber || productsIds.length === 0) {
      return res.status(422).json({ message: '"productsIds" must include only numbers' });
    }
    const { user } = req.body.user;
    const orders = await this.orderService.createOrder(productsIds, user);
    
    return res.status(201).json(orders);
  }
}