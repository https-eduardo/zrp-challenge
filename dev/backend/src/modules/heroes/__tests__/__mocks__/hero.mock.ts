import { HeroRank, HeroStatus } from '@prisma/client';

export const getMockHero = (lat?: number, lng?: number) => {
  return {
    name: 'mockheroname',
    imageUrl: 'http://www.imagesmocked.mock/mockheroimage.png',
    rank: HeroRank.S,
    status: HeroStatus.AVAILABLE,
    latitude: lat ?? 10.514,
    longitude: lng ?? 9.1423,
  };
};
