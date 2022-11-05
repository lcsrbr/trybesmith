import { Request, Response, NextFunction } from 'express';
// import Joi from 'joi';
// import { IProduct } from '../interface';

function NameValidate(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body;
  
  if (!name) res.status(400).json({ message: '"name" is required' });
  
  if (name && typeof name !== 'string') {
    return res.status(422).json({ message: '"name" must be a string' });
  }

  if (name.length < 3) {
    return res.status(422)
      .json({ message: '"name" length must be at least 3 characters long' });
  }

  next();
}

function AmountValidate(req: Request, res: Response, next: NextFunction) {
  const { amount } = req.body;
  
  if (!amount) res.status(400).json({ message: '"amount" is required' });

  if (amount && typeof amount !== 'string') {
    return res.status(422).json({ message: '"amount" must be a string' }); 
  }
  
  if (amount.length < 3) {
    return res.status(422)
      .json({ message: '"amount" length must be at least 3 characters long' });
  }
  
  next();
}

export default { NameValidate, AmountValidate };