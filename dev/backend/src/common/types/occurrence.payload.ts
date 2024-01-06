import { ThreatRank } from '@prisma/client';

interface ThreatLocation {
  lat: number;
  lng: number;
}

interface MonsterInfo {
  name: string;
  url: string;
  description: string;
}

export interface ThreatOccurence {
  location: ThreatLocation[];
  dangerLevel: ThreatRank;
  monster: MonsterInfo;
}
