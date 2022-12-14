import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import authMiddleware from '../middlewares';
import orderValidate from '../middlewares/orderValidate';

const orderRouter = Router();

const orderController = new OrderController();

orderRouter.get('/', (req, res) => orderController.getOrders(req, res));

orderRouter.post(
  '/',
  authMiddleware,
  orderValidate,
  (req, res) => orderController.createOrder(req, res),
);

export default orderRouter;