import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ormConfig } from '../../domains/index';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig as any), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
