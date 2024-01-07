import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createNewRecord(createRecordDto: CreateRecordDto) {
    return await this.prisma.history.create({ data: createRecordDto });
  }

  async findManyRecords(pagination: PaginationQueryDto) {
    try {
      const { limit, page } = pagination;
      const transaction = await this.prisma.$transaction([
        this.prisma.history.count(),
        this.prisma.history.findMany({
          skip: limit && page ? limit * (page - 1) : 0,
          take: limit,
        }),
      ]);
      const total = transaction[0];
      const data = transaction[1];
      const totalPages = limit ? total / limit : 1;

      return { data, total, totalPages };
    } catch {
      throw new BadRequestException();
    }
  }
}
