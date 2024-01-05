import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class LoginDto extends OmitType(PartialType(CreateUserDto), ['name']) {}
