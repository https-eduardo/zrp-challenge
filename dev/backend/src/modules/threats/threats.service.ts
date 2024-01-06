import { Injectable } from '@nestjs/common';
import { ThreatOccurence } from 'src/common/types/occurrence.payload';

@Injectable()
export class ThreatsService {
  constructor() {}

  async handleOccurrence(occurrence: ThreatOccurence) {
    console.log(occurrence.monster);
  }
}
