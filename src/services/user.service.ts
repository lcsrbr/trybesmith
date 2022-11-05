import { IUser } from '../interface';
import UserModel from '../models/user.model';
import CreateToken from '../utils/createToken';
// import HttpException from '../shared/http.exception';

export default class UserService {
  userModel = new UserModel();

  createToken = new CreateToken();

  async insertUser(user: IUser): Promise<string> {
    await this.userModel.insertUser(user);
    const result = await this.createToken.createToken(user);
    return result;
  }
}