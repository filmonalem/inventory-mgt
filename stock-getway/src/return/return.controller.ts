import {
  Body,
  Controller,
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

@Controller('return')
@UseGuards(AuthGuard)
export class ReturnController {
  constructor(
    @Inject('RETURN_SERVICE') private readonly returnProxy: ClientProxy,
  ) {}
  @Post()
  async createReturn(@Payload() data: any): Promise<Observable<any>> {
    return this.returnProxy.send('createReturn', data);
  }
  @Get()
  async getAllReturns() {
    return this.returnProxy.send('getAllReturn', {});
  }
  @Get(':id')
  async getReturn(@Payload() returnId: string) {
    return this.returnProxy.send('getReturn', returnId);
  }
  @Get('search')
  async searchReturn(@Query() query: string) {
    return this.returnProxy.send('searchReturn', query);
  }

  @Patch(':id')
  async updateReturn(@Param('id') returnId: string, @Body() data: any) {
    return this.returnProxy.send('updateReturn', { returnId, data });
  }
}
