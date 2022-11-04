import { Request, Response } from 'express';
import ProductsService from '../services/product.service';

export default class ProductsController {
  productService = new ProductsService();

  async insertProducts(req: Request, res: Response) {
    const { name, amount } = req.body;
    const products = await this.productService.insertProducts(name, amount);
    res.status(201).json(products);
  }

  async getProducts(req: Request, res: Response) {
    const products = await this.productService.getProducts();
    res.status(200).json(products);
  }
}