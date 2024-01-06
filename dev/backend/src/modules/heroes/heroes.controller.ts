import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FindHeroByIdDto } from './dto/find-hero.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@ApiTags('Heroes')
@Controller('heroes')
export class HeroesController {
  constructor(private readonly service: HeroesService) {}

  @ApiOperation({ summary: 'Create a new hero' })
  @ApiResponse({ status: 201, description: 'Hero successfully created' })
  @ApiResponse({ status: 400, description: 'Could not create hero' })
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createHeroDto: CreateHeroDto) {
    return await this.service.create(createHeroDto);
  }

  @ApiOperation({ summary: 'Get all heroes' })
  @ApiResponse({ status: 200, description: 'Heroes successfully retrieved' })
  @ApiResponse({ status: 400, description: 'Could not retrieve heroes data' })
  @Get()
  @UseGuards(JwtAuthGuard)
  async findMany(@Query() paginationQueryDto: PaginationQueryDto) {
    return await this.service.findMany(paginationQueryDto);
  }

  @ApiOperation({ summary: "Get a hero by it's id" })
  @ApiResponse({ status: 200, description: 'Hero info successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Could not find hero' })
  @Get(':heroId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param() { heroId }: FindHeroByIdDto) {
    return await this.service.findOne(heroId);
  }

  @ApiOperation({ summary: "Update a hero by it's id" })
  @ApiResponse({ status: 200, description: 'Hero successfully updated' })
  @ApiResponse({ status: 400, description: 'Could not update hero' })
  @Patch(':heroId')
  @UseGuards(JwtAuthGuard)
  async updateOne(
    @Param() { heroId }: FindHeroByIdDto,
    @Body() updateHeroDto: UpdateHeroDto,
  ) {
    return await this.service.updateOne(heroId, updateHeroDto);
  }

  @ApiOperation({ summary: "Delete a hero by it's id" })
  @ApiResponse({ status: 200, description: 'Hero successfully deleted' })
  @ApiResponse({ status: 400, description: 'Could not delete hero' })
  @Delete(':heroId')
  @UseGuards(JwtAuthGuard)
  async deleteOne(@Param() { heroId }: FindHeroByIdDto) {
    return await this.service.deleteOne(heroId);
  }
}
