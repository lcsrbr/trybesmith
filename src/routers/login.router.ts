import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post('/', (req, res) => loginController.loginValidate(req, res));

export default loginRouter;