import { Injectable } from '@nestjs/common';
import { ThreatOccurence } from '../../common/types/occurrence.payload';
import { HeroesService } from '../heroes/heroes.service';
import { ThreatAllocation } from 'src/common/types/threat-allocation.type';
import { ALLOCATIONS } from './threats.allocation';

@Injectable()
export class ThreatsService {
  constructor(private readonly heroesService: HeroesService) {}

  private getDurationOfAllocation(occurrence: ThreatOccurence) {
    const { min, max } = ALLOCATIONS[occurrence.dangerLevel].duration;
    return Math.random() * (max - min + 1) + min;
  }

  async handleOccurrence(occurrence: ThreatOccurence) {
    const closeHeroes =
      await this.heroesService.getOccurrenceClosestHeroes(occurrence);
    const allocatedHeroes = this.heroesService.getHeroesAllocationCombination(
      closeHeroes,
      occurrence,
    );
    if (!allocatedHeroes || allocatedHeroes.length === 0) return null;

    const duration = this.getDurationOfAllocation(occurrence);
    const threatAllocation: ThreatAllocation = {
      heroes: allocatedHeroes,
      duration,
      position: occurrence.location[0],
      threatName: occurrence.monster.name,
      threatRank: occurrence.dangerLevel,
    };
    allocatedHeroes.forEach((hero) => {
      this.heroesService.allocateHero(hero, occurrence, duration);
    });

    return threatAllocation;
  }
}
