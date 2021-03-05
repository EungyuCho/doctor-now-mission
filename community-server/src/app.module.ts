import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '../../domains';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig as any), UserModule],
  controllers: [UserController],
})
export class AppModule {}
