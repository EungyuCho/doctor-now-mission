import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from './jwt.service';
import { UserService } from '../user/user.service';
import { TOKEN_KEY } from '../../../commons/commons/common.constants';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('middleware');
    console.log(req);
    if (TOKEN_KEY in req.headers) {
      const token = req.headers[TOKEN_KEY];
      try {
        const decode = this.jwtService.verify(token.toString());
        if (typeof decode === 'object' && decode.hasOwnProperty('id')) {
          const { user } = await this.userService.findById(decode['id']);
          req['user'] = user;
        }
      } catch (e) {}
    }
    next();
  }
}
