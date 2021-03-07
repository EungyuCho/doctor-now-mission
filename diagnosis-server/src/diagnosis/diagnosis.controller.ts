import { Controller, Get } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';

@Controller('api/diagnosis')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @Get('getAll')
  getAll() {
    return this.diagnosisService.getAll();
  }
}
