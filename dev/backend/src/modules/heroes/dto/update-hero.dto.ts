import { PartialType } from '@nestjs/swagger';
import { CreateHeroDto } from './create-hero.dto';
import { HeroStatus } from '@prisma/client';

export class UpdateHeroDto extends PartialType(CreateHeroDto) {
  status?: HeroStatus;
}
