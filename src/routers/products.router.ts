import { Router } from 'express';
import ProductsController from '../controllers/products.controller';

const productsRouter = Router();

const productsController = new ProductsController();

// solução 1 - Mudar o método para ser do tipo arrow function no arquivo do controller
// productsRouter.get('/', productssController.getAll);
// solução 2 - Método
// productsRouter.get('/', productssController.getAll.bind(productssController));
// solução 3- Manter como Método e abrir um middleware e chamar como uma funcão!
productsRouter.post('/', (req, res) => productsController.insertProducts(req, res));

export default productsRouter;