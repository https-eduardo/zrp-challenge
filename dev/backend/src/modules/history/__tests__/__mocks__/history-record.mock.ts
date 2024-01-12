import { ThreatRank } from '@prisma/client';

export const mockHistoryRecord = {
  id: 1,
  threatRank: ThreatRank.God,
  threatName: 'Mock Threat',
  heroes: [1],
  finishDate: new Date(),
  createdAt: new Date('2020'),
};
