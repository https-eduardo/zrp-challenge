import { HeroRank, ThreatRank } from '@prisma/client';

export const ALLOCATIONS = {
  [ThreatRank.God]: { duration: { min: 60 * 5, max: 60 * 10 }, power: 8 },
  [ThreatRank.Dragon]: { duration: { min: 60 * 2, max: 60 * 5 }, power: 4 },
  [ThreatRank.Tiger]: { duration: { min: 10, max: 20 }, power: 2 },
  [ThreatRank.Wolf]: { duration: { min: 1, max: 2 }, power: 1 },
};

export const HEROES_PRIORITIES = {
  [HeroRank.S]: { power: 8 },
  [HeroRank.A]: { power: 4 },
  [HeroRank.B]: { power: 2 },
  [HeroRank.C]: { power: 1 },
};
