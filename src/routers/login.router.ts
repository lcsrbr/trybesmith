import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import loginValidate from '../middlewares/loginValidate';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post('/', loginValidate, (req, res) => loginController.loginValidate(req, res));

export default loginRouter;