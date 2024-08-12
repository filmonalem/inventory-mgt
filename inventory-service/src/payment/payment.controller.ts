import { Controller, Get, Body, Param, Query, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { MessagePattern } from '@nestjs/microservices';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @MessagePattern('create_payment')
  async createPayment(createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPayment(createPaymentDto);
  }
  @Get()
  @MessagePattern('getAllPayments')
  async getAllPayments(
    @Query() page: number = 1,
    @Query() limit: number = 100,
  ) {
    return await this.paymentService.getAllPayments(page, limit);
  }

  @Get(':id')
  @MessagePattern('get_payment_by_id')
  async getPayment(@Param('id') PaymentId: string) {
    return await this.paymentService.getPayment(PaymentId);
  }

  @MessagePattern('updatePayment')
  @Put(':id')
  async updatePayment(
    @Param('id') paymentId: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return await this.paymentService.updatePayment(paymentId, updatePaymentDto);
  }
  @Get('search')
  @MessagePattern('searchPayment')
  async searchPayment(@Query() searchTerm: string) {
    return await this.paymentService.searchPayment(searchTerm);
  }
  @Get('log')
  @MessagePattern('getAllPaymentLog')
  async getAllPaymentLog(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 100,
  ) {
    return await this.paymentService.getAllPaymentLog(page, limit);
  }
}
