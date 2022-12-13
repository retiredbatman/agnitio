import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import usersService from './users.service';

class AuthService {
  public async login(userData: CreateUserDto): Promise<TokenData> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    let findUser: User = usersService.users.find(user => user.userName === userData.userName);
    if (!findUser) {
      findUser = { id: usersService.users.length + 1, ...userData, isAdmin: false };
      usersService.createUser(findUser);
    }

    const tokenData = this.createToken(findUser);

    return tokenData;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 30 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}

export default AuthService;
