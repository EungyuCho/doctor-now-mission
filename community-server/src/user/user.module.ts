import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { domains } from '../../../domains';
@Module({
  imports: [TypeOrmModule.forFeature([domains.User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
