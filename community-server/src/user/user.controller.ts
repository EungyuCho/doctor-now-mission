import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-user.dto';
import { UserService } from './user.service';
import {LoginInput, LoginOutput} from "./dtos/login.dto";

@Controller('api/user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('createAccount')
  createAccount(
    @Body() createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.usersService.createAccount(createAccountInput);
  }

  login(@Body() loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }
}
