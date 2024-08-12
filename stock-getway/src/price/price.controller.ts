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

@Controller('price')
@UseGuards(AuthGuard)
export class PriceController {
  constructor(
    @Inject('PRICE_SERVICE') private readonly priceProxy: ClientProxy,
  ) {}
  @Post()
  createPrice(@Payload() data: any): Observable<any> {
    return this.priceProxy.send('createPrice', data);
  }

  @Get()
  getAllPrice() {
    return this.priceProxy.send('getAllPrice', {});
  }
  @Get(':id')
  findOne(@Payload() priceId: string) {
    return this.priceProxy.send('getPrice', priceId);
  }
  @Get('search')
  searchPrice(@Query() query: string) {
    return this.priceProxy.send('searchPrice', query);
  }
  @Put(':id')
  updatePrice(@Payload() priceId: any): Observable<any> {
    return this.priceProxy.send('updatePrice', priceId);
  }
}
