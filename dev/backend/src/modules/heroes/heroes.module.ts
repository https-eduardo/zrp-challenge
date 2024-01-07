import { Module } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [PrismaModule, HistoryModule],
  controllers: [HeroesController],
  providers: [HeroesService],
  exports: [HeroesService],
})
export class HeroesModule {}
