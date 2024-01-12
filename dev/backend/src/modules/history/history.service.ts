import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHistoryRecordDto } from './dto/create-history-record.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createNewRecord(createRecordDto: CreateHistoryRecordDto) {
    const heroesConnections = createRecordDto.heroes.map((id) => ({ id }));

    return await this.prisma.history.create({
      data: { ...createRecordDto, heroes: { connect: heroesConnections } },
    });
  }

  async findManyRecords(pagination: PaginationQueryDto) {
    try {
      const { limit, page } = pagination;
      const transaction = await this.prisma.$transaction([
        this.prisma.history.count(),
        this.prisma.history.findMany({
          skip: limit && page ? limit * (page - 1) : 0,
          take: limit,
          include: { heroes: true },
          orderBy: { createdAt: 'desc' },
        }),
      ]);
      const total = transaction[0];
      const data = transaction[1];
      const totalPages = limit ? Math.ceil(total / limit) : 1;

      return { data, total, totalPages };
    } catch {
      throw new BadRequestException();
    }
  }
}
