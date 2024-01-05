import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = bcrypt.hashSync(createUserDto.password);

      const user = await this.prisma.user.create({
        data: { ...createUserDto, password: hashedPassword },
      });
      delete user.password;

      return user;
    } catch {
      throw new BadRequestException();
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      delete user.password;

      return user;
    } catch {
      throw new NotFoundException();
    }
  }
}
