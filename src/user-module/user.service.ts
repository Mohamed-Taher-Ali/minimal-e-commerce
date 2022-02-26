import { repositories } from 'src/database-module/database.repositories';
import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { RegisterParams } from './user.types';

@Injectable()
export class UserService {
  constructor(
    @Inject(repositories.USERS_REPOSITORY)
    private readonly userModel: typeof User,
    ) {}


  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        id
      }
    });

    return user.get({plain: true});
  }


  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        email
      }
    });

    return user?.get({plain: true});
  }


  async createNewUser(input: RegisterParams): Promise<User> {
    let newUser = new User(input);
    newUser = await newUser.save();

    return newUser.get({ plain: true });
  }
}
