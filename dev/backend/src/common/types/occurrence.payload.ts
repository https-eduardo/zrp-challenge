import { ThreatRank } from '@prisma/client';
import { Coordinates } from './coordinates';

interface MonsterInfo {
  name: string;
  url: string;
  description: string;
}

export interface ThreatOccurence {
  location: Coordinates[];
  dangerLevel: ThreatRank;
  monster: MonsterInfo;
}
