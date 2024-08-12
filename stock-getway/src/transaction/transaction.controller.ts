import {
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/authentication/auth.guard';

@Controller('transaction')
@UseGuards(AuthGuard)
export class TransactionController {
  constructor(
    @Inject('COMPANY_SERVICE') private readonly transactionProxy: ClientProxy,
  ) {}
  @Post()
  createTransaction(@Payload() data: any): Observable<any> {
    return this.transactionProxy.emit('createTransaction', data);
  }

  @Get()
  getAllTransaction() {
    return this.transactionProxy.send('getAllTransaction', {});
  }
  @Get('search')
  searchTransaction(@Query() query: string) {
    return this.transactionProxy.send('searchTransaction', query);
  }
  @Get(':id')
  getTransaction(@Payload() transactionId: string) {
    return this.transactionProxy.send('getTransaction', transactionId);
  }
  @Put(':id')
  updateTransaction(@Payload() transactionId: any): Observable<any> {
    return this.transactionProxy.emit('updateTransaction', transactionId);
  }
}
