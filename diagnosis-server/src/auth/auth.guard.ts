import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '../jwt/jwt.service';
import { UserService } from '../user/user.service';
import { AllowedRoles } from './role.decorator';
import { TOKEN_KEY } from '../../../commons/commons/common.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<AllowedRoles>('roles', ctx.getHandler());
    if (!roles) {
      return true;
    }

    const req = ctx.switchToHttp().getRequest();
    const token = req.headers[TOKEN_KEY];
    if (token) {
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        const { user } = await this.userService.findById({ id: decoded['id'] });

        if (!user) {
          return false;
        }

        req.headers['user'] = user;

        if (roles.includes('Any')) {
          return true;
        }

        return roles.includes(user.role);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
