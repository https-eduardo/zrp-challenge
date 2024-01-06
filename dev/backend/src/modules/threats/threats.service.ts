import { Injectable } from '@nestjs/common';
import { ThreatOccurence } from '../../common/types/occurrence.payload';
import { HeroesService } from '../heroes/heroes.service';

@Injectable()
export class ThreatsService {
  constructor(private readonly heroesService: HeroesService) {}

  async handleOccurrence(occurrence: ThreatOccurence) {
    const closeHeroes =
      await this.heroesService.getOccurrenceClosestHeroes(occurrence);
    const allocatedHeroes = this.heroesService.getHeroesAllocationCombination(
      closeHeroes,
      occurrence,
    );
    console.log(allocatedHeroes);
  }
}
