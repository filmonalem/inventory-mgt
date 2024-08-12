import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SalesService } from './sale.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @MessagePattern('createSale')
  async createSale(@Body() createSaleDto: CreateSaleDto) {
    return await this.salesService.createSale(createSaleDto);
  }
  @Get()
  @MessagePattern('getAllSales')
  async getAllSales(@Query() page: number = 1, @Query() limit: number = 100) {
    return await this.salesService.getAllSales(page, limit);
  }
  @Get(':id')
  @MessagePattern('getSale')
  async getSale(@Param('id') productId: string) {
    return await this.salesService.getSale(productId);
  }
  @Get('search')
  @MessagePattern('searchSales')
  async searchSales(@Query() searchTerm: string) {
    return await this.salesService.searchSales(searchTerm);
  }
}
