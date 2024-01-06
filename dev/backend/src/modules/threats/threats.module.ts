import { Module } from '@nestjs/common';
import { ThreatsService } from './threats.service';
import { ThreatsGateway } from './threats.gateway';

@Module({
  providers: [ThreatsGateway, ThreatsService],
})
export class ThreatsModule {}
