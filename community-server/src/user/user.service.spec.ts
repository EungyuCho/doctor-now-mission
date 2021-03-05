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
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CreateAccount', () => {
    const createAccountArg = {
      name: 'gyu',
      email: 'cho2304@naver.com',
      password: '1111',
      userRole: 'user',
    };

    it('should fail if role is wrong', async () => {
      const wrongAccount = {
        name: 'gyu',
        email: 'cho2304@naver.com',
        password: '1111',
        userRole: 'WRONG ROLE',
      };

      const result = await service.createAccount(wrongAccount);
      expect(result).toMatchObject({
        ok: false,
        error: 'Role must be USER OR DOCTOR',
      });
    });

    it('should fail if email already exists', async () => {
      userRepository.findOne.mockResolvedValue({
        email: 'cho2304@naver.com',
      });
      const result = await service.createAccount(createAccountArg);
      expect(result).toMatchObject({
        ok: false,
        error: 'There is a user with that email already',
      });
    });

    it('should create a new account', async () => {
      const roleChangedAccount = {
        name: 'gyu',
        email: 'cho2304@naver.com',
        password: '1111',
        role: 'USER',
      };
      userRepository.findOne.mockResolvedValue(undefined);
      userRepository.create.mockReturnValue(roleChangedAccount);

      const result = await service.createAccount(createAccountArg);

      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toHaveBeenCalledWith(
        roleChangedAccount.email,
      );

      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveBeenCalledWith(roleChangedAccount);

      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledWith(roleChangedAccount);

      expect(result).toEqual({ ok: true });
    });
  });
});
