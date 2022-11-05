import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import HttpException from '../shared/http.exception';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization: token } = req.headers;

    if (!token) {
      // throw new HttpException(401, 'Token não encontrado!');
      return res.status(401).json({ message: 'Token not found' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.body.user = decoded; // Colocamos a pessoa usuária para o req e ser utilizado em qualquer rota dos controllers

    next();
  } catch (err) {
    console.log(err);    
    return res.status(401).json({ message: 'Invalid token' });
  }
}