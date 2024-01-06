import { Test, TestingModule } from '@nestjs/testing';
import { HeroesService } from '../heroes.service';
import { PrismaService } from '../../prisma/prisma.service';
import { getMockHero } from './__mocks__/hero.mock';

describe('HeroesService', () => {
  let service: HeroesService;
  const mockHero = getMockHero();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroesService,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn().mockResolvedValueOnce([1, [mockHero]]),
            hero: {
              create: jest.fn().mockResolvedValue(mockHero),
              count: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn().mockResolvedValue(mockHero),
              update: jest.fn().mockResolvedValue(mockHero),
              delete: jest.fn().mockResolvedValueOnce(mockHero),
            },
          },
        },
      ],
    }).compile();

    service = module.get<HeroesService>(HeroesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new hero', async () => {
    const hero = await service.create(mockHero);

    expect(hero.name).toBe(mockHero.name);
  });

  it('should find a hero', async () => {
    const hero = await service.findOne(1);

    expect(hero.name).toBe(mockHero.name);
  });

  it('should find many heroes', async () => {
    const hero = await service.findMany({ limit: 1, page: 1 });

    expect(hero.data[0].name).toBe(mockHero.name);
  });

  it('should update a hero', async () => {
    mockHero.name = 'mockheronameupdated';
    const hero = await service.updateOne(1, mockHero);

    expect(hero.name).toBe(mockHero.name);
  });

  it('should delete a hero', async () => {
    const hero = await service.deleteOne(1);

    expect(hero.name).toBe(mockHero.name);
  });
});
