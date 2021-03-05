import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../domains/domains';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
})
export class UserModule {}
