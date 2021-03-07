import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diagnosis, User } from '../../../domains/domains';
import { Repository } from 'typeorm';

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Diagnosis)
    private readonly diagnosis: Repository<Diagnosis>,
  ) {}

  async getAll() {
    const diagnoses = await this.diagnosis.find();

    console.log(diagnoses);
  }
}
