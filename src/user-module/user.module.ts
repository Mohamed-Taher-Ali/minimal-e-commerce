import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { User } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, User],
  exports: [UserService]
})
export class UserModule {}
