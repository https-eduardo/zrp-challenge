import { ThreatRank } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateRecordDto {
  @IsNumber()
  heroId: number;

  @IsDate()
  finishDate: Date;

  @IsString()
  @IsNotEmpty()
  threatName: string;

  @IsEnum(ThreatRank)
  threatRank: ThreatRank;
}
