import { ILogin, IUser } from '../interface';
import LoginModel from '../models/login.model';
import UserModel from '../models/user.model';
import CreateToken from '../utils/createToken';

// import HttpException from '../shared/http.exception';

export default class LoginService {
  loginModel = new LoginModel();

  userModel = new UserModel();

  createToken = new CreateToken();

  async loginValidate(login: ILogin): Promise<[number, object]> {
    if (!login.username) {
      return [400, { message: '"username" is required' }]; 
    }
    if (!login.password) {
      return [400, { message: '"password" is required' }]; 
    }
    const verify = await this.userModel.findByUser(login.username);
    if (verify.length === 0) {
      return [401, { message: 'Username or password invalid' }];
    }
    if (verify[0].password !== login.password) {
      return [401, { message: 'Username or password invalid' }];
    }

    const teste: IUser[] = await this.loginModel.loginValidate(login);
    const result = await this.createToken.createToken(teste[0]);
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