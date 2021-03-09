import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-user.dto';
import { UserService } from './user.service';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('api/user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiResponse({ type: CreateAccountOutput, status: 201 })
  @Post('account')
  createAccount(
    @Body() createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.usersService.createAccount(createAccountInput);
  }

  @ApiResponse({ type: LoginOutput, status: 200 })
  @Post('login')
  login(@Body() loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }
}
