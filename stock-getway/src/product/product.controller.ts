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

@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly productProxy: ClientProxy,
  ) {}
  @Post()
  createProduct(@Payload() data: any): Observable<any> {
    return this.productProxy.send('create_product', data);
  }
  @Get()
  getAllProduct() {
    return this.productProxy.send('get_all_products', {});
  }
  @Get('search')
  searchProduct(@Query() query: string) {
    return this.productProxy.send('searchProduct', query);
  }
  @Get(':id')
  getProduct(@Payload() productId: string) {
    return this.productProxy.send('get_product_by_id', productId);
  }
  @Put(':id')
  updateProduct(@Payload() productId: any): Observable<any> {
    return this.productProxy.send('updateProduct', productId);
  }
}
