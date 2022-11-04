import { Router } from 'express';
import productsRouter from './products.router';
import usersRouter from './users.router';
// import authMiddleware from '../middlewares';

const router = Router();

router.use('/products', productsRouter);

router.use('/users', usersRouter);

export default router;