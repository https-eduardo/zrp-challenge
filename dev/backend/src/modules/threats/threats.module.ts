import { Module } from '@nestjs/common';
import { ThreatsService } from './threats.service';
import { ThreatsGateway } from './threats.gateway';
import { HeroesModule } from '../heroes/heroes.module';

@Module({
  imports: [HeroesModule],
  providers: [ThreatsGateway, ThreatsService],
})
export class ThreatsModule {}
