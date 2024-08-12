import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/authentication/auth.guard';

@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderProxy: ClientProxy,
  ) {}
  @Post()
  createOrder(@Payload() data: any): Observable<any> {
    return this.orderProxy.send('createOrder', data);
  }
  @Get()
  async getAllOrders() {
    return this.orderProxy.send('getAllOrder', {});
  }
  @Get(':id')
  async getSale(@Payload() orderId: string) {
    return this.orderProxy.send('getOrder', orderId);
  }
  @Get('search')
  async searchOrder(@Query() query: string) {
    return this.orderProxy.send('searchOrder', query);
  }
  @Delete(':id')
  async cancelOrder(@Param('id') orderId: string) {
    return this.orderProxy.send('cancelOrder', orderId);
  }
  @Patch(':id')
  async updateOrder(@Param('id') orderId: string, @Body() data: any) {
    return this.orderProxy.send('updateOrder', { orderId, data });
  }
}
