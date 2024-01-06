import { HeroRank } from '@prisma/client';

export const getMockHero = () => {
  return {
    name: 'mockheroname',
    imageUrl: 'http://www.imagesmocked.mock/mockheroimage.png',
    rank: HeroRank.S,
    latitude: 10.514,
    longitude: 9.1423,
  };
};
