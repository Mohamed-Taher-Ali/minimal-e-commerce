import { LoginParams, PlainUserReturn, RegisterParams, TokenPayload } from './auth.types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorMessages } from 'src/app-configs/error-messages';
import { UserService } from 'src/user-module/user.service';
import { User } from 'src/user-module/user.model';
import { config } from '../app-configs/config';

const jwt = require ('jsonwebtoken');
const bcrypt = require("bcrypt");


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService
  ) { }

  async validateUserForLogin(input: LoginParams) {
    const user = await this.userService.findUserByEmail(input.email);

    if (!user) throw new HttpException(
      ErrorMessages.EMAIL_OR_PASSWORD_NOT_CORRECT,
      HttpStatus.FORBIDDEN
    );

    const validPassword = await bcrypt.compare(
      input.password, user.password
    );

    if (!validPassword) throw new HttpException(
      ErrorMessages.EMAIL_OR_PASSWORD_NOT_CORRECT,
      HttpStatus.FORBIDDEN
    );

    return user;
  }


  generateToken(user: User) {
    const payload: TokenPayload = { id: user.id };
    return jwt.sign(payload, config.appSecretKey);
  }


  async login(input: LoginParams): Promise<PlainUserReturn> {
    const user = await this.validateUserForLogin(input);
    const token = this.generateToken(user);
    const { password, ...userData } = user;

    return {
      ...userData as PlainUserReturn,
      token
    };
  };


  async register(input: RegisterParams): Promise<PlainUserReturn> {
    const user = await this.userService.findUserByEmail(input.email);

    if (user) throw new HttpException(
      ErrorMessages.USER_ACTUALLY_EXIST,
      HttpStatus.FORBIDDEN
    );

    const hashedPassword = await bcrypt.hash(
      input.password, 10
    );

    input.password = hashedPassword;

    const newUser = await this.userService.createNewUser(input);

    return newUser;
  };


  getHeaderAuthorization(request: Request) {
    const authorization = request?.headers['authorization'] || '';
    return authorization;
  }

  extractTokenFromAuthorization(authorization: string): TokenPayload{
    const payload = jwt.decode(authorization) as TokenPayload;
    return payload;
  }

  async validateRequest(request: Request): Promise<User> {
    const authorization = this.getHeaderAuthorization(request);
    const payload = this.extractTokenFromAuthorization(authorization);

    if(!payload?.id) throw new HttpException(
      ErrorMessages.AUTHORIZATION_FAILED,
      HttpStatus.FORBIDDEN
    );

    const user = await this.userService.findUserById(payload.id);

    return user;
  }

}
