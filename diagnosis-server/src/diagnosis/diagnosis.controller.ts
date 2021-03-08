import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { GetDoctorsOutput } from './dtos/get-doctor.dto';
import { Role } from '../auth/role.decorator';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from '../../../domains/domains';
import { RequestDiagnosisInput } from './dtos/request-diagnosis.dto';

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
  ) {
    return this.diagnosisService.requestDiagnosis(
      doctorId,
      requestDiagnosisInput,
      user,
    );
  }
}
