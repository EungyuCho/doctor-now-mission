import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('/api/user')
  createAccount(
    @Body() createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.usersService.createAccount(createAccountInput);
  }
}
