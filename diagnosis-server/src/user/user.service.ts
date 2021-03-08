import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domains/domains';
import { Repository } from 'typeorm';
import { UserRole } from '../../../domains/domains/user.entity';
import { JwtService } from '../jwt/jwt.service';
import { ProfileInput, ProfileOutput } from './dtos/profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findById({ id }: ProfileInput): Promise<ProfileOutput> {
    try {
      const user = await this.users.findOneOrFail({ id });
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return { ok: false, error: 'User not found' };
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
