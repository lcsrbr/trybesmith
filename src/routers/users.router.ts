import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userRouter = Router();

const userController = new UserController();

// solução 1 - Mudar o método para ser do tipo arrow function no arquivo do controller
// userRouter.get('/', usersController.getAll);
// solução 2 - Método
// userRouter.get('/', usersController.getAll.bind(usersController));
// solução 3- Manter como Método e abrir um middleware e chamar como uma funcão!
userRouter.post('/', (req, res) => userController.insertUser(req, res));
// userRouter.get('/', (req, res) => userController.getUser(req, res));

export default userRouter;