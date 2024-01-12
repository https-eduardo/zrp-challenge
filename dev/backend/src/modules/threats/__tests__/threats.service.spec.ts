import { Test, TestingModule } from '@nestjs/testing';
import { ThreatsService } from '../threats.service';
import { HeroesService } from '../../heroes/heroes.service';
import { getMockHero } from '../../heroes/__tests__/__mocks__/hero.mock';
import { threatOccurence } from './__mocks__/threat-occurence.mock';
import { HistoryService } from '../../history/history.service';
import { mockHistoryRecord } from '../../history/__tests__/__mocks__/history-record.mock';

describe('ThreatsService', () => {
  let service: ThreatsService;
  let heroesService: HeroesService;
  const mockHeroes = [getMockHero()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThreatsService,
        {
          provide: HeroesService,
          useValue: {
            getOccurrenceClosestHeroes: jest.fn().mockResolvedValue(mockHeroes),
            getHeroesAllocationCombination: jest
              .fn()
              .mockReturnValue(mockHeroes),
            allocateHeroes: jest.fn().mockResolvedValue({ id: 1 }),
          },
        },
        {
          provide: HistoryService,
          useValue: {
            findNotFinishedRecords: jest
              .fn()
              .mockResolvedValue([mockHistoryRecord]),
          },
        },
      ],
    }).compile();

    service = module.get<ThreatsService>(ThreatsService);
    heroesService = module.get<HeroesService>(HeroesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should handle occurence', async () => {
    await service.handleOccurrence(threatOccurence);

    expect(heroesService.getOccurrenceClosestHeroes).toHaveBeenCalledWith(
      threatOccurence,
    );
    expect(heroesService.getHeroesAllocationCombination).toHaveBeenCalledWith(
      mockHeroes,
      threatOccurence,
    );
  });
  it('should get active allocations', async () => {
    const allocations = await service.getActiveAllocations();

    expect(allocations).toHaveLength(1);
  });
});
