import * as jwt from 'jsonwebtoken';
import { IUser } from '../interface';
import UserModel from '../models/user.model';
// import HttpException from '../shared/http.exception';

export default class CreateToken {
  userModel = new UserModel();

  jwt = jwt;

  async createToken(user: IUser): Promise<string> {
    const token = this.jwt.sign({ user }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
      algorithm: 'HS256', 
    });

    return token;
  }
}