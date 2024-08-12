import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @MessagePattern('createOrder')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.createOrder(createOrderDto);
  }

  @Get()
  @MessagePattern('getAllOrder')
  async getAllOrders(@Query() page: number = 1, @Query() limit: number = 100) {
    return await this.orderService.getAllOrders(page, limit);
  }

  @Get(':id')
  @MessagePattern('getOrder')
  async getOrder(@Param('id') orderId: string) {
    return await this.orderService.getOrder(orderId);
  }

  @Patch(':id')
  @MessagePattern('updateOrder')
  async updateOrder(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.updateOrder(orderId, updateOrderDto);
  }

  @Delete(':id')
  @MessagePattern('cancelOrder')
  async cancelOrder(@Param('id') orderId: string) {
    return await this.orderService.cancelOrder(orderId);
  }
  @Get('search')
  @MessagePattern('searchOrder')
  async searchOrder(@Query() searchTerm: string) {
    return await this.orderService.searchOrder(searchTerm);
  }
}
