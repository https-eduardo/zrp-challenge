import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class HeroesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHeroDto: CreateHeroDto) {
    try {
      return await this.prisma.hero.create({ data: createHeroDto });
    } catch {
      throw new BadRequestException();
    }
  }

  async findMany(pagination?: PaginationQueryDto) {
    try {
      const { limit, page } = pagination;
      const transaction = await this.prisma.$transaction([
        this.prisma.hero.count(),
        this.prisma.hero.findMany({
          skip: limit && page ? limit * (page - 1) : 0,
          take: limit,
        }),
      ]);
      const total = transaction[0];
      const data = transaction[1];
      const totalPages = limit ? total / limit : 1;

      return { data, total, totalPages };
    } catch (ex) {
      console.log(ex);
      throw new BadRequestException();
    }
  }

  async updateOne(id: number, updateHeroDto: UpdateHeroDto) {
    try {
      return await this.prisma.hero.update({
        where: { id },
        data: updateHeroDto,
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.hero.findUnique({ where: { id } });
    } catch {
      throw new NotFoundException();
    }
  }

  async deleteOne(id: number) {
    try {
      return await this.prisma.hero.delete({ where: { id } });
    } catch {
      throw new BadRequestException();
    }
  }
}
