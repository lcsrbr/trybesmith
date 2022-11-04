import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  loginService = new LoginService();

  async loginValidate(req: Request, res: Response) {
    const login = await this.loginService.loginValidate(req.body);
    res.status(login[0]).json(login[1]);
  }
}