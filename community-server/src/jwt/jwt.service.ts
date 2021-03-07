import { Inject, Injectable } from '@nestjs/common';
import { JWT_OPTIONS } from '../../../commons/commons/common.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(
    @Inject(JWT_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  sign(userId: number): string {
    return jwt.sign(
      {
        id: userId,
        exp:
          Math.floor(Date.now() / 1000) + 60 * this.options.accessTokenExpire,
      },
      this.options.jwtSecretKey,
    );
  }

  verify(token: string) {
    return jwt.verify(token, this.options.jwtSecretKey);
  }
}
