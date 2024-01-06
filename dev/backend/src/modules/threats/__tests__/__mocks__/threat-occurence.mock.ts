import { ThreatOccurence } from 'src/common/types/occurrence.payload';

export const threatOccurence: ThreatOccurence = {
  dangerLevel: 'God',
  location: [{ lat: 10, lng: 8 }],
  monster: {
    name: 'Monster mock',
    description: 'descriptionmock',
    url: 'http://mockmonster.mock/mockmonster.png',
  },
};
