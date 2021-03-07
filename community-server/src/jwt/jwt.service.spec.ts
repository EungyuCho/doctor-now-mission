import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from './jwt.service';
import * as jwt from 'jsonwebtoken';
import { JWT_OPTIONS } from '../../../commons/commons/common.constants';
import any = jasmine.any;

const KEY = 'testing_key';
const EXPIRE_LIMIT = 1;
const TOKEN = 'TOKEN';
const USER_ID = 1;

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(() => TOKEN),
    verify: jest.fn(() => ({ id: USER_ID })),
  };
});

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        {
          provide: JWT_OPTIONS,
          useValue: {
            jwtSecretKey: KEY,
            accessTokenExpire: EXPIRE_LIMIT,
          },
        },
      ],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sign', () => {
    it('should return a sign token', () => {
      const token = service.sign(USER_ID);
      expect(jwt.sign).toHaveBeenCalledTimes(1);
      expect(jwt.sign).toHaveBeenCalledWith(any(Object), KEY);
      expect(typeof token).toBe('string');
      expect(token).toEqual(TOKEN);
    });
  });

  describe('verify', () => {
    it('should return the decoded token', () => {
      const decodedToken = service.verify(TOKEN);
      expect(decodedToken).toEqual({ id: USER_ID });
      expect(jwt.verify).toHaveBeenCalledTimes(1);
      expect(jwt.verify).toHaveBeenCalledWith(TOKEN, KEY);
    });
  });
});
