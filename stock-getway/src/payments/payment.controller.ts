import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/authentication/auth.guard';

@Controller('payment')
@UseGuards(AuthGuard)
export class PaymentController {
  constructor(@Inject('PAYMENT_SERVICE') private paymentProxy: ClientProxy) {}

  @Get()
  async getAllPayment() {
    return this.paymentProxy.send('getAllPayments', {});
  }
  @Get('log')
  async getAllPaymentLog() {
    return this.paymentProxy.send('getAllPaymentLog', {});
  }
  @Get('search')
  searchPayments(@Query() query: string) {
    return this.paymentProxy.send('searchPayments', query);
  }

  @Get(':id')
  async getPayment(@Param('id') paymentId: string) {
    return this.paymentProxy.send('get_payment_by_id', paymentId);
  }

  @Put(':id')
  updatePayment(
    @Param('id') paymentId: string,
    @Body() data: any,
  ): Observable<any> {
    return this.paymentProxy.emit('updatePayment', data);
  }
}
