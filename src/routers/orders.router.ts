import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const orderRouter = Router();

const orderController = new OrderController();

orderRouter.get('/', (req, res) => orderController.getOrders(req, res));

export default orderRouter;