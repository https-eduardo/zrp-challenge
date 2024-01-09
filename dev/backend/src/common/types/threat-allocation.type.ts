import { Hero, ThreatRank } from '@prisma/client';
import { Coordinates } from './coordinates';

export interface ThreatAllocation {
  heroes: Hero[];
  threatName: string;
  threatRank: ThreatRank;
  position: Coordinates;
  duration: number;
}