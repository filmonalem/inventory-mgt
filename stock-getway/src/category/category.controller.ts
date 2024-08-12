import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/authentication/auth.guard';
@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(@Inject('CATEGORY_SERVICE') private categoryProxy: ClientProxy) {}
  @Post()
  createCategory(@Body() data: any): Observable<any> {
    return this.categoryProxy.emit('createCategory', data);
  }
  @Get()
  async getAllCategory() {
    return this.categoryProxy.send('getAllCategory', {});
  }
  @Get('search')
  searchCategory(@Query() query: string) {
    return this.categoryProxy.send('searchCategory', query);
  }
  @Get('id')
  async getCategory(@Param('id') categoryId: string) {
    return this.categoryProxy.send('getCategory', categoryId);
  }

  @Put(':id')
  updateCategory(
    @Param('id') categoryId: string,
    @Body() data: any,
  ): Observable<any> {
    return this.categoryProxy.emit('updateCategory', data);
  }
}
