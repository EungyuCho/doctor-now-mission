import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from '../../../domains/domains';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRole } from '../../../domains/domains/user.entity';
import { JwtService } from '../jwt/jwt.service';

const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  findOneOrFail: jest.fn(),
});

const mockJwtService = {
  sign: jest.fn(() => 'token'),
  verify: jest.fn(),
};

type MockRepository<T = any> = Partial<
  Record<keyof Repository<User>, jest.Mock>
>;

describe('UserService', () => {
  let service: UserService;
  let jwtService: JwtService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
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

    it('it should fail on exception', async () => {
      userRepository.findOne.mockRejectedValue(new Error());
      const result = await service.createAccount(createAccountArg);
      expect(result).toEqual({ ok: false, error: 'Could not Create Account' });
    });

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
        role: 'DOCTOR',
      };
      userRepository.findOne.mockResolvedValue(undefined);
      userRepository.create.mockReturnValue(roleChangedAccount);

      const result = await service.createAccount({
        ...createAccountArg,
        userRole: 'DOCTOR',
      });

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

  describe('login', () => {
    const loginArgs = {
      email: 'cho2304@naver.com',
      password: '1111',
    };

    it('it should fail on exception', async () => {
      userRepository.findOne.mockRejectedValue(new Error());
      const result = await service.login(loginArgs);
      expect(result).toEqual({ ok: false, error: 'Could not login' });
    });

    it('it should fail if email not exists', async () => {
      userRepository.findOne.mockResolvedValue(undefined);
      const result = await service.login(loginArgs);
      expect(result).toEqual({ ok: false, error: 'Email not exists' });
    });

    it('it should fail if password is wrong', async () => {
      userRepository.findOne.mockResolvedValue({
        email: loginArgs.email,
        password: 'wrong',
        checkPassword: jest.fn(() => Promise.resolve(false)),
      });

      const result = await service.login(loginArgs);
      expect(result).toEqual({ ok: false, error: 'Password is wrong' });
    });

    it('should return token on success', async () => {
      userRepository.findOne.mockResolvedValue({
        id: 1,
        email: loginArgs.email,
        password: loginArgs.password,
        checkPassword: jest.fn(() => Promise.resolve(true)),
      });

      const result = await service.login(loginArgs);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toHaveBeenCalledWith(loginArgs.email);
      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(jwtService.sign).toHaveBeenCalledWith(1);

      expect(result).toEqual({ ok: true, token: 'token' });
    });
  });

  describe('findById', () => {
    const id = {
      id: 1,
    };

    it('it should fail on exception', async () => {
      userRepository.findOneOrFail.mockRejectedValue(new Error());
      const result = await service.findById(id);

      expect(result).toEqual({ ok: false, error: 'User not found' });
    });

    it('it should return user on success', async () => {
      const user = {
        id: 1,
        email: 'cho2304@naver.com',
        role: UserRole.USER,
      };
      userRepository.findOneOrFail.mockResolvedValue(user);
      const result = await service.findById(id);

      expect(userRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(userRepository.findOneOrFail).toHaveBeenCalledWith(id);

      expect(result).toEqual({ ok: true, user });
    });
  });
});
