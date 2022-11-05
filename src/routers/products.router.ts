import { Router } from 'express';
import ProductsController from '../controllers/products.controller';
import productValidate from '../middlewares/productValidate';

const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.post(
  '/', 
  productValidate.NameValidate,
  productValidate.AmountValidate, 
  (req, res) => productsController
    .insertProducts(req, res),
);
productsRouter.get('/', (req, res) => productsController.getProducts(req, res));

export default productsRouter;