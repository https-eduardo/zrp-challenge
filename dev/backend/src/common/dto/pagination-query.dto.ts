import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  page?: number;
}
