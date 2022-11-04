import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  userService = new UserService();

  async insertUser(req: Request, res: Response) {
    const { username, classe, level, password } = req.body;
    const user = { username, classe, level, password };
    const users = await this.userService.insertUser(user);
    res.status(201).json({ token: users });
  }
}