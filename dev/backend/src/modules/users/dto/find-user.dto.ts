import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class FindUserByEmailDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
