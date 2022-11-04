import { IProduct } from '../interface';
import ProductModel from '../models/product.model';

// paradigma funcional
// const userModel = new UserModel();

// export const getAll = async (): Promise<IUser[]> => {
//   const users = await userModel.getAll();
//   return users;
// }

export default class ProductsService {
  productModel = new ProductModel();

  async insertProducts(name: string, amount: string): Promise<IProduct> {
    const users = await this.productModel.insertProducts(name, amount);
    return users;
  }
}