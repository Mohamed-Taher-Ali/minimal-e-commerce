import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PlainUserReturn } from './auth.types';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('/register')
  async register(
    @Body() body
  ): Promise<PlainUserReturn>{
    return await this.authService.register(body);
  }


  @Post('/login')
  async login(
    @Body() body
  ): Promise<PlainUserReturn>{
    return await this.authService.login(body);
  }
}
