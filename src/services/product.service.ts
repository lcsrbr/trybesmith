import { IProduct } from '../interface';
import ProductModel from '../models/product.model';

export default class ProductsService {
  productModel = new ProductModel();

  async insertProducts(name: string, amount: string): Promise<IProduct> {
    const users = await this.productModel.insertProducts(name, amount);
    return users;
  }

  async getProducts(): Promise<IProduct[]> {
    const users = await this.productModel.getProducts();
    return users;
  }
}