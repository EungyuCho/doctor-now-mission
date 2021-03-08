import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '../../domains/index';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig as any),
    DiagnosisModule,
    CommonModule,
    AuthModule,
    JwtModule.forRoot({
      jwtSecretKey: 'secret_jwt_key',
      accessTokenExpire: 60,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
