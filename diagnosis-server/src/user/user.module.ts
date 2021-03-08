import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { domains } from '../../../domains';
@Module({
  imports: [TypeOrmModule.forFeature([domains.User])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
