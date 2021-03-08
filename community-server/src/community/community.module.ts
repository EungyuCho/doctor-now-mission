import { Module } from '@nestjs/common';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { domains } from '../../../domains';

@Module({
  imports: [TypeOrmModule.forFeature([domains.Board, domains.Comment])],
  controllers: [CommunityController],
  providers: [CommunityService],
})
export class CommunityModule {}
