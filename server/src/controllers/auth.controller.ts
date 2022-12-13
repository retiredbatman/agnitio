import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { DataStoredInToken } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';
import { HttpException } from '@/exceptions/HttpException';
import { decode } from 'jsonwebtoken';
import usersService from '@/services/users.service';

class AuthController {
  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const tokenData = await this.authService.login(userData);
      res.status(200).json({ token: tokenData.token });
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const Authorization = req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null;
      if (Authorization) {
        const decodeResponse = (await decode(JSON.parse(Authorization))) as DataStoredInToken;
        const userId = decodeResponse.id;
        const findUser = await usersService.findUserById(userId);
        if (findUser) {
          const tokenData = await this.authService.login({
            userName: findUser.userName,
          });
          res.status(200).json({ token: tokenData.token });
        } else {
          next(new HttpException(401, 'Wrong authentication token'));
        }
      } else {
        next(new HttpException(404, 'Authentication token missing'));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default AuthController;
