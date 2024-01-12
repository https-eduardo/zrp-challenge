import { Test, TestingModule } from '@nestjs/testing';
import { ThreatsGateway } from '../threats.gateway';
import { ThreatsService } from '../threats.service';
import { HeroesModule } from '../../heroes/heroes.module';
import { HistoryModule } from '../../history/history.module';

describe('ThreatsGateway', () => {
  let gateway: ThreatsGateway;

  beforeEach(async () => {
    jest.mock('socket.io-client');
    const module: TestingModule = await Test.createTestingModule({
      imports: [HeroesModule, HistoryModule],
      providers: [ThreatsGateway, ThreatsService],
    }).compile();

    gateway = module.get<ThreatsGateway>(ThreatsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
