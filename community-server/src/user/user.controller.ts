import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-user.dto';
import { UserService } from './user.service';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('api/user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiResponse({ type: CreateAccountOutput })
  @Post('account')
  createAccount(
    @Body() createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.usersService.createAccount(createAccountInput);
  }

  @ApiResponse({ type: LoginOutput })
  @Post('login')
  login(@Body() loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }
}
