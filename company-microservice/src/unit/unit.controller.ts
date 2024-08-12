import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  @MessagePattern('createUnit')
  async createUnit(@Body() createUnitDto: CreateUnitDto) {
    return await this.unitService.createUnit(createUnitDto);
  }

  @Get()
  @MessagePattern('getAllUnit')
  async getAllUnit(@Query() page: number, limit: number) {
    return await this.unitService.getAllUnit(page, limit);
  }
  @Get('search')
  @MessagePattern('searchUnit')
  async searchUnits(@Query() search: string) {
    return await this.unitService.searchUnits(search);
  }
}
