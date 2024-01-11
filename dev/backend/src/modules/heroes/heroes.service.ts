import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { Coordinates } from 'src/common/types/coordinates';
import { ThreatOccurence } from 'src/common/types/occurrence.payload';
import { Hero, HeroStatus } from '@prisma/client';
import { ALLOCATIONS, HEROES_PRIORITIES } from '../threats/threats.allocation';
import { HistoryService } from '../history/history.service';
import { CreateHistoryRecordDto } from '../history/dto/create-history-record.dto';

@Injectable()
export class HeroesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly historyService: HistoryService,
  ) {}

  async create(createHeroDto: CreateHeroDto) {
    try {
      return await this.prisma.hero.create({ data: createHeroDto });
    } catch {
      throw new BadRequestException();
    }
  }

  async findMany(pagination: PaginationQueryDto) {
    try {
      const { limit, page } = pagination;
      const transaction = await this.prisma.$transaction([
        this.prisma.hero.count(),
        this.prisma.hero.findMany({
          skip: limit && page ? limit * (page - 1) : 0,
          take: limit,
        }),
      ]);
      const total = transaction[0];
      const data = transaction[1];
      const totalPages = limit ? Math.floor(total / limit) : 1;

      return { data, total, totalPages };
    } catch {
      throw new BadRequestException();
    }
  }

  async updateOne(id: number, updateHeroDto: UpdateHeroDto) {
    try {
      return await this.prisma.hero.update({
        where: { id },
        data: updateHeroDto,
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.hero.findUnique({ where: { id } });
    } catch {
      throw new NotFoundException();
    }
  }

  async deleteOne(id: number) {
    try {
      return await this.prisma.hero.delete({ where: { id } });
    } catch {
      throw new BadRequestException();
    }
  }

  async getOccurrenceClosestHeroes({
    location: occurenceCoords,
  }: ThreatOccurence) {
    const { data: heroes } = await this.findMany({});

    return heroes.sort((a, b) => {
      const coordinatesA: Coordinates = {
        lat: a.latitude,
        lng: a.longitude,
      };

      const coordinatesB: Coordinates = {
        lat: b.latitude,
        lng: b.longitude,
      };
      const distanceA = this.getCoordinatesDistance(
        coordinatesA,
        occurenceCoords[0],
      );

      const distanceB = this.getCoordinatesDistance(
        coordinatesB,
        occurenceCoords[0],
      );

      return distanceA - distanceB;
    });
  }

  async updateHeroStatus(id: number, status: HeroStatus) {
    return await this.prisma.hero.update({
      where: { id },
      data: { status },
    });
  }

  async allocateHeroes(
    heroes: Hero[],
    occurrence: ThreatOccurence,
    duration: number,
  ) {
    for (const hero of heroes) {
      this.updateHeroStatus(hero.id, HeroStatus.UNAVAILABLE);

      setTimeout(() => {
        this.updateHeroStatus(hero.id, HeroStatus.AVAILABLE);
      }, duration * 1000);
    }

    const finishDate = new Date();
    finishDate.setSeconds(finishDate.getSeconds() + duration);

    const historyRecord: CreateHistoryRecordDto = {
      heroes: heroes.map(({ id }) => id),
      finishDate,
      threatName: occurrence.monster.name,
      threatRank: occurrence.dangerLevel,
    };

    return await this.historyService.createNewRecord(historyRecord);
  }

  private isPriorityHero(hero: Hero, occurrence: ThreatOccurence) {
    return (
      HEROES_PRIORITIES[hero.rank].power ===
      ALLOCATIONS[occurrence.dangerLevel].power
    );
  }

  private isHeroLowerRank(hero: Hero, occurrence: ThreatOccurence) {
    return (
      HEROES_PRIORITIES[hero.rank].power <
      ALLOCATIONS[occurrence.dangerLevel].power
    );
  }

  getHeroesAllocationCombination(
    closeHeroes: Hero[],
    occurrence: ThreatOccurence,
  ) {
    const duo = [];
    let combination: Hero[] = [];
    for (const hero of closeHeroes) {
      if (hero.status !== HeroStatus.AVAILABLE) continue;
      if (
        this.isPriorityHero(hero, occurrence) ||
        !this.isHeroLowerRank(hero, occurrence)
      ) {
        combination.push(hero);
        break;
      }

      if (duo.length === 0) {
        duo.push(hero);
      } else {
        combination = [hero, ...duo];
        break;
      }
    }

    return combination;
  }

  private getCoordinatesDistance(
    coords: Coordinates,
    targetCoords: Coordinates,
  ) {
    if (coords.lat == targetCoords.lat && coords.lng == targetCoords.lng)
      return 0;

    const radlat1 = (Math.PI * coords.lat) / 180;
    const radlat2 = (Math.PI * targetCoords.lat) / 180;

    const theta = coords.lng - targetCoords.lng;
    const radtheta = (Math.PI * theta) / 180;

    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    if (dist > 1) dist = 1;

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;

    return dist;
  }

  async markAllHeroesAsAvailable() {
    return await this.prisma.hero.updateMany({
      where: { status: HeroStatus.UNAVAILABLE },
      data: { status: HeroStatus.AVAILABLE },
    });
  }
}
