import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
// import { IProduct } from '../interface';

function orderValidate(req: Request, res: Response, next: NextFunction) {
  const createProdSchema = Joi.object({
    productsIds: Joi.array().min(1).items(Joi.number()).required()
      .messages({
        'array.min': '"productsIds" must include only numbers',
      }),
  });

  const { productsIds } = req.body;    
  const { error } = createProdSchema.validate({ productsIds });
  
  if (error) {
    const status = error.message.includes('must') ? 422 : 400;
    return res.status(status).json({ message: error.message });
  }
  
  next();
}

export default orderValidate;
