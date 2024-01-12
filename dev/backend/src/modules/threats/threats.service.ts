import { Injectable } from '@nestjs/common';
import { ThreatOccurence } from '../../common/types/occurrence.payload';
import { HeroesService } from '../heroes/heroes.service';
import { ThreatAllocation } from '../../common/types/threat-allocation.type';
import { ALLOCATIONS } from './threats.allocation';
import { HistoryService } from '../history/history.service';

@Injectable()
export class ThreatsService {
  constructor(
    private readonly heroesService: HeroesService,
    private readonly historyService: HistoryService,
  ) {}

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
    const { id } = await this.heroesService.allocateHeroes(
      allocatedHeroes,
      occurrence,
      duration,
    );

    const threatAllocation: ThreatAllocation = {
      id,
      heroes: allocatedHeroes,
      duration,
      position: occurrence.location[0],
      threatName: occurrence.monster.name,
      threatRank: occurrence.dangerLevel,
    };

    return threatAllocation;
  }

  async getActiveAllocations() {
    const notFinishedAllocations =
      await this.historyService.findNotFinishedRecords();

    const activeAllocations = notFinishedAllocations.map((record) => {
      const secondsLeft =
        (record.finishDate.getTime() - record.createdAt.getTime()) / 1000;
      return {
        id: record.id,
        duration: secondsLeft,
        heroes: record.heroes,
        position: {
          lat: record.heroes[0].latitude,
          lng: record.heroes[0].longitude,
        },
        threatName: record.threatName,
        threatRank: record.threatRank,
      } as ThreatAllocation;
    });
    return activeAllocations;
  }
}
