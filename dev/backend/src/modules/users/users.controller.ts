import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { JwtUserPayload } from 'src/common/types/jwt.payload';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully registered',
  })
  @ApiResponse({
    status: 400,
    description: 'Could not create user',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.service.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get user info' })
  @ApiResponse({
    status: 200,
    description: 'User info retrieved',
  })
  @ApiResponse({ status: 401, description: 'User not authenticated' })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@User() user: JwtUserPayload) {
    return user;
  }
}
