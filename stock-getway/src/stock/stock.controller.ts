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

@Controller('stock')
@UseGuards(AuthGuard)
export class StockController {
  constructor(
    @Inject('STOCK_SERVICE') private readonly stockProxy: ClientProxy,
  ) {}
  @Post()
  createStock(@Payload() data: any): Observable<any> {
    return this.stockProxy.send('createStock', data);
  }

  @Get()
  getAllStock() {
    return this.stockProxy.send('getAllStock', {});
  }
  @Get(':id')
  getStock(@Payload() priceId: string) {
    return this.stockProxy.send('getStock', priceId);
  }
  @Get('search')
  searchStock(@Query() query: string) {
    return this.stockProxy.send('searchStock', query);
  }
  @Put(':id')
  updateStock(@Payload() priceId: any): Observable<any> {
    return this.stockProxy.emit('updateStock', priceId);
  }
}
