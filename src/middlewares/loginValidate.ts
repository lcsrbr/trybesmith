import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import UserModel from '../models/user.model';
// import { IProduct } from '../interface';

async function loginValidate(req: Request, res: Response, next: NextFunction) {
  const createProdSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = createProdSchema.validate(req.body);
  if (error) {
    const status = error.message.includes('invalid') ? 401 : 400;
    return res.status(status).json({ message: error.message });
  }

  const usermodel = new UserModel();
  const [result] = await usermodel.findByUser(req.body.username); 
  if (!result || result.password !== req.body.password) {
    return res.status(401).json({ message: 'Username or password invalid' });
  }

  next();
}

export default loginValidate;
