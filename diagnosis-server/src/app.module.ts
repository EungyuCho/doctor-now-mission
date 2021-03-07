import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '../../domains/index';
import { DiagnosisModule } from './diagnosis/diagnosis.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig as any), DiagnosisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
