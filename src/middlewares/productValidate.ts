import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

function productValidate(req: Request, res: Response, next: NextFunction) {
  const createProdSchema = Joi.object({
    name: Joi.string().min(3).required(),
    amount: Joi.string().min(3).required(),
  });

  const { error } = createProdSchema.validate(req.body);
  
  if (error) {
    const status = error.message.includes('must') ? 422 : 400;
    return res.status(status).json({ message: error.message });
  }
  
  next();
}

export default productValidate;