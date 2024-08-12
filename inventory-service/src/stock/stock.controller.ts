import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { MessagePattern } from '@nestjs/microservices';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  @MessagePattern('createStock')
  async createStock(@Body() createStockDto: CreateStockDto) {
    return await this.stockService.createStock(createStockDto);
  }

  @Get()
  @MessagePattern('getAllStock')
  async getAllStock(@Query() page: number = 1, @Query() limit: number = 100) {
    return await this.stockService.getAllStock(page, limit);
  }

  @Get(':id')
  @MessagePattern('getStock')
  async getStock(@Param('id') stockId: string) {
    return await this.stockService.getStock(stockId);
  }

  @Patch(':id')
  @MessagePattern('updateStock')
  async updateStock(
    @Param('id') stockId: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return await this.stockService.updateStock(stockId, updateStockDto);
  }
  @Get('search')
  @MessagePattern('searchStock')
  async searchStock(@Query() searchTerm: string) {
    return await this.stockService.searchStock(searchTerm);
  }
}
