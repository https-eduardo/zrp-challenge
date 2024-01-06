import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FindHeroByIdDto {
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  heroId: number;
}
