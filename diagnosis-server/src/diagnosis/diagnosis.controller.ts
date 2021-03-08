import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { GetDoctorsOutput } from './dtos/get-doctor.dto';
import { Role } from '../auth/role.decorator';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from '../../../domains/domains';
import {
  RequestDiagnosisInput,
  RequestDiagnosisOutput,
} from './dtos/request-diagnosis.dto';
import { LoadDiagnosisOutput } from './dtos/load-diagnosis.dto';
import { PrescribeInput, PrescribeOutput } from './dtos/prescribe.dto';

@Controller('api/diagnosis')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @Role(['USER'])
  @Get('/doctor')
  getDoctors(): Promise<GetDoctorsOutput> {
    return this.diagnosisService.getDoctors();
  }

  @Role(['USER'])
  @Post('/doctor/:id/diagnosis')
  requestDiagnosis(
    @Param('id') doctorId: number,
    @Body() requestDiagnosisInput: RequestDiagnosisInput,
    @AuthUser() user: User,
  ): Promise<RequestDiagnosisOutput> {
    return this.diagnosisService.requestDiagnosis(
      doctorId,
      requestDiagnosisInput,
      user,
    );
  }

  @Role(['USER'])
  @Get('')
  loadDiagnosis(@AuthUser() user: User): Promise<LoadDiagnosisOutput> {
    return this.diagnosisService.loadDiagnosis(user);
  }

  @Role(['DOCTOR'])
  @Post('/doctor/diagnosis/:id')
  prescribe(
    @AuthUser() user: User,
    @Body('id') prescribeInput: PrescribeInput,
    @Param('id') diagnosisId: number,
  ): Promise<PrescribeOutput> {
    return this.diagnosisService.prescribe(user, prescribeInput, diagnosisId);
  }
}
