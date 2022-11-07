import { ILogin } from '../interface';
import LoginModel from '../models/login.model';
import UserModel from '../models/user.model';
import CreateToken from '../utils/createToken';

// import HttpException from '../shared/http.exception';

export default class LoginService {
  loginModel = new LoginModel();

  userModel = new UserModel();

  createToken = new CreateToken();

  async loginValidate(login: ILogin): Promise<string> {
    const validate = await this.loginModel.loginValidate(login);
    const result = await this.createToken.createToken(validate);
    return result;
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