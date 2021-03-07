import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ormConfig } from '../../domains/index';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig as any),
    UserModule,
    JwtModule.forRoot({
      jwtSecretKey: 'secret_jwt_key',
      accessTokenExpire: 60,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
