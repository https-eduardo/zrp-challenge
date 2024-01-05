import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import {
  getMockUser,
  getPasswordHashedUser,
} from '../../users/__tests__/__mocks__/user.mock';
import { JwtService } from '@nestjs/jwt';
import { mockLoginData } from './__mocks__/login-data.mock';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue(getPasswordHashedUser()),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue(mockLoginData.accessToken),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should authenticate user', async () => {
    const { email, password } = getMockUser();
    const { accessToken } = await service.login({ email, password });

    expect(accessToken).toBeDefined();
    expect(accessToken).toBe(mockLoginData.accessToken);
  });
});
