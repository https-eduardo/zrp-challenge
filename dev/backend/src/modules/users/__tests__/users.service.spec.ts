import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getMockUser } from './__mocks__/user.mock';
import { PrismaService } from '../../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  const mockUser = getMockUser();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn().mockResolvedValue(mockUser),
              findUnique: jest.fn().mockResolvedValue(mockUser),
            },
          },
        },
      ],
    }).compile();

    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const user = await service.create(mockUser);

    expect(user.email).toBe(mockUser.email);
    expect(user.password).not.toBeDefined();
  });

  it('should find an user by email', async () => {
    const user = await service.findByEmail(mockUser.email);

    expect(user.email).toBe(mockUser.email);
    expect(user.password).not.toBeDefined();
  });
});
