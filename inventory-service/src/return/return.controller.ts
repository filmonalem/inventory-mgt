import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ReturnService } from './return.service';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('return')
export class ReturnController {
  constructor(private readonly returnService: ReturnService) {}

  @Post()
  @MessagePattern('createReturn')
  async createReturn(@Body() createOrderDto: CreateReturnDto) {
    return await this.returnService.createReturn(createOrderDto);
  }

  @Get()
  @MessagePattern('getAllReturn')
  async getAllReturns(
    @Query() page: number = 1,
    limit: number = 100,
    searchQuery: string,
  ) {
    return await this.returnService.getAllReturns(page, limit, searchQuery);
  }

  @Get(':id')
  @MessagePattern('getReturn')
  async getReturn(@Param('id') returnId: string) {
    return await this.returnService.getReturn(returnId);
  }

  @Patch(':id')
  @MessagePattern('updateReturn')
  async updateReturn(
    @Param('id') returnId: string,
    @Body() updateReturnDto: UpdateReturnDto,
  ) {
    return await this.returnService.updateReturn(returnId, updateReturnDto);
  }

  @Get('search')
  @MessagePattern('searchReturn')
  async searchReturn(@Query() searchTerm: string) {
    return await this.returnService.searchReturn(searchTerm);
  }
}
