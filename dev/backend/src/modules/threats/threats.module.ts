import { Module } from '@nestjs/common';
import { ThreatsService } from './threats.service';
import { ThreatsGateway } from './threats.gateway';
import { HeroesModule } from '../heroes/heroes.module';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [HeroesModule, HistoryModule],
  providers: [ThreatsGateway, ThreatsService],
})
export class ThreatsModule {}
