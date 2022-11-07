import { Router } from 'express';
import UserController from '../controllers/user.controller';
import userValidate from '../middlewares/userValidate';

const userRouter = Router();

const userController = new UserController();

userRouter.post(
  '/',
  userValidate, 

  (req, res) => userController.insertUser(req, res),
);

export default userRouter;