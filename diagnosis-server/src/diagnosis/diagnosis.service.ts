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
import { LoadDiagnosisOutput } from './dtos/load-diagnosis.dto';
import { PrescribeInput, PrescribeOutput } from './dtos/prescribe.dto';

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

  async loadDiagnosis(user: User): Promise<LoadDiagnosisOutput> {
    try {
      const diagnostics = await this.diagnosis.find({ where: { user } });
      return {
        ok: true,
        diagnostics,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load diagnosis',
      };
    }
  }

  async prescribe(
    user: User,
    { comment }: PrescribeInput,
    diagnosisId: number,
  ): Promise<PrescribeOutput> {
    try {
      const diagnosis = await this.diagnosis.findOne({ id: diagnosisId });

      if (!diagnosis) {
        return {
          ok: false,
          error: 'Could not find diagnosis',
        };
      }

      if (diagnosis.doctorId !== user.id) {
        return {
          ok: false,
          error: 'You are not assigned doctor',
        };
      }

      diagnosis.comment = comment;

      await this.diagnosis.save(diagnosis);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not prescribe',
      };
    }
  }
}
