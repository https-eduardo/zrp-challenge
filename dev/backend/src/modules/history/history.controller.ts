import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('History')
@Controller('history')
export class HistoryController {
  constructor(private readonly service: HistoryService) {}

  @ApiOperation({ summary: 'Get all history records' })
  @ApiResponse({
    status: 200,
    description: 'History records successfully retrieved',
  })
  @ApiResponse({
    status: 400,
    description: 'Could not retrieve history records',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  async findMany(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.service.findManyRecords(paginationQueryDto);
  }
}
