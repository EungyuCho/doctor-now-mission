import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ormConfig } from '../../domains/index';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { CommunityModule } from './community/community.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig as any),
    UserModule,
    JwtModule.forRoot({
      jwtSecretKey: 'secret_jwt_key',
      accessTokenExpire: 60,
    }),
    AuthModule,
    CommonModule,
    CommunityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
