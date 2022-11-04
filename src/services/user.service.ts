import * as jwt from 'jsonwebtoken';
import { IUser } from '../interface';
import UserModel from '../models/user.model';
// import HttpException from '../shared/http.exception';

export default class UserService {
  userModel = new UserModel();

  jwt = jwt;

  async createToken(user: IUser) {
    // validar se existe no banco
    // const verify = await this.userModel.findByUser(user.username);
    // console.log(verify, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    
    // if (!verify || verify.password !== user.password) {
    //   throw new HttpException(401, 'Usuário não encontrado');
    // }

    // se existir criar o token
    const token = this.jwt.sign({ 
      username: user.username, password: user.password }, process.env.JWT_SECRET as string);

    return token;
  }

  async insertUser(user: IUser): Promise<string> {
    await this.userModel.insertUser(user);
    const result = await this.createToken(user);
    return result;
  }
}