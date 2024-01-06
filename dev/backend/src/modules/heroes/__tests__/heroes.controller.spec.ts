import { Test, TestingModule } from '@nestjs/testing';
import { HeroesController } from '../heroes.controller';
import { HeroesService } from '../heroes.service';
import { getMockHero } from './__mocks__/hero.mock';

describe('HeroesController', () => {
  let controller: HeroesController;
  let service: HeroesService;
  const mockHero = getMockHero();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroesController],
      providers: [
        {
          provide: HeroesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockHero),
            findOne: jest.fn().mockResolvedValue(mockHero),
            findMany: jest.fn().mockResolvedValue({ data: [mockHero] }),
            updateOne: jest.fn().mockResolvedValue(mockHero),
            deleteOne: jest.fn().mockResolvedValueOnce(mockHero),
          },
        },
      ],
    }).compile();

    controller = module.get<HeroesController>(HeroesController);
    service = module.get<HeroesService>(HeroesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new hero', async () => {
    const hero = await controller.create(mockHero);

    expect(hero.name).toBe(mockHero.name);
    expect(service.create).toHaveBeenCalledTimes(1);
  });

  it('should find a hero', async () => {
    const hero = await controller.findOne({ heroId: 1 });

    expect(hero.name).toBe(mockHero.name);
    expect(service.findOne).toHaveBeenCalledTimes(1);
  });

  it('should find many heroes', async () => {
    const hero = await controller.findMany({});

    expect(hero.data[0].name).toBe(mockHero.name);
    expect(service.findMany).toHaveBeenCalledTimes(1);
  });

  it('should update a hero', async () => {
    mockHero.name = 'mockheronameupdated';
    const hero = await controller.updateOne({ heroId: 1 }, mockHero);

    expect(hero.name).toBe(mockHero.name);
    expect(service.updateOne).toHaveBeenCalledTimes(1);
  });

  it('should delete a hero', async () => {
    const hero = await controller.deleteOne({ heroId: 1 });

    expect(hero.name).toBe(mockHero.name);
    expect(service.deleteOne).toHaveBeenCalledTimes(1);
  });
});
