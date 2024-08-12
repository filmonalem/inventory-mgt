import {
  Body,
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

@Controller('client')
@UseGuards(AuthGuard)
export class ClientController {
  constructor(@Inject('COMPANY_SERVICE') private clientProxy: ClientProxy) {}
  @Post()
  createClient(@Body() data: any): Observable<any> {
    return this.clientProxy.send('createClient', data);
  }
  @Get()
  async getAllClients() {
    return this.clientProxy.send('getAllClient', {});
  }
  @Get('id')
  async getClient(@Payload() clientId: string) {
    return this.clientProxy.send('getClient', clientId);
  }
  @Get('search')
  searchClient(@Query() query: string) {
    return this.clientProxy.send('searchClient', query);
  }
  @Put(':id')
  updateClient(@Payload() clientId: string): Observable<any> {
    return this.clientProxy.send('updateClient', clientId);
  }
}
