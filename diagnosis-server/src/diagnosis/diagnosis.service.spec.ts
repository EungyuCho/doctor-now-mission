import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosisService } from './diagnosis.service';
import { Diagnosis, User } from '../../../domains/domains';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRole } from '../../../domains/domains/user.entity';
import { PrescribeInput } from './dtos/prescribe.dto';

const mockRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

type UserMockRepository<T = any> = Partial<
  Record<keyof Repository<User>, jest.Mock>
>;

type DiagnosisMockRepository<T = any> = Partial<
  Record<keyof Repository<Diagnosis>, jest.Mock>
>;

describe('DiagnosisService', () => {
  let service: DiagnosisService;
  let userRepository: UserMockRepository<User>;
  let diagnosisRepository: DiagnosisMockRepository<Diagnosis>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiagnosisService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Diagnosis),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<DiagnosisService>(DiagnosisService);
    userRepository = module.get(getRepositoryToken(User));
    diagnosisRepository = module.get(getRepositoryToken(Diagnosis));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDoctors', () => {
    it('it should be fail on exception', async () => {
      userRepository.find.mockRejectedValue(new Error());
      const result = await service.getDoctors();
      expect(result).toEqual({
        ok: false,
        error: 'Could not load doctors',
      });
    });

    it('it should be return doctors', async () => {
      const doctors = [new User()];
      userRepository.find.mockResolvedValue(doctors);
      const result = await service.getDoctors();
      expect(userRepository.find).toHaveBeenCalledTimes(1);
      expect(userRepository.find).toHaveBeenCalledWith({
        where: { role: UserRole.DOCTOR },
      });
      expect(result).toEqual({
        ok: true,
        doctors,
      });
    });
  });

  describe('requestDiagnosis', () => {
    const user = new User();
    const symptom = '배가 아파요';
    const doctorId = 3;

    it('it should be fail on exception', async () => {
      userRepository.findOne.mockRejectedValue(new Error());
      const result = await service.requestDiagnosis(
        doctorId,
        { symptom },
        user,
      );
      expect(result).toEqual({
        ok: false,
        error: 'Diagnosis request is failed',
      });
    });

    it('it should be fail if doctor not exists', async () => {
      userRepository.findOne.mockResolvedValue(undefined);
      const result = await service.requestDiagnosis(
        doctorId,
        { symptom },
        user,
      );
      expect(result).toEqual({
        ok: false,
        error: 'Doctor not exists',
      });
    });

    it('it should be fail if doctorId is user id', async () => {
      const clientUser = new User();
      clientUser.role = UserRole.USER;
      userRepository.findOne.mockResolvedValue(clientUser);
      const result = await service.requestDiagnosis(
        doctorId,
        { symptom },
        user,
      );
      expect(result).toEqual({
        ok: false,
        error: 'Request is not doctor',
      });
    });

    it('it should be create diagnosis', async () => {
      const clientUser = new User();
      clientUser.role = UserRole.DOCTOR;
      const requestDiagnosisArgs = {
        user,
        doctorId,
        symptom,
      };
      userRepository.findOne.mockResolvedValue(clientUser);
      diagnosisRepository.create.mockReturnValue(requestDiagnosisArgs);
      diagnosisRepository.save.mockResolvedValue(requestDiagnosisArgs);
      const result = await service.requestDiagnosis(
        doctorId,
        { symptom },
        user,
      );

      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toHaveBeenCalledWith({ id: doctorId });

      expect(diagnosisRepository.create).toHaveBeenCalledTimes(1);
      expect(diagnosisRepository.create).toHaveBeenCalledWith({
        symptom,
        user,
        doctorId,
      });

      expect(diagnosisRepository.save).toHaveBeenCalledTimes(1);
      expect(diagnosisRepository.save).toHaveBeenCalledWith(
        requestDiagnosisArgs,
      );
      expect(result).toEqual({
        ok: true,
      });
    });
  });

  describe('loadDiagnosis', () => {
    const user = new User();
    it('should be fail on exception', async () => {
      diagnosisRepository.find.mockRejectedValue(new Error());
      const result = await service.loadDiagnosis(user);
      expect(result).toEqual({ ok: false, error: 'Could not load diagnosis' });
    });

    it('should be return diagnostics', async () => {
      const diagnosis = [new Diagnosis()];
      diagnosisRepository.find.mockResolvedValue(diagnosis);
      const result = await service.loadDiagnosis(user);
      expect(diagnosisRepository.find).toHaveBeenCalledTimes(1);
      expect(diagnosisRepository.find).toHaveBeenCalledWith({
        where: { user },
      });
      expect(result).toEqual({ ok: true, diagnosis });
    });
  });

  describe('prescribe', () => {
    const user = new User();
    user.id = 3;
    const prescribeInput: PrescribeInput = {
      comment: '약 드세요',
    };
    const diagnosisId = 3;

    it('should be fail on exception', async () => {
      diagnosisRepository.findOne.mockRejectedValue(new Error());
      const result = await service.prescribe(user, prescribeInput, diagnosisId);
      expect(result).toEqual({ ok: false, error: 'Could not prescribe' });
    });

    it('should be fail on diagnosis not exists', async () => {
      diagnosisRepository.findOne.mockResolvedValue(undefined);
      const result = await service.prescribe(user, prescribeInput, diagnosisId);
      expect(result).toEqual({ ok: false, error: 'Could not find diagnosis' });
    });

    it('should be fail on diagnosis doctor is wrong', async () => {
      const wrongDiagnosis = new Diagnosis();
      wrongDiagnosis.doctorId = 2;
      diagnosisRepository.findOne.mockResolvedValue(wrongDiagnosis);
      const result = await service.prescribe(user, prescribeInput, diagnosisId);
      expect(result).toEqual({
        ok: false,
        error: 'You are not assigned doctor',
      });
    });

    it('diagnosis comment will be change', async () => {
      const correctDiagnosis = new Diagnosis();
      correctDiagnosis.doctorId = 3;
      diagnosisRepository.findOne.mockResolvedValue(correctDiagnosis);
      diagnosisRepository.save.mockResolvedValue(true);
      const result = await service.prescribe(user, prescribeInput, diagnosisId);

      expect(diagnosisRepository.findOne).toHaveBeenCalledTimes(1);
      expect(diagnosisRepository.findOne).toHaveBeenCalledWith({
        id: diagnosisId,
      });

      correctDiagnosis.comment = prescribeInput.comment;
      expect(diagnosisRepository.save).toHaveBeenCalledTimes(1);
      expect(diagnosisRepository.save).toHaveBeenCalledWith(correctDiagnosis);

      expect(result).toEqual({
        ok: true,
      });
    });
  });

  describe('loadDoctorDiagnosis', () => {
    const user = new User();
    user.id = 2;

    it('it should be fail on exception', async () => {
      diagnosisRepository.find.mockRejectedValue(new Error());
      const result = await service.loadDoctorDiagnosis(user);
      expect(result).toEqual({ ok: false, error: 'Could not load diagnosis' });
    });

    it('it should be return diagnosis', async () => {
      const diagnosis = [new Diagnosis()];
      diagnosisRepository.find.mockResolvedValue(diagnosis);
      const result = await service.loadDoctorDiagnosis(user);

      expect(diagnosisRepository.find).toHaveBeenCalledTimes(1);
      expect(diagnosisRepository.find).toHaveBeenCalledWith({
        where: { doctorId: user.id },
      });
      expect(result).toEqual({ ok: true, diagnosis });
    });
  });
});
