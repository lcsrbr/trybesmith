import * as jwt from 'jsonwebtoken';
import { ILogin } from '../interface';
import LoginModel from '../models/login.model';
import UserModel from '../models/user.model';

// import HttpException from '../shared/http.exception';

export default class LoginService {
  loginModel = new LoginModel();

  userModel = new UserModel();

  jwt = jwt;

  async createToken(login: ILogin) {
    const token = this.jwt.sign({ 
      username: login.username, password: login.password }, process.env.JWT_SECRET as string);

    return token;
  }

  async loginValidate(login: ILogin): Promise<[number, object]> {
    if (!login.username) {
      return [400, { message: '"username" is required' }]; 
      //   throw new HttpException(401, 'Usuário não encontrado');
    }
    if (!login.password) {
      return [400, { message: '"password" is required' }]; 
      //   throw new HttpException(401, 'Usuário não encontrado');
    }

    const verify = await this.userModel.findByUser(login.username);

    if (verify.length === 0) {
      return [401, { message: 'Username or password invalid' }];
      //   throw new HttpException(401, 'Usuário não encontrado');
    }

    if (verify[0].password !== login.password) {
      return [401, { message: 'Username or password invalid' }];
      //   throw new HttpException(401, 'Usuário não encontrado');
    }

    await this.loginModel.loginValidate(login);
    const result = await this.createToken(login);
    return [200, { token: result }];
  }
}

// export default class UserService {
//   userModel = new UserModel();

//   async insertUser(user: IUser): Promise<string> {
//     await this.userModel.insertUser(user);
//     const result = await this.createToken(user);
//     return result;
//   }
// }