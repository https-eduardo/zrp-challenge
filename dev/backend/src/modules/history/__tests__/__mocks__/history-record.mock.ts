import { ThreatRank } from '@prisma/client';

export const mockHistoryRecord = {
  threatRank: ThreatRank.God,
  threatName: 'Mock Threat',
  heroes: [1],
  finishDate: new Date(),
};
