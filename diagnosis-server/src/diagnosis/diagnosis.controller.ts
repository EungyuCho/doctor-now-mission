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
import { LoadDoctorDiagnosisOutput } from './dtos/doctor-load-diagnosis.dto';
import { PrescribeInput, PrescribeOutput } from './dtos/prescribe.dto';
import { TOKEN_KEY } from '../../../commons/commons/common.constants';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
@Controller('api/diagnosis')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @ApiHeader({ name: TOKEN_KEY, description: 'jwt token verify(User Only)' })
  @ApiResponse({ type: GetDoctorsOutput, status: 200 })
  @Role(['USER'])
  @Get('/doctor')
  getDoctors(): Promise<GetDoctorsOutput> {
    return this.diagnosisService.getDoctors();
  }

  @ApiHeader({ name: TOKEN_KEY, description: 'jwt token verify(User Only)' })
  @ApiResponse({ type: RequestDiagnosisOutput, status: 201 })
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

  @ApiHeader({ name: TOKEN_KEY, description: 'jwt token verify(User Only)' })
  @ApiResponse({ type: LoadDiagnosisOutput, status: 200 })
  @Role(['USER'])
  @Get('')
  loadDiagnosis(@AuthUser() user: User): Promise<LoadDiagnosisOutput> {
    return this.diagnosisService.loadDiagnosis(user);
  }

  @ApiHeader({ name: TOKEN_KEY, description: 'jwt token verify(Doctor Only)' })
  @ApiResponse({ type: LoadDoctorDiagnosisOutput, status: 200 })
  @Role(['DOCTOR'])
  @Get('/doctor/diagnosis')
  loadDoctorDiagnosis(
    @AuthUser() user: User,
  ): Promise<LoadDoctorDiagnosisOutput> {
    return this.diagnosisService.loadDoctorDiagnosis(user);
  }

  @ApiHeader({ name: TOKEN_KEY, description: 'jwt token verify(Doctor Only)' })
  @ApiResponse({ type: PrescribeOutput, status: 201 })
  @Role(['DOCTOR'])
  @Post('/doctor/diagnosis/:id')
  prescribe(
    @AuthUser() user: User,
    @Body('') prescribeInput: PrescribeInput,
    @Param('id') diagnosisId: number,
  ): Promise<PrescribeOutput> {
    return this.diagnosisService.prescribe(user, prescribeInput, diagnosisId);
  }
}
