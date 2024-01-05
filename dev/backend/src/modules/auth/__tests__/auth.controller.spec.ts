import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { getMockUser } from '../../users/__tests__/__mocks__/user.mock';
import { Response } from 'express';
import { mockLoginData } from './__mocks__/login-data.mock';

describe('AuthController', () => {
  let controller: AuthController;

  const mockResponse = {
    cookie: jest.fn().mockReturnValue(mockLoginData.accessToken),
    clearCookie: jest.fn().mockReturnValue(null),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(mockLoginData),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should authenticate user', async () => {
    await controller.login(getMockUser(), mockResponse);

    expect(mockResponse.cookie).toHaveBeenCalledTimes(1);
    expect(mockResponse.cookie).toHaveBeenCalledWith(
      'accessToken',
      mockLoginData.accessToken,
      { httpOnly: true },
    );
  });

  it('should logout user', async () => {
    await controller.logout(mockResponse);

    expect(mockResponse.clearCookie).toHaveBeenCalledTimes(1);
    expect(mockResponse.clearCookie).toHaveBeenCalledWith('accessToken');
  });
});
