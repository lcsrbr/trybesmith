import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
// import { IProduct } from '../interface';

function userValidate(req: Request, res: Response, next: NextFunction) {
  const createProdSchema = Joi.object({
    username: Joi.string().min(3).required(),
    classe: Joi.string().min(3).required(),
    level: Joi.number().min(1).required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = createProdSchema.validate(req.body);
  if (error) {
    const status = error.message.includes('must') ? 422 : 400;
    return res.status(status).json({ message: error.message });
  }
  
  next();
}

export default userValidate;
