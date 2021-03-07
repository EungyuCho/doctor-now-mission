import { Injectable } from '@nestjs/common';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domains/domains';
import { Repository } from 'typeorm';
import { UserRole } from '../../../domains/domains/user.entity';
import { LoginInput, LoginOutput } from './dtos/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    name,
    userRole,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const role = this.checkRole(userRole);

      if (!role) {
        return { ok: false, error: 'Role must be USER OR DOCTOR' };
      }

      const exists = await this.users.findOne(email);
      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }

      const user = this.users.create({ email, password, name, role });

      await this.users.save(user);

      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: 'Could not Create Account' };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne(email);

      if (!user) {
        return { ok: false, error: 'Email not exists' };
      }

      const isCorrect = await user.checkPassword(password);

      if (!isCorrect) {
        return { ok: false, error: 'Password is wrong' };
      }

      return {
        ok: true,
        token: 'token',
      };
    } catch (error) {
      return { ok: false, error: 'Could not login' };
    }
  }

  checkRole(role: string): UserRole | undefined {
    if (role.toUpperCase() === 'USER') {
      return UserRole.USER;
    }

    if (role.toUpperCase() === 'DOCTOR') {
      return UserRole.DOCTOR;
    }

    return undefined;
  }
}
