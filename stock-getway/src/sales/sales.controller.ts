import { Controller, Get, Inject, Post, Put, Query } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('sales')
export class SalesController {
  constructor(
    @Inject('SALES_SERVICE') private readonly salesProxy: ClientProxy,
  ) {}
  @Post()
  createSale(@Payload() data: any): Observable<any> {
    return this.salesProxy.send('createSale', data);
  }

  @Get()
  getAllSales() {
    return this.salesProxy.send('getAllSales', {});
  }
  @Get(':id')
  getSale(@Payload() priceId: string) {
    return this.salesProxy.send('getSale', priceId);
  }
  @Get('search')
  searchStock(@Query() query: string) {
    return this.salesProxy.send('searchStock', query);
  }
  @Put(':id')
  searchSales(@Payload() priceId: any): Observable<any> {
    return this.salesProxy.emit('searchSales', priceId);
  }
}
