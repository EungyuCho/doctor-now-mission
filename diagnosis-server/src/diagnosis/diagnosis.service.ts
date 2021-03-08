import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diagnosis, User } from '../../../domains/domains';
import { Repository } from 'typeorm';
import { GetDoctorsOutput } from './dtos/get-doctor.dto';
import { UserRole } from '../../../domains/domains/user.entity';
import {
  RequestDiagnosisInput,
  RequestDiagnosisOutput,
} from './dtos/request-diagnosis.dto';

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Diagnosis)
    private readonly diagnosis: Repository<Diagnosis>,
  ) {}

  async getDoctors(): Promise<GetDoctorsOutput> {
    try {
      const doctors = await this.users.find({
        where: {
          role: UserRole.DOCTOR,
        },
      });
      return {
        ok: true,
        doctors,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load doctors',
      };
    }
  }

  async requestDiagnosis(
    doctorId: number,
    { symptom }: RequestDiagnosisInput,
    user: User,
  ): Promise<RequestDiagnosisOutput> {
    try {
      const doctor = await this.users.findOne({ id: doctorId });
      if (!doctor) {
        return {
          ok: false,
          error: 'Doctor not exists',
        };
      }

      if (doctor.role !== UserRole.DOCTOR) {
        return {
          ok: false,
          error: 'Request is not doctor',
        };
      }

      const diagnosis = this.diagnosis.create({ symptom, user, doctorId });

      await this.diagnosis.save(diagnosis);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Diagnosis request is failed',
      };
    }
  }
}
