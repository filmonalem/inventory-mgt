import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Post()
  @MessagePattern('createPrice')
  async createPrice(@Body() createPriceDto: CreatePriceDto) {
    return await this.priceService.createPrice(createPriceDto);
  }

  @Get()
  @MessagePattern('getAllPrice')
  async getAllPrices(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 100,
  ) {
    return await this.priceService.getAllPrices(page, limit);
  }

  @Get(':id')
  @MessagePattern('getPrice')
  async getPrice(@Param('id') priceId: string) {
    return await this.priceService.getPrice(priceId);
  }

  @Patch(':id')
  @MessagePattern('updatePrice')
  async updatePrice(
    @Param('id') priceId: string,
    @Body() updatePriceDto: UpdatePriceDto,
  ) {
    return await this.priceService.updatePrice(priceId, updatePriceDto);
  }
  @Get('search')
  @MessagePattern('searchPrice')
  async searchPrices(@Query() searchTerm: string) {
    return await this.priceService.searchPrices(searchTerm);
  }
}
