import { Test, TestingModule } from '@nestjs/testing';
import { HeroesService } from '../heroes.service';
import { PrismaService } from '../../prisma/prisma.service';
import { getMockHero } from './__mocks__/hero.mock';
import { threatOccurence } from '../../threats/__tests__/__mocks__/threat-occurence.mock';
import { Hero } from '@prisma/client';
import { HistoryService } from '../../history/history.service';

describe('HeroesService', () => {
  let service: HeroesService;
  let historyService: HistoryService;
  let closeHeroes: Hero[];
  const mockHero = getMockHero();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroesService,
        {
          provide: HistoryService,
          useValue: {
            createNewRecord: jest.fn(),
          },
        },
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
    historyService = module.get<HistoryService>(HistoryService);
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

  it('should retrieve closest heroes to the occurrence', async () => {
    const mockData = { data: [mockHero, getMockHero(10, 8)] } as any;
    jest.spyOn(service, 'findMany').mockResolvedValue(mockData);
    closeHeroes = await service.getOccurrenceClosestHeroes(threatOccurence);

    expect(closeHeroes).toHaveLength(2);
    expect(closeHeroes[0].longitude).toBe(8);
    expect(closeHeroes[1].latitude).toBe(mockHero.latitude);
  });

  it('should retrieve hero/heroes to be allocated to an occurrence', () => {
    const allocatedHeroes = service.getHeroesAllocationCombination(
      closeHeroes,
      threatOccurence,
    );

    expect(allocatedHeroes).toHaveLength(1);
    expect(closeHeroes[0].longitude).toBe(8);
  });

  it('should allocate heroes in an occurrence', async () => {
    jest.spyOn(service, 'updateHeroStatus');

    await service.allocateHero(
      { id: 1, ...mockHero } as Hero,
      threatOccurence,
      10,
    );

    expect(historyService.createNewRecord).toHaveBeenCalledTimes(1);
  });
});
