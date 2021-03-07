import { Module } from '@nestjs/common';
import { DiagnosisController } from './diagnosis.controller';
import { DiagnosisService } from './diagnosis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { domains } from '../../../domains';

@Module({
  imports: [TypeOrmModule.forFeature([domains.Diagnosis, domains.User])],
  controllers: [DiagnosisController],
  providers: [DiagnosisService],
})
export class DiagnosisModule {}
