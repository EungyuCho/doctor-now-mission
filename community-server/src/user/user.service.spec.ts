import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from '../../../domains/domains';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});

type MockRepository<T = any> = Partial<
  Record<keyof Repository<User>, jest.Mock>
>;

describe('UserService', () => {
  let service: UserService;
  let usersRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
